import type {
  TFormErrors,
  TFormValue,
  TOptionRadio,
  TTextInputField,
  TNumberAllowedInInput,
  TInputNumber,
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

export const NUMBER_ALLOWED_IN_INPUT: TNumberAllowedInInput = {
  amount: { minLimit: 1, maxLimit: 50000000 },
  term: { minLimit: 1, maxLimit: 35 },
  rate: { minLimit: 0.1, maxLimit: 50 },
};

export const ZERO_ALLOWED_IN_INPUT: (keyof TInputNumber)[] = ["rate"];

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
