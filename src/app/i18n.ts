import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import form_en from "../shared/config/locales/en/formMortgage.json";
import results_en from "../shared/config/locales/en/mortgageResults.json";
import form_ru from "../shared/config/locales/ru/formMortgage.json";
import results_ru from "../shared/config/locales/ru/mortgageResults.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { form: form_en, results: results_en },
    ru: { form: form_ru, results: results_ru },
  },
  lng: "en",
  fallbackLng: "en",

  ns: ["form", "results"],

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
