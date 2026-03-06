# NEXTDOM landing (production-ready static package)

## Struktura plików

- `index.html` — strona główna + House Price Estimator.
- `offer.html` — podstrona ofertowa.
- `technology.html` — podstrona technologii i procesu.
- `inspirations.html` — inspiracje i przykłady systemowe.
- `about.html` — strona o marce i roli NEXTDOM.
- `faq.html` — pełne FAQ + schema FAQPage.
- `contact.html` — formularz leadowy i dane kontaktowe.
- `privacy.html` — placeholder polityki prywatności do podmiany.
- `assets/styles.css` — design system, layout, responsive.
- `assets/app.js` — i18n runtime, tracking, estimator logic hook, form UX.
- `assets/calculator-config.js` — centralna konfiguracja cen kalkulatora.
- `assets/content.js` — wspólne etykiety nawigacji.

## Co gdzie edytować

1. **Treści stron (NL/EN)**
   - Każda strona ma obiekt `window.PAGE_I18N` na dole pliku.
   - Edytujesz jednocześnie `nl` i `en`.

2. **Modele i układ kart oferty**
   - `offer.html` (karty modeli).
   - `index.html` (sekcja wybranych modeli).

3. **Kalkulator ceny**
   - Wszystkie liczby i mnożniki edytujesz tylko w `assets/calculator-config.js`.

4. **Walidacja i zachowania UX**
   - `assets/app.js` (submit, success state, eventy dataLayer/GA).

5. **Design i spacing**
   - `assets/styles.css`.

6. **SEO metadata**
   - `<title>`, `<meta name="description">`, OG, canonical w `<head>` każdej podstrony.

## Ręczne uzupełnienia przed publikacją

- Logo/brand assets (header + favicon).
- Dane kontaktowe widoczne na `contact.html` (telefon, WhatsApp, godziny kontaktu).
- Finalne dane kontaktowe i rejestrowe (KvK/VAT/adres).
- Finalna polityka prywatności (`privacy.html`).
- Finalne ceny i mnożniki w estimatorze (`assets/calculator-config.js`).
- Finalne zdjęcia (z prawami/licencją) zamiast obecnych placeholderów/inspiracji.
- Finalny identyfikator GA4 (`G-XXXXXXXXXX`) i ewentualny GTM snippet.
- Realny endpoint formularza leadowego (backend/CRM/webhook) — obecnie formularz działa w trybie frontend demo.
- Finalny obraz OG (Open Graph) pod produkcyjnym URL.

## Rekomendowane kroki przed deployem

1. Podmień placeholdery i sprawdź spójność NL/EN po podmianach.
2. Przepuść stronę przez Lighthouse (mobile + desktop).
3. Zweryfikuj walidację formularza w docelowej przeglądarce i integrację backend/API (jeśli dochodzi).
4. Podłącz realny endpoint formularza lub narzędzie CRM/webhook.
5. Dodaj finalne `sitemap.xml` i `robots.txt` dla docelowej domeny.
6. Wykonaj finalny test regresji: linki, CTA, estimator, schema FAQ, tracking eventów.

## Uruchomienie lokalne i deploy

- Projekt jest statyczny (brak build step i brak zależności runtime).
- Do lokalnego podglądu wystarczy prosty serwer statyczny, np.:
  - `python -m http.server 8080`
  - albo dowolny static server w IDE/hostingu.
- Gotowy do hostingu typu GitHub Pages / Netlify / Vercel Static po podmianie wszystkich placeholderów produkcyjnych.
