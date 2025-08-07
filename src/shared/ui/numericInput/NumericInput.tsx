import type {
  TInputNumber,
  TInputNumberTypes,
  TNumberAllowedInInput,
} from "../../types/formMortgage";
import { NumericFormat } from "react-number-format";
import { Input } from "../input/Input";
import { useNumberInput } from "../../hook/useNumberInput";
import { forwardRef } from "react";

type NumericInputProps = {
  type: TInputNumberTypes;
  id?: string;
  name: keyof TInputNumber;
  value: string;
  separators: { thousandSeparator: string; decimalSeparator: string };
  allowNegative?: boolean;
  decimalScale?: number;
  zeroAllowedInInput?: (keyof TInputNumber)[];
  numberAllowedInInput?: TNumberAllowedInInput;
  onChange: (name: keyof TInputNumber, value: number | undefined) => void;
  className?: string;
};

export const NumericInput = forwardRef<HTMLInputElement, NumericInputProps>(
  (
    {
      type,
      id,
      name,
      value,
      separators,
      allowNegative = false,
      decimalScale = 2,
      zeroAllowedInInput,
      numberAllowedInInput,
      onChange,
      className,
    },
    ref
  ) => {
    const { isAllowedInput, handleBlur } = useNumberInput<TInputNumber>(
      zeroAllowedInInput,
      (name) => numberAllowedInInput?.[name],
      onChange
    );

    return (
      <NumericFormat
        getInputRef={ref}
        customInput={Input}
        inputMode="numeric"
        thousandSeparator={separators.thousandSeparator}
        decimalSeparator={separators.decimalSeparator}
        allowedDecimalSeparators={[",", "."]}
        allowNegative={allowNegative}
        decimalScale={decimalScale}
        isAllowed={({ floatValue, value }) =>
          isAllowedInput(floatValue, value, name)
        }
        type={type}
        id={id}
        name={name}
        value={value}
        onValueChange={({ floatValue }) => {
          onChange(name, floatValue);
        }}
        onBlur={(e) => handleBlur(e, name)}
        className={className}
      />
    );
  }
);
