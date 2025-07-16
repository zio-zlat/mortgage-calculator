import clsx from "clsx";
import type { InputAffix, InputTypes } from "../../types/textInput";
import type { TColor, TVariant } from "../../types/typography";
import { TextInput } from "../textInput/textInput";
import { Typography } from "../typography/typography";
import styles from "./textInputField.module.scss";

type TextInputFieldProps = {
  type: InputTypes;
  id?: string;
  name: string;
  value?: string;
  label: string;
  affix?: InputAffix;
  labelVariant: TVariant;
  labelColor?: TColor;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

export const TextInputField = (props: TextInputFieldProps) => {
  const {
    type,
    id,
    name,
    value,
    label,
    labelVariant,
    labelColor,
    affix,
    onChange,
    className,
  } = props;

  const inputId = id || `input-${name}`;

  return (
    <div className={clsx(styles.textInputField, className)}>
      <Typography
        as="label"
        htmlFor={inputId}
        variant={labelVariant}
        color={labelColor}
      >
        {label}
      </Typography>
      <TextInput
        type={type}
        id={inputId}
        name={name}
        value={value}
        affix={affix}
        onChange={onChange}
      />
    </div>
  );
};
