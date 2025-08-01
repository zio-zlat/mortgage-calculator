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

export const RADIO_OPTIONS: TOptionRadio[] = [
  { label: "Repayment", value: "repayment" },
  { label: "Interest Only", value: "interest" },
];

export const INPUT_CONFIGS: TTextInputField[] = [
  {
    name: "amount",
    label: "Mortgage Amount",
    affix: { type: "prefix", content: "£" },
  },
  {
    name: "term",
    label: "Mortgage Term",
    affix: { type: "suffix", content: "years" },
  },
  {
    name: "rate",
    label: "Interest Rate",
    affix: { type: "suffix", content: "%" },
  },
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
      errors[key as keyof TFormErrors] = "This field is required";
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
