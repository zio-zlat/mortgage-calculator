import type React from "react";
import { Input } from "../input/Input";

type RadioInputProps = {
  name: string;
  value: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputClassName?: string;
  indicatorClassName?: string;
};

export const RadioInput = ({
  name,
  value,
  checked,
  onChange,
  inputClassName,
  indicatorClassName,
}: RadioInputProps) => {
  return (
    <>
      <Input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className={inputClassName}
      />
      <span className={indicatorClassName}></span>
    </>
  );
};
