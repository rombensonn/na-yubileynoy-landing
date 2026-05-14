import { CalendarCheck, Phone } from "lucide-react";
import { business } from "@/lib/business";

export function MobileStickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-ink-950/95 p-3 shadow-[0_-12px_28px_rgba(20,17,15,0.26)] backdrop-blur md:hidden">
      <div className="grid grid-cols-2 gap-3">
        <a
          className="focus-ring flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 text-sm font-bold text-white"
          href={business.phoneHref}
        >
          <Phone aria-hidden className="h-4 w-4" />
          Позвонить
        </a>
        <a className="focus-ring flex min-h-12 items-center justify-center gap-2 rounded-lg bg-brand-700 text-sm font-bold text-white" href="#booking">
          <CalendarCheck aria-hidden className="h-4 w-4" />
          Записаться
        </a>
      </div>
    </div>
  );
}
