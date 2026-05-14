import {
  CalendarCheck,
  Check,
  ChevronRight,
  ClipboardCheck,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
  Timer,
  Wrench
} from "lucide-react";
import {
  advantages,
  business,
  contactActions,
  faq,
  heroBadges,
  prices,
  processSteps,
  reviewSnippets,
  services,
  trustFacts,
  yandexMapEmbedUrl,
  type IconComponent
} from "@/lib/business";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { LeadForm } from "@/components/landing/LeadForm";
import { MotionSection } from "@/components/ui/MotionSection";
import { Section } from "@/components/ui/Section";

export function LandingPage() {
  return (
    <main id="top">
      <Hero />
      <Trust />
      <Services />
      <Symptoms />
      <Process />
      <Prices />
      <Advantages />
      <Reviews />
      <Booking />
      <Faq />
      <Contacts />
    </main>
  );
}

function Hero() {
  return (
    <section className="workshop-grid relative overflow-hidden bg-ink-950 pb-16 pt-16 text-white md:pb-24 md:pt-24">
      <div className="section-shell grid gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(420px,1fr)] lg:items-center">
        <MotionSection className="relative z-10 min-w-0">
          <div className="flex flex-wrap gap-2">
            {heroBadges.map((badge, index) => (
              <Badge key={badge} tone={index === 1 ? "blue" : index === 0 ? "orange" : "gray"}>
                {badge}
              </Badge>
            ))}
          </div>

          <p className="mt-8 text-sm font-extrabold uppercase tracking-[0.16em] text-brand-200">Мытищи, Юбилейная 42Г</p>
          <h1 className="font-display mt-4 max-w-4xl text-4xl font-semibold leading-[1.04] text-white md:text-6xl">
            Автосервис “На Юбилейной” в Мытищах
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-steel-200 md:text-xl">
            Ремонт и обслуживание автомобилей без лишних работ: сначала осмотр и объяснение, затем согласование и ремонт.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#booking" size="lg" icon={CalendarCheck}>
              Записаться на ремонт
            </ButtonLink>
            <ButtonLink href={business.phoneHref} size="lg" variant="outline" icon={Phone}>
              Позвонить
            </ButtonLink>
            <ButtonLink className="text-steel-200 hover:bg-white/10 hover:text-white" href={business.routeUrl} size="lg" variant="ghost" icon={MapPin}>
              Построить маршрут
            </ButtonLink>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <Metric icon={Star} value={`${business.rating}`} label={`Яндекс.Карты, ${business.ratingCount} оценка`} />
            <Metric icon={ClipboardCheck} value={`${business.reviewCount}`} label="отзывов о сервисе" />
            <Metric icon={Timer} value="09-20" label="ежедневно, перерыв 14-15" />
          </div>
        </MotionSection>

        <MotionSection>
          <HeroLeadPanel />
        </MotionSection>
      </div>
    </section>
  );
}

function HeroLeadPanel() {
  return (
    <div className="hero-lead-panel rounded-lg border border-white/10 bg-white p-5 text-ink-950 shadow-[0_28px_80px_rgba(0,0,0,0.34)] md:p-6">
      <LeadForm variant="quick" className="hero-lead-form" />

      <div className="mt-5 grid gap-3 rounded-lg bg-steel-50 p-4 text-sm leading-6 text-ink-700">
        <div className="flex gap-2">
          <Check aria-hidden className="mt-1 h-4 w-4 shrink-0 text-brand-700" />
          <span>Перезвоним и сориентируем по свободному времени.</span>
        </div>
        <div className="flex gap-2">
          <Check aria-hidden className="mt-1 h-4 w-4 shrink-0 text-brand-700" />
          <span>Работы и дополнительные вопросы согласовываются до ремонта.</span>
        </div>
      </div>
    </div>
  );
}

function Metric({ icon: Icon, value, label }: { icon: IconComponent; value: string; label: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/10 p-4 backdrop-blur">
      <Icon aria-hidden className="mb-4 h-5 w-5 text-brand-200" />
      <p className="font-display text-2xl font-semibold text-white">{value}</p>
      <p className="mt-1 text-sm leading-5 text-steel-300">{label}</p>
    </div>
  );
}

function Trust() {
  return (
    <section className="paper-texture py-16 md:py-24">
      <div className="section-shell grid gap-5 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
        <MotionSection className="rounded-lg bg-ink-950 p-6 text-white shadow-soft md:p-8">
          <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-brand-200">Доверие без витрины</p>
          <h2 className="font-display mt-4 text-3xl font-semibold leading-tight md:text-5xl">Сервис, в который возвращаются годами</h2>
          <p className="mt-5 text-lg leading-8 text-steel-200">
            Отзывы дают главный визуальный тон сайту: не громкий “гаражный” маркетинг, а аккуратная работа, объяснения и
            постоянные клиенты.
          </p>
        </MotionSection>

        <div className="grid gap-3">
          {trustFacts.map((fact, index) => (
            <MotionSection key={fact}>
              <div className="grid gap-4 rounded-lg border border-steel-200 bg-white p-5 shadow-[0_10px_28px_rgba(20,17,15,0.05)] sm:grid-cols-[auto_1fr]">
                <span className="font-display flex h-12 w-12 items-center justify-center rounded-lg bg-brand-50 text-lg font-semibold text-brand-800">
                  0{index + 1}
                </span>
                <p className="leading-7 text-ink-700">По отзывам клиентов: {fact}</p>
              </div>
            </MotionSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <Section
      id="services"
      className="bg-white"
      eyebrow="Услуги"
      title="Работы собраны не в прайс-лабиринт, а в понятные направления"
      text="Так проще быстро найти нужное: ТО, подвеска, тормоза, диагностика, развал-схождение, шиномонтаж и смежные работы."
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {services.map((service, index) => (
          <MotionSection key={service.title} className={index === 0 || index === 3 ? "lg:col-span-2" : ""}>
            <article className="group h-full rounded-lg border border-steel-200 bg-steel-50 p-5 transition duration-200 hover:-translate-y-1 hover:border-brand-200 hover:bg-white hover:shadow-soft">
              <div className="flex items-start justify-between gap-4">
                <div className="rounded-lg bg-ink-950 p-3 text-white">
                  <service.icon aria-hidden className="h-5 w-5" />
                </div>
                <span className="text-xs font-black uppercase tracking-[0.14em] text-steel-300">service</span>
              </div>
              <h3 className="font-display mt-6 text-xl font-semibold leading-tight text-ink-950">{service.title}</h3>
              <ul className="mt-5 grid gap-2 text-sm leading-6 text-ink-700 sm:grid-cols-2">
                {service.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <Check aria-hidden className="mt-1 h-4 w-4 shrink-0 text-brand-700" />
                    {item}
                  </li>
                ))}
              </ul>
              {service.note ? <p className="mt-5 border-l-2 border-brand-600 pl-3 text-sm leading-6 text-ink-600">{service.note}</p> : null}
            </article>
          </MotionSection>
        ))}
      </div>
      <CtaStrip text="Не уверены, с чего начать? Опишите проблему - подскажем, нужна ли диагностика и когда лучше приехать." />
    </Section>
  );
}

function Symptoms() {
  return (
    <section className="bg-ink-950 py-16 text-white md:py-24">
      <div className="section-shell grid gap-8 md:grid-cols-[0.75fr_1.25fr] md:items-center">
        <div>
          <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-brand-200">Не знаете, что сломалось?</p>
          <h2 className="font-display mt-3 text-3xl font-semibold leading-tight md:text-5xl">Приезжать можно не с диагнозом, а с симптомами</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {["стук", "скрип", "течь", "вибрация", "ошибка на панели", "странный звук"].map((symptom) => (
            <div key={symptom} className="rounded-lg border border-white/10 bg-white px-4 py-3 text-lg font-bold text-ink-950">
              {symptom}
            </div>
          ))}
          <p className="rounded-lg bg-brand-700 p-4 text-base font-bold leading-7 text-white sm:col-span-2">
            Опишите, что происходит с автомобилем. Специалист подскажет, с чего начать диагностику.
          </p>
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="workshop-grid bg-ink-950 py-16 text-white md:py-24">
      <div className="section-shell">
        <div className="mb-10 max-w-4xl">
          <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-brand-200">Процесс</p>
          <h2 className="font-display mt-3 text-3xl font-semibold leading-tight md:text-5xl">Ремонт проходит как маршрут, а не как чёрный ящик</h2>
          <p className="mt-4 text-lg leading-8 text-steel-200">
            Каждый шаг закрывает частую тревогу: как попасть, что нашли, что будет стоить и что действительно нужно делать.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {processSteps.map((step, index) => (
            <MotionSection key={step.title}>
              <div className="relative h-full rounded-lg border border-white/10 bg-white/10 p-5 backdrop-blur">
                <span className="font-display text-4xl font-semibold text-brand-200">0{index + 1}</span>
                <step.icon aria-hidden className="mt-8 h-6 w-6 text-brand-200" />
                <h3 className="mt-5 text-lg font-bold text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-steel-300">{step.text}</p>
              </div>
            </MotionSection>
          ))}
        </div>

        <div className="mt-8 grid gap-4 rounded-lg border border-brand-200/20 bg-brand-700 p-5 md:grid-cols-[auto_1fr_auto] md:items-center">
          <CalendarCheck aria-hidden className="h-8 w-8 text-white" />
          <div>
            <h3 className="font-display text-xl font-semibold text-white">Когда лучше записаться</h3>
            <p className="mt-2 leading-7 text-white/90">
              Сервис часто загружен, поэтому лучше оставить заявку заранее - так проще подобрать удобное время и подготовиться к
              работам.
            </p>
          </div>
          <ButtonLink href="#booking" variant="secondary" icon={CalendarCheck}>
            Записаться
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

function Prices() {
  return (
    <Section
      id="prices"
      className="paper-texture bg-steel-50"
      eyebrow="Цены"
      title="Прайс как ориентир, не как ловушка мелким шрифтом"
      text="Точная стоимость зависит от автомобиля, состояния узлов и объема работ. Дополнительные работы согласовываются до начала ремонта."
    >
      <div className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr]">
        <div className="rounded-lg bg-ink-950 p-6 text-white shadow-soft">
          <ShieldCheck aria-hidden className="h-8 w-8 text-brand-200" />
          <h3 className="font-display mt-6 text-2xl font-semibold leading-tight">Сначала сориентируем, потом согласуем</h3>
          <p className="mt-4 leading-7 text-steel-300">
            Если точная цена невозможна без осмотра, это прямо показываем в таблице и не превращаем плейсхолдеры в обещания.
          </p>
        </div>
        <div className="overflow-hidden rounded-lg border border-steel-200 bg-white shadow-soft">
          <div className="grid grid-cols-[1fr_auto] bg-brand-700 px-4 py-4 text-sm font-black uppercase tracking-[0.12em] text-white md:px-6">
            <span>Работа</span>
            <span>Ориентир</span>
          </div>
          {prices.map(([name, price]) => (
            <div key={name} className="grid grid-cols-[1fr_auto] gap-4 border-t border-steel-200 px-4 py-4 md:px-6">
              <span className="font-bold text-ink-800">{name}</span>
              <span className="text-right font-black text-accent-700">{price}</span>
            </div>
          ))}
        </div>
      </div>
      <CtaStrip text="Оставьте заявку - сориентируем по стоимости до приезда. Финальная цена зависит от марки автомобиля, состояния узлов и необходимости дополнительных работ." />
    </Section>
  );
}

function Advantages() {
  return (
    <Section
      eyebrow="Почему выбирают нас"
      title="Пять рабочих принципов вместо абстрактных преимуществ"
      text="Каждый пункт взят из повторяющихся тем в отзывах: доверие, запись, объяснение работ и удобство для Мытищ."
    >
      <div className="grid gap-4 lg:grid-cols-5">
        {advantages.map((item, index) => (
          <MotionSection key={item.title} className={index === 0 ? "lg:col-span-2" : ""}>
            <Card className="h-full overflow-hidden">
              <div className="h-2 bg-brand-700" />
              <div className="p-5">
                <item.icon aria-hidden className="mb-5 h-6 w-6 text-accent-700" />
                <h3 className="font-display text-lg font-semibold leading-tight text-ink-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-ink-600">{item.text}</p>
              </div>
            </Card>
          </MotionSection>
        ))}
      </div>
    </Section>
  );
}

function Reviews() {
  return (
    <section id="reviews" className="bg-white py-16 md:py-24">
      <div className="section-shell">
        <div className="grid gap-6 md:grid-cols-[0.65fr_1.35fr] md:items-end">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-brand-700">Отзывы</p>
            <h2 className="font-display mt-3 text-3xl font-semibold leading-tight text-ink-950 md:text-5xl">Говорят коротко, но по делу</h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-ink-600">
            Не копируем длинные отзывы полностью. Показываем повторяющиеся смыслы: скорость, объяснение, запись и постоянные клиенты.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {reviewSnippets.map((review, index) => (
            <MotionSection key={review} className={index === 0 ? "lg:col-span-2" : ""}>
              <article className="h-full rounded-lg border border-steel-200 bg-steel-50 p-5">
                <div className="mb-5 flex gap-1 text-brand-700" aria-label="Рейтинг 5 из 5">
                  {[0, 1, 2, 3, 4].map((item) => (
                    <Star key={item} aria-hidden className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-base font-semibold leading-7 text-ink-800">“{review}”</p>
              </article>
            </MotionSection>
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={business.yandexReviewsUrl} target="_blank" rel="noreferrer" variant="outline" icon={Star}>
            Посмотреть отзывы на Яндекс.Картах
          </ButtonLink>
          <ButtonLink href="#booking" icon={CalendarCheck}>
            Записаться после отзывов
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

function Booking() {
  return (
    <section id="booking" className="bg-ink-950 py-16 text-white md:py-24">
      <div className="section-shell grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
        <div>
          <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-brand-200">Запись</p>
          <h2 className="font-display mt-3 text-3xl font-semibold leading-tight md:text-5xl">Запишитесь на удобное время</h2>
          <p className="mt-5 text-lg leading-8 text-steel-200">
            Чем подробнее описание, тем проще сориентировать по времени, возможным работам и примерной стоимости до приезда.
          </p>
          <div className="mt-6 grid gap-3 text-sm text-steel-200">
            <p className="flex gap-2">
              <Check aria-hidden className="mt-1 h-4 w-4 shrink-0 text-brand-200" />
              Работы согласовываются до ремонта.
            </p>
            <p className="flex gap-2">
              <Check aria-hidden className="mt-1 h-4 w-4 shrink-0 text-brand-200" />
              Дополнительные вопросы можно описать в комментарии.
            </p>
          </div>
        </div>
        <LeadForm variant="full" />
      </div>
    </section>
  );
}

function Faq() {
  return (
    <Section eyebrow="FAQ" title="Ответы без лишней канцелярии" className="bg-steel-50">
      <div className="grid gap-3 md:grid-cols-2">
        {faq.map((item, index) => (
          <details key={item.question} className="group rounded-lg border border-steel-200 bg-white p-5">
            <summary className="focus-ring flex cursor-pointer list-none items-center justify-between gap-4 rounded-lg text-base font-bold text-ink-950">
              <span>
                <span className="mr-3 text-brand-700">0{index + 1}</span>
                {item.question}
              </span>
              <ChevronRight aria-hidden className="h-5 w-5 shrink-0 text-brand-700 transition group-open:rotate-90" />
            </summary>
            <p className="mt-4 leading-7 text-ink-600">{item.answer}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}

function Contacts() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="section-shell grid gap-8 lg:grid-cols-[0.68fr_1.32fr] lg:items-stretch">
        <div>
          <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-brand-700">Контакты</p>
          <h2 className="font-display mt-3 text-3xl font-semibold leading-tight text-ink-950 md:text-5xl">{business.name}</h2>
          <div className="mt-7 grid gap-4 text-ink-700">
            <p className="flex gap-3">
              <MapPin aria-hidden className="mt-1 h-5 w-5 shrink-0 text-brand-700" />
              {business.address}
            </p>
            <p className="flex gap-3">
              <Phone aria-hidden className="mt-1 h-5 w-5 shrink-0 text-brand-700" />
              {business.phone}
            </p>
            <p className="flex gap-3">
              <Timer aria-hidden className="mt-1 h-5 w-5 shrink-0 text-brand-700" />
              {business.schedule}
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {contactActions.map((action, index) => (
              <ButtonLink key={action.label} href={action.href} variant={index === 2 ? "primary" : "outline"} icon={action.icon}>
                {action.label}
              </ButtonLink>
            ))}
          </div>
        </div>

        <div className="map-frame">
          <iframe
            title="Яндекс Карта: автосервис На Юбилейной, Мытищи, Юбилейная улица, 42Г"
            src={yandexMapEmbedUrl}
            loading="eager"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}

function CtaStrip({ text }: { text: string }) {
  return (
    <div className="mt-8 grid gap-5 rounded-lg border border-ink-950/10 bg-ink-950 p-5 text-white shadow-soft md:grid-cols-[1fr_auto] md:items-center">
      <div className="flex gap-3">
        <Wrench aria-hidden className="mt-1 h-5 w-5 shrink-0 text-brand-200" />
        <p className="max-w-3xl leading-7 text-steel-200">{text}</p>
      </div>
      <ButtonLink href="#booking" icon={CalendarCheck}>
        Оставить заявку
      </ButtonLink>
    </div>
  );
}
