import type React from "react";
import { RadioGroup } from "../../shared/ui/radioGroup/RadioGroup";
import styles from "./formMortgage.module.scss";
import { Typography } from "../../shared/ui/typography/Typography";
import type {
  TFormValue,
  TInputNumber,
  TFormErrors,
} from "../../shared/types/formMortgage";
import { memo } from "react";
import {
  INPUT_CONFIGS,
  RADIO_OPTIONS,
} from "../../shared/config/constants/formMortgage";
import { useTranslation } from "react-i18next";
import { NumericInputField } from "../../shared/ui/numericInputField/NumericInputField";

type FormMortgageProps = {
  formValue: TFormValue;
  changeValue: (
    name: keyof TFormValue,
    value: string | number | undefined
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  resetValue: () => void;
  errors: TFormErrors;
};

// Объект для отдельного назначения классов у текстовых инпутов в зависимости от имени
const TextInputClassName: Partial<Record<keyof TInputNumber, string>> = {
  amount: styles.form_inputList_bigInput,
};

export const FormMortgage = memo(
  ({
    formValue,
    changeValue,
    handleSubmit,
    resetValue,
    errors,
  }: FormMortgageProps) => {
    const { t } = useTranslation("form");

    return (
      <form className={styles.form} onSubmit={handleSubmit} autoComplete="off">
        <div className={styles.form_header}>
          <Typography as="h1" variant="heading">
            {t("header.heading")}
          </Typography>
          <button
            type="reset"
            onClick={resetValue}
            className={styles.form_buttonReset}
          >
            <Typography
              as="span"
              variant="link-sm"
              color="muted"
              className={styles.form_buttonReset_text}
            >
              {t("button.reset")}
            </Typography>
          </button>
        </div>
        <div className={styles.form_inputList}>
          {INPUT_CONFIGS.map(({ name, label, affix }) => (
            <NumericInputField
              key={name}
              name={name}
              label={label}
              affix={affix}
              value={formValue[name]}
              onChange={changeValue}
              error={errors[name]}
              className={TextInputClassName[name]}
            />
          ))}
          <RadioGroup
            title={t("input.mortgageType")}
            name="type"
            value={formValue.type}
            options={RADIO_OPTIONS}
            onChange={changeValue}
            className={styles.form_inputList_bigInput}
            error={errors.type ? t(errors.type) : undefined}
          />
        </div>
        <div className={styles.form_footer}>
          <button type="submit" className={styles.form_buttonSubmit}>
            <Typography
              as="span"
              variant="button-text"
              className={styles.form_buttonSubmit_text}
            >
              {t("button.submit")}
            </Typography>
          </button>
        </div>
      </form>
    );
  }
);
