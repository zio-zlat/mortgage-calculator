import { useCallback } from "react";

export const useNumberInput = <T extends Record<string, unknown>>(
  zeroAllowedInInput: (keyof T)[] | undefined,
  getLimits: (
    name: keyof T
  ) => { minLimit: number; maxLimit: number } | undefined,
  changeValue: (name: keyof T, value: number | undefined) => void
) => {
  //Проверка определенных полей на возможность вводить 0 или 0 с разделителем,
  //например, для ввода 0.1, если в поле не может быть 0
  const canEnterZero = (value: string, name: keyof T) =>
    zeroAllowedInInput?.includes(name) && /^0([.,])?$/.test(value);

  //Валидация числовых полей формы с учетом лимитов и canEnterZero
  const isAllowedInput = useCallback(
    (floatValue: number | undefined, value: string, name: keyof T) => {
      if (canEnterZero(value, name)) return true;

      const limits = getLimits(name);
      if (!limits) return true;

      const { minLimit, maxLimit } = limits;
      return (
        floatValue === undefined ||
        (floatValue >= minLimit && floatValue <= maxLimit)
      );
    },
    [canEnterZero, getLimits]
  );

  //Проверка инпута при потере фокуса на canEnterZero, и удаление значения,
  //если поле содержит 0 или 0 с разделителем
  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>, name: keyof T) => {
      if (canEnterZero(e.target.value, name)) {
        changeValue(name, undefined);
      }
    },
    [canEnterZero, changeValue]
  );

  return { isAllowedInput, handleBlur };
};
