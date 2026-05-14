<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

$configPath = __DIR__ . '/config.php';
$exampleConfigPath = __DIR__ . '/config.example.php';
$config = file_exists($configPath) ? require $configPath : require $exampleConfigPath;

if (!file_exists($configPath)) {
    $config['lead_to_email'] = '';
}

setCorsHeaders($config);

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(false, 'Метод не поддерживается.', 405);
}

$input = readInput();

if (trim((string)($input['honeypot'] ?? '')) !== '') {
    jsonResponse(true, 'Заявка отправлена. Мы свяжемся с вами для уточнения времени записи.');
}

$ip = getClientIp();
if (isRateLimited($ip, (int)$config['rate_limit_max'], (int)$config['rate_limit_window_seconds'])) {
    jsonResponse(false, 'Слишком много заявок. Попробуйте отправить форму позже или позвоните.', 429);
}

$data = sanitizeLead($input);
$errors = validateLead($data);

if ($errors !== []) {
    jsonResponse(false, 'Проверьте поля формы.', 400, ['errors' => $errors]);
}

if (empty($config['lead_to_email']) || !filter_var($config['lead_to_email'], FILTER_VALIDATE_EMAIL)) {
    jsonResponse(false, 'Отправка заявок пока не настроена. Пожалуйста, позвоните по телефону на сайте.', 500);
}

$sent = sendEmailLead($data, $config);

if (!$sent) {
    jsonResponse(false, 'Не удалось отправить заявку. Пожалуйста, позвоните по телефону на сайте.', 500);
}

sendTelegramLead($data, $config);

jsonResponse(true, 'Заявка отправлена. Мы свяжемся с вами для уточнения времени записи.');

function setCorsHeaders(array $config): void
{
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    $allowedOrigins = $config['allowed_origins'] ?? [];

    if ($origin !== '' && in_array($origin, $allowedOrigins, true)) {
        header('Access-Control-Allow-Origin: ' . $origin);
        header('Vary: Origin');
    }

    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
}

function readInput(): array
{
    $contentType = $_SERVER['CONTENT_TYPE'] ?? '';

    if (stripos($contentType, 'application/json') !== false) {
        $raw = file_get_contents('php://input');
        $decoded = json_decode($raw ?: '', true);
        return is_array($decoded) ? $decoded : [];
    }

    return $_POST;
}

function sanitizeLead(array $input): array
{
    return [
        'name' => sanitizeSingleLine((string)($input['name'] ?? ''), 80),
        'phone' => sanitizePhone((string)($input['phone'] ?? '')),
        'car' => sanitizeSingleLine((string)($input['car'] ?? ''), 80),
        'service' => sanitizeSingleLine((string)($input['service'] ?? ''), 120),
        'preferred_time' => sanitizeSingleLine((string)($input['preferred_time'] ?? ''), 80),
        'message' => sanitizeMessage((string)($input['message'] ?? ''), 1000),
        'consent_personal_data' => toBool($input['consent_personal_data'] ?? false),
        'consent_policy' => toBool($input['consent_policy'] ?? false),
    ];
}

function validateLead(array $data): array
{
    $errors = [];

    if ($data['name'] === '') {
        $errors['name'] = 'Укажите имя.';
    }

    if ($data['phone'] === '') {
        $errors['phone'] = 'Укажите телефон.';
    } elseif (digitsCount($data['phone']) < 10) {
        $errors['phone'] = 'Проверьте номер телефона.';
    }

    if ($data['service'] === '') {
        $errors['service'] = 'Укажите услугу или проблему.';
    }

    if (!$data['consent_personal_data']) {
        $errors['consent_personal_data'] = 'Нужно согласие на обработку персональных данных.';
    }

    if (!$data['consent_policy']) {
        $errors['consent_policy'] = 'Нужно подтвердить ознакомление с политикой.';
    }

    return $errors;
}

function sanitizeSingleLine(string $value, int $maxLength): string
{
    $value = trim(strip_tags($value));
    $value = preg_replace('/[\r\n\t]+/u', ' ', $value) ?? '';
    $value = preg_replace('/\s{2,}/u', ' ', $value) ?? '';
    return limitString($value, $maxLength);
}

function sanitizeMessage(string $value, int $maxLength): string
{
    $value = trim(strip_tags($value));
    $value = str_replace("\0", '', $value);
    return limitString($value, $maxLength);
}

function sanitizePhone(string $phone): string
{
    $phone = preg_replace('/[^\d\+\-\(\)\s]/u', '', $phone) ?? '';
    $phone = preg_replace('/[\r\n\t]+/u', ' ', $phone) ?? '';
    $phone = preg_replace('/\s{2,}/u', ' ', $phone) ?? '';
    return limitString(trim($phone), 32);
}

function limitString(string $value, int $maxLength): string
{
    if (function_exists('mb_substr')) {
        return mb_substr($value, 0, $maxLength, 'UTF-8');
    }

    return substr($value, 0, $maxLength);
}

function digitsCount(string $value): int
{
    return strlen(preg_replace('/\D+/', '', $value) ?? '');
}

function toBool(mixed $value): bool
{
    if (is_bool($value)) {
        return $value;
    }

    if (is_string($value)) {
        return in_array(strtolower($value), ['1', 'true', 'yes', 'on'], true);
    }

    return (bool)$value;
}

function getClientIp(): string
{
    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    return preg_replace('/[^a-zA-Z0-9:\.\-]/', '', $ip) ?: 'unknown';
}

function isRateLimited(string $ip, int $maxRequests, int $windowSeconds): bool
{
    $file = sys_get_temp_dir() . '/na_yubileynoy_' . hash('sha256', $ip) . '.json';
    $now = time();
    $handle = fopen($file, 'c+');

    if ($handle === false) {
        return false;
    }

    flock($handle, LOCK_EX);
    $raw = stream_get_contents($handle);
    $timestamps = json_decode($raw ?: '[]', true);
    $timestamps = is_array($timestamps) ? $timestamps : [];
    $timestamps = array_values(array_filter($timestamps, static fn ($timestamp) => is_int($timestamp) && $timestamp > $now - $windowSeconds));

    if (count($timestamps) >= $maxRequests) {
        flock($handle, LOCK_UN);
        fclose($handle);
        return true;
    }

    $timestamps[] = $now;
    ftruncate($handle, 0);
    rewind($handle);
    fwrite($handle, json_encode($timestamps));
    flock($handle, LOCK_UN);
    fclose($handle);

    return false;
}

function sendEmailLead(array $data, array $config): bool
{
    $to = (string)$config['lead_to_email'];
    $from = filter_var($config['lead_from_email'] ?? '', FILTER_VALIDATE_EMAIL)
        ? (string)$config['lead_from_email']
        : 'no-reply@' . ($_SERVER['HTTP_HOST'] ?? 'localhost');

    $subject = 'Новая заявка с сайта автосервиса';
    $body = buildLeadText($data);
    $headers = [
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'From: ' . sanitizeHeader((string)($config['site_name'] ?? 'Сайт')) . ' <' . $from . '>',
        'Reply-To: ' . $from,
        'X-Mailer: PHP/' . phpversion(),
    ];

    return mail($to, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, implode("\r\n", $headers));
}

function sendTelegramLead(array $data, array $config): void
{
    $token = trim((string)($config['telegram_bot_token'] ?? ''));
    $chatId = trim((string)($config['telegram_chat_id'] ?? ''));

    if ($token === '' || $chatId === '') {
        return;
    }

    $url = 'https://api.telegram.org/bot' . rawurlencode($token) . '/sendMessage';
    $payload = http_build_query([
        'chat_id' => $chatId,
        'text' => buildLeadText($data),
        'disable_web_page_preview' => 'true',
    ]);

    $context = stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => "Content-Type: application/x-www-form-urlencoded\r\n",
            'content' => $payload,
            'timeout' => 2,
        ],
    ]);

    @file_get_contents($url, false, $context);
}

function buildLeadText(array $data): string
{
    return implode("\n", [
        'Новая заявка с сайта автосервиса',
        '',
        'Имя: ' . $data['name'],
        'Телефон: ' . $data['phone'],
        'Автомобиль: ' . ($data['car'] !== '' ? $data['car'] : 'не указан'),
        'Услуга: ' . $data['service'],
        'Желаемое время: ' . ($data['preferred_time'] !== '' ? $data['preferred_time'] : 'не указано'),
        'Комментарий: ' . ($data['message'] !== '' ? $data['message'] : 'нет'),
        '',
        'Согласие на обработку данных: да',
        'Ознакомление с политикой: да',
    ]);
}

function sanitizeHeader(string $value): string
{
    return trim(preg_replace('/[\r\n]+/', ' ', $value) ?? '');
}

function jsonResponse(bool $success, string $message, int $status = 200, array $extra = []): never
{
    http_response_code($status);
    echo json_encode(array_merge([
        'success' => $success,
        'message' => $message,
    ], $extra), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}
