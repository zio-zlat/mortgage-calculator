import { useState, useCallback } from "react";

export const useForm = <T extends Record<string, string | number | undefined>>(
  defaultValue: T,
  defaultErrors: Partial<Record<keyof T, string>>
) => {
  const [formValue, setFormValue] = useState<T>(defaultValue);

  const [formErrors, setFormErrors] =
    useState<typeof defaultErrors>(defaultErrors);

  const changeFormValue = useCallback(
    (name: keyof T, value: string | number | undefined) => {
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
    setFormValue(defaultValue);
  }, [defaultValue]);

  return {
    formValue,
    setFormValue,
    formErrors,
    setFormErrors,
    changeFormValue,
    resetFormValue,
  };
};
