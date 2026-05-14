import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import type { IconComponent } from "@/lib/business";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "md" | "lg";

const base =
  "focus-ring inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-lg font-bold transition duration-200 disabled:cursor-not-allowed disabled:opacity-55";

const variants: Record<Variant, string> = {
  primary: "bg-brand-700 text-white shadow-[0_14px_30px_rgba(143,72,28,0.28)] hover:bg-brand-800",
  secondary: "bg-accent-700 text-white hover:bg-accent-600",
  outline: "border border-steel-300 bg-white/90 text-ink-950 hover:border-brand-600 hover:bg-brand-50 hover:text-brand-800",
  ghost: "text-ink-700 hover:bg-steel-100 hover:text-ink-950"
};

const sizes: Record<Size, string> = {
  md: "px-4 py-2.5 text-sm",
  lg: "px-5 py-3 text-base"
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  icon?: IconComponent;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  icon: Icon,
  children,
  className = "",
  ...props
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {Icon ? <Icon aria-hidden className="h-4 w-4 shrink-0" /> : null}
      <span>{children}</span>
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  icon: Icon,
  children,
  className = "",
  ...props
}: CommonProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {Icon ? <Icon aria-hidden className="h-4 w-4 shrink-0" /> : null}
      <span>{children}</span>
    </a>
  );
}
