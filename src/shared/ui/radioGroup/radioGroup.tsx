import styles from "./RadioGroup.module.scss";
import clsx from "clsx";
import { Typography } from "../typography/Typography";
import type { TFormValue, TOptionRadio } from "../../types/formMortgage";
import { useTranslation } from "react-i18next";
import { RadioInput } from "../radioInput/RadioInput";
import { memo } from "react";

type RadioGroupProps = {
  title: string;
  name: keyof TFormValue;
  value: string;
  options: TOptionRadio[];
  error?: string;
  onChange: (name: keyof TFormValue, value: string) => void;
  className?: string;
};

export const RadioGroup = memo(
  ({
    title,
    name,
    value,
    options,
    error,
    onChange,
    className,
  }: RadioGroupProps) => {
    const { t } = useTranslation("form");

    return (
      <fieldset className={clsx(styles.radioGroup, className)}>
        <Typography as="legend" color="muted" className={styles.legend}>
          {title}
        </Typography>
        {options.map((option) => (
          <label
            key={option.value}
            className={clsx(
              styles.radio,
              value === option.value ? styles.selected : ""
            )}
          >
            <RadioInput
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(name, e.target.value)}
              inputClassName={styles.radio_input}
              indicatorClassName={styles.radio_visual}
            />
            <Typography as="span" variant="button-text">
              {t(option.label)}
            </Typography>
          </label>
        ))}
        {error && (
          <Typography
            as="span"
            variant="text-error"
            color="error"
            className={styles.textError}
          >
            {error}
          </Typography>
        )}
      </fieldset>
    );
  }
);
