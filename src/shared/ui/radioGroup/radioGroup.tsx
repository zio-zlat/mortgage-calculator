import styles from "./RadioGroup.module.scss";
import clsx from "clsx";
import { RadioButton } from "../radioButton/radioButton";
import { Typography } from "../typography/typography";

type Option = {
  label: string;
  value: string;
};

type RadioGroupProps = {
  title: string
  name: string;
  value: string;
  options: Option[];
  error?: string;
  onClickRadio: (value: string) => void;
  className?: string;
};

export const RadioGroup = ({
  title,
  name,
  value,
  options,
  error,
  onClickRadio,
  className,
}: RadioGroupProps) => {
  return (
    <div className={clsx(styles.radioGroup, className)}>
      <Typography variant='label-sm' color='muted'>
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
            onChange={() => onClickRadio(option.value)}
          />
          <Typography as="span" variant="button-text">
            {option.label}
          </Typography>
        </label>
      ))}
      {error && (
        <Typography as="span" variant="text-error" color="error">
          {error}
        </Typography>
      )}
    </div>
  );
};
