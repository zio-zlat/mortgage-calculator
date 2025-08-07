export type TInputNumber = {
  amount: string;
  term: string;
  rate: string;
};

export type TMinMaxAllowed = {
  minLimit: number;
  maxLimit: number;
};

export type TNumberAllowedInInput = Record<
  keyof TInputNumber,
  TMinMaxAllowed
>;

export type TFormValue = {
  type: string;
} & TInputNumber;

export type TFormErrors = {
  [key in keyof TFormValue]?: string;
};

export type TInputAffix = {
  type: "prefix" | "suffix";
  content: string;
};

export type TTextInputField = {
  name: keyof TInputNumber;
  label: string;
  affix?: TInputAffix;
};

//Возможные типы числовых инпутов
export type TInputNumberTypes = "text" | "tel" | "password";

export type TOptionRadio = {
  label: string;
  value: string;
};
