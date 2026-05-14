import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  text?: string;
  children: ReactNode;
  className?: string;
};

export function Section({ id, eyebrow, title, text, children, className = "" }: SectionProps) {
  return (
    <section id={id} className={`py-16 md:py-24 ${className}`}>
      <div className="section-shell">
        <div className="section-heading mb-8 md:mb-12">
          <div>
            {eyebrow ? <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.14em] text-brand-700">{eyebrow}</p> : null}
            <h2 className="font-display max-w-5xl text-3xl font-semibold leading-tight text-ink-950 md:text-5xl">{title}</h2>
          </div>
          {text ? <p className="mt-4 max-w-3xl text-lg leading-8 text-ink-600">{text}</p> : null}
        </div>
        {children}
      </div>
    </section>
  );
}
