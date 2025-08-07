import { FormMortgage } from "../features/formMortgage/formMortgage";
import { DEFAULT_FORM_VALUE } from "../shared/config/constants/formMortgage";
import { MortgageResults } from "../widgets/mortgageResults/MortgageResults";
import styles from "./mortgagePage.module.scss";
import type { TLang } from "../shared/config/constants/locales";
import { LanguageSwitcher } from "../widgets/languageSwitcher/LanguageSwitcher";
import { useForm } from "../shared/hook/useForm";
import { useMortgage } from "../shared/hook/useMortgage";

type MortgagePageProps = {
  possibleLanguages: TLang[];
  changeLanguage: (lang: TLang) => void;
};

export const MortgagePage = ({
  possibleLanguages,
  changeLanguage,
}: MortgagePageProps) => {
  const {
    formValue,
    formErrors,
    setFormErrors,
    changeFormValue,
    resetFormValue,
  } = useForm(DEFAULT_FORM_VALUE, {});

  const { results, handleSubmit } = useMortgage(
    {
      monthlyRepayments: null,
      total: null,
    },
    formValue,
    formErrors,
    (name) => `error.${name}`,
    setFormErrors
  );

  return (
    <div className={styles.calculatorContent}>
      <LanguageSwitcher
        languages={possibleLanguages}
        onClick={changeLanguage}
      />
      <FormMortgage
        formValue={formValue}
        changeValue={changeFormValue}
        handleSubmit={handleSubmit}
        resetValue={resetFormValue}
        errors={formErrors}
      />
      <MortgageResults results={results} />
    </div>
  );
};
