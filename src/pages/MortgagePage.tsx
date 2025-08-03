import React, { useCallback, useEffect, useState } from "react";
import { FormMortgage } from "../features/formMortgage/formMortgage";
import type { TFormErrors, TFormValue } from "../shared/types/formMortgage";
import {
  calculateMortgage,
  DEFAULT_FORM_VALUE,
  validationFormFields,
} from "../shared/config/constants/formMortgage";
import { shallowEqual } from "../shared/config/utils/utils";
import { MortgageResults } from "../widgets/mortgageResults/MortgageResults";
import styles from "./mortgagePage.module.scss";
import type { TResults } from "../shared/types/mortgagePage";
import type { TLang, TLocales } from "../shared/config/constants/locales";
import { LanguageSwitcher } from "../widgets/languageSwitcher/LanguageSwitcher";

type MortgagePageProps = {
  locales: TLocales;
  possibleLanguages: TLang[];
  currentLang: TLang;
  changeLanguage: (lang: TLang) => void;
};

export const MortgagePage = ({
  locales,
  possibleLanguages,
  currentLang,
  changeLanguage,
}: MortgagePageProps) => {
  const [formValue, setFormValue] = useState<TFormValue>(DEFAULT_FORM_VALUE);

  const [results, setResults] = useState<TResults>({
    monthlyRepayments: null,
    total: null,
  });

  const [formErrors, setFormErrors] = useState<TFormErrors>({});

  const changeFormValue = useCallback(
    (name: keyof TFormValue, value: string | number | null) => {
      setFormValue((prev) => ({
        ...prev,
        [name]: value?.toString() ?? "",
      }));

      setFormErrors((prevErrors) => {
        if (!prevErrors[name]) return prevErrors;

        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    },
    []
  );

  const resetFormValue = useCallback(() => {
    setFormValue(DEFAULT_FORM_VALUE);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const validationErrors = validationFormFields(formValue);
      const sameErrors = shallowEqual(validationErrors, formErrors);

      if (Object.keys(validationErrors).length > 0) {
        if (!sameErrors) {
          setFormErrors(validationErrors);
        }
        setResults({ monthlyRepayments: null, total: null });
        return;
      } else {
        if (Object.keys(formErrors).length > 0) {
          setFormErrors({});
        }
      }

      const amount = Number(formValue.amount);
      const termInMonths = Number(formValue.term) * 12;
      const monthlyRate = Number(formValue.rate) / 1200;

      const monthlyRepayments = calculateMortgage(
        amount,
        termInMonths,
        monthlyRate,
        formValue.type
      );
      const total = monthlyRepayments * termInMonths;

      setResults({
        monthlyRepayments: monthlyRepayments,
        total: total,
      });
    },
    [formValue, formErrors]
  );

  return (
    <div className={styles.calculatorContent}>
      <LanguageSwitcher
        languages={possibleLanguages}
        onClick={changeLanguage}
        currentLang={currentLang}
      />
      <FormMortgage
        formValue={formValue}
        changeValue={changeFormValue}
        handleSubmit={handleSubmit}
        resetValue={resetFormValue}
        errors={formErrors}
        locales={locales}
      />
      <MortgageResults results={results} locales={locales} />
    </div>
  );
};
