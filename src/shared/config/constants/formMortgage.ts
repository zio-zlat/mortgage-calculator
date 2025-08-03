import type {
  minMaxAllowed,
  TFormErrors,
  TFormValue,
  TInputConfigsName,
  TOptionRadio,
  TTextInputField,
} from "../../types/formMortgage";

export const DEFAULT_FORM_VALUE: TFormValue = {
  amount: "",
  term: "",
  rate: "",
  type: "",
};

export const INPUT_CONFIGS: TTextInputField[] = [
  {
    name: "amount",
    label: "input.mortgageAmount",
    affix: { type: "prefix", content: "input.affixAmount" },
  },
  {
    name: "term",
    label: "input.mortgageTerm",
    affix: { type: "suffix", content: "input.affixTerm" },
  },
  {
    name: "rate",
    label: "input.interestRate",
    affix: { type: "suffix", content: "%" },
  },
];

export const RADIO_OPTIONS: TOptionRadio[] = [
  { label: "radio.repayment", value: "repayment" },
  { label: "radio.interestOnly", value: "interest" },
];

export const numberAllowedInInput: Record<
  keyof TInputConfigsName,
  minMaxAllowed
> = {
  amount: { minLimit: 1, maxLimit: 50000000 },
  term: { minLimit: 1, maxLimit: 35 },
  rate: { minLimit: 0.1, maxLimit: 50 },
};

//Валидация полей формы
export const validationFormFields = (values: TFormValue) => {
  const errors: TFormErrors = {};

  Object.entries(values).forEach(([key, value]) => {
    if (!value) {
      errors[key as keyof TFormErrors] = "input.error";
    }
  });

  return errors;
};

//Формула расчета ипотеки
export const calculateMortgage = (
  amount: number,
  termInMonths: number,
  monthlyRate: number,
  type: string
) => {
  if (type === "repayment") {
    const pow = Math.pow(1 + monthlyRate, termInMonths);
    return (amount * monthlyRate * pow) / (pow - 1);
  } else {
    return amount * monthlyRate;
  }
};
