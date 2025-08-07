import { useTranslation } from "react-i18next";
import { MortgagePage } from "../pages/MortgagePage";
import { type TLang } from "../shared/config/constants/locales";

export const App = () => {
  const { i18n } = useTranslation();
  const changeLanguage = (lang: TLang) => {
    i18n.changeLanguage(lang);
  };

  const possibleLanguages: TLang[] = ["en", "ru"];

  return (
    <MortgagePage
      possibleLanguages={possibleLanguages}
      changeLanguage={changeLanguage}
    />
  );
};
