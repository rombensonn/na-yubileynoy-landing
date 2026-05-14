# Design System: «На Юбилейной»

## Art Direction

Новая визуальная система уходит от шаблонного “светлый SaaS с карточками” к ощущению локального сервисного бокса: графитовая глубина, медно-янтарный рабочий свет, холодная сталь и чистые светлые поверхности.

Палитра имитирует фотографию вечернего автосервиса: тёмный кузов, металлические панели, тёплая лампа над рабочей зоной и сине-стальные тени.

## Principles

1. Сначала доверие, потом декор: каждый визуальный блок объясняет процесс, цены, запись или отзывы.
2. Разные блоки имеют разные роли: hero как сцена, услуги как рабочая ведомость, процесс как маршрут, отзывы как доска доверия.
3. Primary CTA один и тёплый: медный цвет используется для записи и ключевых действий.
4. Визуальная плотность контролируется: тёмные секции чередуются со светлыми, чтобы лендинг не стал однотонным.
5. Доступность обязательна: контрастные пары, видимые focus states, touch targets от 44px.

## Tokens

- Graphite: `#14110F`, `#1D1915`, `#2B2520`
- Steel: `#F7F8F6`, `#ECEEEA`, `#D7D8D0`, `#B6B8AE`
- Copper/Amber: `#BF6A2F`, `#A95522`, `#8F481C`, `#FFF3E8`
- Blue steel: `#226675`, `#174C5A`, `#E8F4F6`
- Typography: Unbounded for display headings, Manrope for body text.
- Radius: 8px for UI cards, forms, buttons and media frames.
- Motion: restrained reveal, 320ms, disabled by `prefers-reduced-motion`.

## Components

- Hero uses a dark photographic service-bay panel instead of generic illustration.
- Service tiles use asymmetrical spans and a work-order feel, not identical icon cards.
- Price block pairs a dark “agreement” note with a practical table.
- Booking uses a dark high-contrast section with a white form surface.
- Reviews are short, editorial snippets with star proof, not long testimonial cards.

## Anti-Patterns Removed

- Generic blue/orange SaaS palette.
- Repeated white cards with identical rhythm.
- Decorative grid hero with no atmosphere.
- Overly soft “template landing” sections.
- Claims like «лучший», «самые низкие цены», «100% без очередей».
