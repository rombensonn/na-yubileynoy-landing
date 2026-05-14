"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";
import { Loader2, Send } from "lucide-react";
import { quickServices } from "@/lib/business";
import type { LeadPayload, LeadResponse } from "@/lib/types";
import { Button } from "@/components/ui/Button";

type FormVariant = "quick" | "full";

type LeadFormProps = {
  variant: FormVariant;
  className?: string;
};

type FormState = LeadPayload;
type FormErrors = Partial<Record<keyof LeadPayload, string>>;

const initialState: FormState = {
  name: "",
  phone: "",
  car: "",
  service: "",
  preferred_time: "",
  message: "",
  consent_personal_data: false,
  consent_policy: false,
  honeypot: ""
};

const endpoint = process.env.NEXT_PUBLIC_LEAD_ENDPOINT ?? "/backend/send-lead.php";

function countDigits(value: string) {
  return value.replace(/\D/g, "").length;
}

function validate(values: FormState, variant: FormVariant) {
  const errors: FormErrors = {};

  if (variant === "full" && !values.name.trim()) {
    errors.name = "Укажите имя.";
  }

  if (!values.phone.trim()) {
    errors.phone = "Укажите телефон.";
  } else if (countDigits(values.phone) < 10) {
    errors.phone = "Проверьте номер телефона.";
  }

  if (!values.service.trim()) {
    errors.service = "Выберите или опишите услугу.";
  }

  if (!values.consent_personal_data) {
    errors.consent_personal_data = "Нужно согласие на обработку персональных данных.";
  }

  if (!values.consent_policy) {
    errors.consent_policy = "Нужно подтвердить ознакомление с политикой.";
  }

  return errors;
}

export function LeadForm({ variant, className = "" }: LeadFormProps) {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<LeadResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const id = useId();
  const isQuick = variant === "quick";

  const submitLabel = isQuick ? "Перезвоните мне" : "Отправить заявку";
  const formTitle = isQuick ? "Быстрая запись" : "Расскажите, что нужно сделать";

  const visibleServices = useMemo(() => quickServices, []);

  function setField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
  }

  function validateField(field: keyof FormState) {
    const nextErrors = validate(values, variant);
    setErrors((current) => ({ ...current, [field]: nextErrors[field] }));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);

    const validationErrors = validate(values, variant);
    setErrors(validationErrors);

    if (Object.values(validationErrors).some(Boolean)) {
      return;
    }

    const payload: LeadPayload = {
      ...values,
      name: isQuick ? "Быстрая заявка с сайта" : values.name.trim(),
      phone: values.phone.trim(),
      service: values.service.trim(),
      car: values.car?.trim(),
      preferred_time: values.preferred_time?.trim(),
      message: values.message?.trim()
    };

    setLoading(true);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = (await response.json().catch(() => null)) as LeadResponse | null;

      if (!response.ok || !result?.success) {
        throw new Error(result?.message || "Не удалось отправить заявку. Попробуйте еще раз или позвоните.");
      }

      setStatus(result);
    } catch (error) {
      setStatus({
        success: false,
        message: error instanceof Error ? error.message : "Не удалось отправить заявку. Попробуйте еще раз или позвоните."
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className={`rounded-lg border border-steel-200 bg-white/95 p-5 shadow-soft md:p-6 ${className}`} onSubmit={onSubmit} noValidate>
      <div className="mb-5">
        <h3 className="font-display text-xl font-semibold text-ink-950">{formTitle}</h3>
        <p className="mt-2 text-sm leading-6 text-ink-600">
          Оставьте контакты - перезвоним и сориентируем по времени записи.
        </p>
      </div>

      <div aria-hidden className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden">
        <label htmlFor={`${id}-company`}>Компания</label>
        <input
          id={`${id}-company`}
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={values.honeypot}
          onChange={(event) => setField("honeypot", event.target.value)}
        />
      </div>

      <div className={isQuick ? "grid gap-4 sm:grid-cols-2" : "grid gap-4 md:grid-cols-2"}>
        {!isQuick ? (
          <FormField
            id={`${id}-name`}
            label="Имя"
            required
            error={errors.name}
            value={values.name}
            autoComplete="name"
            onBlur={() => validateField("name")}
            onChange={(event) => setField("name", event.target.value)}
          />
        ) : null}

        <FormField
          id={`${id}-phone`}
          label="Телефон"
          required
          error={errors.phone}
          value={values.phone}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+7"
          onBlur={() => validateField("phone")}
          onChange={(event) => setField("phone", event.target.value)}
        />

        {!isQuick ? (
          <FormField
            id={`${id}-car`}
            label="Марка и модель автомобиля"
            value={values.car ?? ""}
            placeholder="Например, Skoda Octavia"
            onChange={(event) => setField("car", event.target.value)}
          />
        ) : null}

        <div className={isQuick ? "" : "md:col-span-2"}>
          <label htmlFor={`${id}-service`} className="mb-2 block text-sm font-semibold text-ink-800">
            Какая услуга нужна <span className="text-accent-600">*</span>
          </label>
          <select
            id={`${id}-service`}
            className={`focus-ring min-h-12 w-full rounded-lg border bg-steel-50 px-3 text-base text-ink-950 transition ${
              errors.service ? "border-red-500" : "border-steel-300 focus:border-brand-600 focus:bg-white"
            }`}
            value={values.service}
            onBlur={() => validateField("service")}
            onChange={(event) => setField("service", event.target.value)}
            aria-invalid={Boolean(errors.service)}
            aria-describedby={errors.service ? `${id}-service-error` : undefined}
          >
            <option value="">Выберите услугу</option>
            {visibleServices.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
          {errors.service ? (
            <p id={`${id}-service-error`} className="mt-2 text-sm text-red-600" role="alert">
              {errors.service}
            </p>
          ) : null}
        </div>

        {!isQuick ? (
          <>
            <FormField
              id={`${id}-time`}
              label="Желаемый день и время"
              value={values.preferred_time ?? ""}
              placeholder="Например, завтра после 15:00"
              onChange={(event) => setField("preferred_time", event.target.value)}
            />
            <div className="md:col-span-2">
              <label htmlFor={`${id}-message`} className="mb-2 block text-sm font-semibold text-ink-800">
                Комментарий
              </label>
              <textarea
                id={`${id}-message`}
                className="focus-ring min-h-32 w-full resize-y rounded-lg border border-steel-300 bg-steel-50 px-3 py-3 text-base text-ink-950 transition focus:border-brand-600 focus:bg-white"
                value={values.message}
                maxLength={1000}
                placeholder="Опишите симптомы: стук, скрип, течь, вибрация, ошибка на панели или странный звук."
                onChange={(event) => setField("message", event.target.value)}
              />
              <p className="mt-2 text-sm text-ink-600">До 1000 символов.</p>
            </div>
          </>
        ) : (
          <Button type="submit" icon={loading ? Loader2 : Send} disabled={loading} className="w-full self-end sm:col-span-2">
            {loading ? "Отправляем" : submitLabel}
          </Button>
        )}
      </div>

      <div className="mt-5 grid gap-3">
        <ConsentCheckbox
          id={`${id}-personal`}
          checked={values.consent_personal_data}
          error={errors.consent_personal_data}
          onChange={(checked) => setField("consent_personal_data", checked)}
        >
          Даю{" "}
          <Link className="font-semibold text-brand-700 underline-offset-4 hover:underline" href="/consent/">
            согласие на обработку персональных данных
          </Link>
        </ConsentCheckbox>
        <ConsentCheckbox
          id={`${id}-policy`}
          checked={values.consent_policy}
          error={errors.consent_policy}
          onChange={(checked) => setField("consent_policy", checked)}
        >
          Ознакомлен(а) с{" "}
          <Link className="font-semibold text-brand-700 underline-offset-4 hover:underline" href="/privacy/">
            Политикой обработки персональных данных
          </Link>
        </ConsentCheckbox>
      </div>

      {!isQuick ? (
        <Button type="submit" size="lg" icon={loading ? Loader2 : Send} disabled={loading} className="mt-6 w-full md:w-auto">
          {loading ? "Отправляем" : submitLabel}
        </Button>
      ) : null}

      {status ? (
        <p
          className={`mt-5 rounded-lg border px-4 py-3 text-sm leading-6 ${
            status.success ? "border-green-200 bg-green-50 text-green-800" : "border-red-200 bg-red-50 text-red-700"
          }`}
          role="status"
          aria-live="polite"
        >
          {status.message}
        </p>
      ) : null}
    </form>
  );
}

type FormFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
};

function FormField({ id, label, error, required, className = "", ...props }: FormFieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-ink-800">
        {label} {required ? <span className="text-accent-600">*</span> : null}
      </label>
      <input
        id={id}
        className={`focus-ring min-h-12 w-full rounded-lg border bg-steel-50 px-3 text-base text-ink-950 transition ${
          error ? "border-red-500" : "border-steel-300 focus:border-brand-600 focus:bg-white"
        }`}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

type ConsentCheckboxProps = {
  id: string;
  checked: boolean;
  error?: string;
  children: React.ReactNode;
  onChange: (checked: boolean) => void;
};

function ConsentCheckbox({ id, checked, error, children, onChange }: ConsentCheckboxProps) {
  return (
    <div>
      <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-ink-700" htmlFor={id}>
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          className="mt-1 h-5 w-5 rounded border-steel-300 text-brand-600 focus:ring-brand-600"
        />
        <span>{children}</span>
      </label>
      {error ? (
        <p className="mt-1 pl-8 text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
