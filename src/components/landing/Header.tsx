import { CalendarCheck, MapPin, Phone } from "lucide-react";
import { business } from "@/lib/business";

const nav = [
  { label: "Услуги", href: "#services" },
  { label: "Цены", href: "#prices" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Запись", href: "#booking" }
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink-950/90 text-white backdrop-blur">
      <div className="section-shell flex min-h-16 items-center justify-between gap-4">
        <a className="focus-ring flex items-center gap-3 rounded-lg" href="#top" aria-label="На главную">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-brand-700 text-sm font-black text-white">НЮ</span>
          <span className="hidden leading-tight sm:block">
            <span className="block text-sm font-bold text-white">На Юбилейной</span>
            <span className="block text-xs text-steel-300">автосервис в Мытищах</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Основная навигация">
          {nav.map((item) => (
            <a key={item.href} className="focus-ring rounded-lg px-3 py-2 text-sm font-semibold text-steel-200 hover:bg-white/10 hover:text-white" href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            className="focus-ring hidden min-h-11 cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold text-steel-200 transition duration-200 hover:bg-white/10 hover:text-white md:inline-flex"
            href={business.routeUrl}
          >
            <MapPin aria-hidden className="h-4 w-4 shrink-0" />
            <span>Маршрут</span>
          </a>
          <a
            className="header-phone-link focus-ring inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold transition duration-200"
            href={business.phoneHref}
            aria-label={`Позвонить ${business.phone}`}
          >
            <Phone aria-hidden className="h-4 w-4 shrink-0" />
            <span className="hidden xl:inline">Позвонить</span>
            <span className="hidden sm:inline">{business.phone}</span>
            <span className="sm:hidden">Позвонить</span>
          </a>
          <a
            className="focus-ring hidden min-h-11 cursor-pointer items-center justify-center gap-2 rounded-lg bg-brand-700 px-4 py-2.5 text-sm font-bold text-white shadow-[0_14px_30px_rgba(143,72,28,0.28)] transition duration-200 hover:bg-brand-800 md:inline-flex"
            href="#booking"
          >
            <CalendarCheck aria-hidden className="h-4 w-4 shrink-0" />
            <span>Записаться</span>
          </a>
        </div>
      </div>
    </header>
  );
}
