# Автосервис «На Юбилейной»

Одностраничный лендинг на Next.js с отдельным PHP endpoint для заявок.

## Запуск

```bash
npm install
npm run dev
```

## Сборка

```bash
npm run build
```

Статический фронтенд будет в `out/`. Скрипт сборки копирует папку `backend/` в `out/backend/`, кроме реального `config.php`.

## Backend

1. Скопируйте `backend/config.example.php` в `backend/config.php`.
2. Укажите email для заявок и домены сайта.
3. Загрузите содержимое `out/` на хостинг с PHP 8.1+.

Endpoint формы: `/backend/send-lead.php`.
