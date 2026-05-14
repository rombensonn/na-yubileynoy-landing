import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`rounded-lg border border-steel-200 bg-white shadow-[0_16px_42px_rgba(20,17,15,0.07)] ${className}`}>
      {children}
    </div>
  );
}
