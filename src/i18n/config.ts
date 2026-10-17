// i18n konfiqurasiyası — 3 dil, əsas AZ
export const locales = ["az", "en", "ru"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "az";

export const localeNames: Record<Locale, string> = {
  az: "AZ",
  en: "EN",
  ru: "RU",
};

export const localeFullNames: Record<Locale, string> = {
  az: "Azərbaycanca",
  en: "English",
  ru: "Русский",
};

// SEO <html lang> / hreflang üçün BCP-47 kodları
export const localeHtmlLang: Record<Locale, string> = {
  az: "az",
  en: "en",
  ru: "ru",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

// Locale-aware link: /az/products, /en/products ...
export function localePath(locale: Locale, href: string): string {
  if (!href.startsWith("/")) return href; // xarici / anchor
  if (href === "/") return `/${locale}`;
  return `/${locale}${href}`;
}
