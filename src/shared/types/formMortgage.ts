export type TInputConfigsName = {
  amount: string;
  term: string;
  rate: string;
};

export type minMaxAllowed = {
  minLimit: number;
  maxLimit: number;
};

export type TFormValue = {
  type: string;
} & TInputConfigsName;

export type TFormErrors = {
  [key in keyof TFormValue]?: string;
};

export type TInputAffix = {
  type: "prefix" | "suffix";
  content: string;
};

export type TTextInputField = {
  name: keyof TInputConfigsName;
  label: string;
  affix?: TInputAffix;
};

//Возможные типы текстового инпута
export type TInputTypes =
  | "text"
  | "email"
  | "password"
  | "search"
  | "tel"
  | "url"
  | "number";

export type TOptionRadio = {
  label: string;
  value: string;
};
