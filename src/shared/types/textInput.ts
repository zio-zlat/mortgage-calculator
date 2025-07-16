//Возможные типы текстового инпута
export type InputTypes =
  | "text"
  | "email"
  | "password"
  | "search"
  | "tel"
  | "url"
  | "number";

export type InputAffix = {
  type: "prefix" | "suffix";
  content: string;
};