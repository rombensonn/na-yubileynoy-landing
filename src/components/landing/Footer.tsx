import Link from "next/link";
import { business } from "@/lib/business";

export function Footer() {
  return (
    <footer className="workshop-grid border-t border-white/10 bg-ink-950 pb-24 pt-10 text-white md:pb-10">
      <div className="section-shell grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="font-display text-lg font-semibold">{business.name}</p>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
            Автосервис в Мытищах на Юбилейной улице. Заявка на сайте не является публичной офертой; точная стоимость работ
            согласовывается после уточнения задачи.
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm text-slate-300 sm:flex-row sm:gap-4">
          <Link className="focus-ring rounded-lg hover:text-white" href="/privacy/">
            Политика обработки персональных данных
          </Link>
          <Link className="focus-ring rounded-lg hover:text-white" href="/consent/">
            Согласие на обработку персональных данных
          </Link>
        </div>
      </div>
    </footer>
  );
}
