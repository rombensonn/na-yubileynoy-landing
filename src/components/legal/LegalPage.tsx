import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/landing/Footer";
import { business } from "@/lib/business";

type LegalPageProps = {
  title: string;
  intro: string;
  children: React.ReactNode;
};

export function LegalPage({ title, intro, children }: LegalPageProps) {
  return (
    <>
      <main className="bg-white">
        <div className="section-shell py-10 md:py-16">
          <Link className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-bold text-brand-700 hover:text-brand-600" href="/">
            <ArrowLeft aria-hidden className="h-4 w-4" />
            На главную
          </Link>
          <div className="mt-8 max-w-4xl">
            <p className="text-sm font-bold uppercase text-brand-700">{business.name}</p>
            <h1 className="mt-3 text-3xl font-extrabold leading-tight text-ink-950 md:text-5xl">{title}</h1>
            <p className="mt-5 text-lg leading-8 text-ink-700">{intro}</p>
          </div>
          <article className="prose-legal mt-10 max-w-4xl rounded-lg border border-steel-200 bg-slate-50 p-5 md:p-8">
            {children}
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
