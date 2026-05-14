import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { LandingPage } from "@/components/landing/LandingPage";
import { MobileStickyCta } from "@/components/landing/MobileStickyCta";
import { getFaqJsonLd, getLocalBusinessJsonLd } from "@/lib/seo";

export default function Home() {
  return (
    <>
      <Header />
      <LandingPage />
      <Footer />
      <MobileStickyCta />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getLocalBusinessJsonLd()) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getFaqJsonLd()) }} />
    </>
  );
}
