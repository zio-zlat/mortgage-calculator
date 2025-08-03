import { useTranslation } from "react-i18next";
import { MortgagePage } from "../pages/MortgagePage";
import {
  type TLang,
  type TLocales,
  LOCALE_MAP,
} from "../shared/config/constants/locales";

export const App = () => {
  const { i18n } = useTranslation();
  const changeLanguage = (lang: TLang) => {
    i18n.changeLanguage(lang);
  };

  const possibleLanguages: TLang[] = ["en", "ru"];
  const currentLang: TLang = i18n.resolvedLanguage as TLang;
  const locales: TLocales = LOCALE_MAP[currentLang];

  return (
    <MortgagePage
      locales={locales}
      possibleLanguages={possibleLanguages}
      currentLang={currentLang}
      changeLanguage={changeLanguage}
    />
  );
};
