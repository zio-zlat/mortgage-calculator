import {
  LANGUAGE_LABELS,
  type TLang,
} from "../../shared/config/constants/locales";
import { Typography } from "../../shared/ui/typography/typography";
import styles from "./languageSwitcher.module.scss";

type LanguageSwitcherProps = {
  languages: TLang[];
  currentLang: TLang;
  onClick: (lang: TLang) => void;
};

export const LanguageSwitcher = ({
  languages,
  currentLang,
  onClick,
}: LanguageSwitcherProps) => {
  return (
    <div className={styles.languageSwitcher}>
      {languages.map((lang) => (
        <button
          key={lang}
          type="button"
          disabled={currentLang === lang}
          onClick={() => onClick(lang)}
          className={styles.languageSwitcher_button}
        >
          <Typography
            as="span"
            variant="link-sm"
            color="white"
            className={styles.languageSwitcher_button_text}
          >
            {LANGUAGE_LABELS[lang]}
          </Typography>
        </button>
      ))}
    </div>
  );
};
