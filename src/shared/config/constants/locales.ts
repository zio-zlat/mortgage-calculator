export type TLang = "en" | "ru";

export type TLocales = "en-EN" | "ru-RU";

export const LOCALE_MAP: Record<TLang, TLocales> = {
  en: "en-EN",
  ru: "ru-RU",
};

export const LANGUAGE_LABELS: Record<TLang, string> = {
  en: "ENG",
  ru: "РУС",
};
