import { business, faq, siteUrl } from "@/lib/business";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export function getLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["AutoRepair", "LocalBusiness"],
    "@id": `${siteUrl}/#autorepair`,
    name: business.name,
    description:
      "Автосервис в Мытищах на Юбилейной: ремонт и обслуживание автомобилей без лишних работ, с понятной записью и рекомендациями по делу.",
    url: siteUrl,
    telephone: business.phone,
    priceRange: "₽₽",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Юбилейная ул., 42Г",
      addressLocality: "Мытищи",
      addressRegion: "Московская область",
      addressCountry: "RU"
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: business.ratingValue,
      ratingCount: business.ratingCount,
      reviewCount: business.reviewCount
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: days,
        opens: "09:00",
        closes: "14:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: days,
        opens: "15:00",
        closes: "20:00"
      }
    ],
    areaServed: ["Мытищи", "Московская область"],
    makesOffer: [
      "ТО автомобиля Мытищи",
      "ремонт подвески Мытищи",
      "замена колодок Мытищи",
      "развал-схождение Мытищи",
      "шиномонтаж Мытищи",
      "диагностика автомобиля Мытищи"
    ]
  };
}

export function getFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
}
