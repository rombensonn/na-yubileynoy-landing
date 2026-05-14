import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  tone?: "blue" | "orange" | "gray";
};

const tones = {
  blue: "border-accent-600/20 bg-accent-50 text-accent-700",
  orange: "border-brand-200 bg-brand-50 text-brand-800",
  gray: "border-steel-300 bg-white text-ink-700"
};

export function Badge({ children, tone = "gray" }: BadgeProps) {
  return (
    <span className={`inline-flex min-h-9 items-center rounded-lg border px-3 py-1.5 text-sm font-bold ${tones[tone]}`}>
      {children}
    </span>
  );
}
