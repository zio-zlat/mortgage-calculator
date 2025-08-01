import clsx from "clsx";
import type { TColor, TVariant } from "../../types/typography";
import { TextInput } from "../textInput/textInput";
import { Typography } from "../typography/typography";
import styles from "./textInputField.module.scss";
import type { TInputAffix, TInputTypes } from "../../types/formMortgage";

type TextInputFieldProps = {
  type: TInputTypes;
  id?: string;
  name: string;
  value?: string;
  label: string;
  affix?: TInputAffix;
  labelVariant: TVariant;
  labelColor?: TColor;
  error?: string;
  classError?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
    error,
    classError,
    onChange,
    onBlur,
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
        error={!!error}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && (
        <Typography as="span" variant="text-error" color="error" className={classError}>
          {error}
        </Typography>
      )}
    </div>
  );
};
