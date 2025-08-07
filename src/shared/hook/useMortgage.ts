import { useState, useCallback } from "react";
import { calculateMortgage } from "../config/constants/formMortgage";
import { shallowEqual, validationFormFields } from "../config/utils/utils";
import type { TResults } from "../types/mortgagePage";
import type { TFormErrors, TFormValue } from "../types/formMortgage";

export const useMortgage = (
  defaultResults: TResults,
  formValue: TFormValue,
  formErrors: TFormErrors,
  getError: (name: keyof TFormValue) => string,
  setFormErrors: (errors: TFormErrors) => void
) => {
  const [results, setResults] = useState<TResults>(defaultResults);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const validationErrors = validationFormFields(formValue, getError);
      const sameErrors = shallowEqual(validationErrors, formErrors);

      if (Object.keys(validationErrors).length > 0) {
        if (!sameErrors) {
          setFormErrors(validationErrors);
          setResults(defaultResults);
        }
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

  return { results, setResults, handleSubmit };
};
