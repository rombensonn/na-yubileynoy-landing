import type { Metadata } from "next";
import { Manrope, Unbounded } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-manrope"
});

const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-display",
  weight: ["500", "600", "700"]
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
const iconUrl = process.env.GITHUB_PAGES === "true" ? `${siteUrl}/icon.svg` : "/icon.svg";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Автосервис На Юбилейной в Мытищах - ремонт, ТО, развал-схождение и запись",
  description:
    "Автосервис \"На Юбилейной\" в Мытищах: ремонт и обслуживание автомобилей, ТО, подвеска, тормоза, развал-схождение, шиномонтаж. Рейтинг 4,5, 251 оценка. Запись по телефону и через форму.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Автосервис \"На Юбилейной\" в Мытищах",
    description:
      "Ремонт и обслуживание автомобилей на Юбилейной улице, 42Г - по записи, с согласованием работ и рекомендациями по делу.",
    url: "/",
    siteName: "На Юбилейной",
    locale: "ru_RU",
    type: "website"
  },
  icons: {
    icon: iconUrl
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${manrope.variable} ${unbounded.variable}`}>
      <body>{children}</body>
    </html>
  );
}
