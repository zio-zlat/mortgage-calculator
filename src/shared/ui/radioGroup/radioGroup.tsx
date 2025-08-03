import styles from "./RadioGroup.module.scss";
import clsx from "clsx";
import { RadioButton } from "../radioButton/radioButton";
import { Typography } from "../typography/typography";
import type React from "react";
import type { TOptionRadio } from "../../types/formMortgage";
import { useTranslation } from "react-i18next";

type RadioGroupProps = {
  title: string;
  name: string;
  value: string;
  options: TOptionRadio[];
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  classError?: string;
};

export const RadioGroup = ({
  title,
  name,
  value,
  options,
  error,
  onChange,
  className,
  classError
}: RadioGroupProps) => {
  const { t } = useTranslation("form");

  return (
    <div className={clsx(styles.radioGroup, className)}>
      <Typography variant="label-sm" color="muted" style={{marginBottom: '2px'}}>
        {title}
      </Typography>
      {options.map((option) => (
        <label
          key={option.value}
          className={clsx(
            styles.radioButton,
            value === option.value ? styles.selected : ""
          )}
        >
          <RadioButton
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={(e) => onChange(e)}
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
          className={classError}
        >
          {error}
        </Typography>
      )}
    </div>
  );
};
