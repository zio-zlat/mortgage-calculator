import type React from "react";
import { RadioGroup } from "../../shared/ui/radioGroup/radioGroup";
import { TextInputField } from "../../shared/ui/textInputField/textInputField";
import styles from "./formMortgage.module.scss";
import { Typography } from "../../shared/ui/typography/typography";
import type {
  TFormValue,
  TInputConfigsName,
  TFormErrors,
} from "../../shared/types/formMortgage";
import { memo, useMemo } from "react";
import { NumericFormat } from "react-number-format";
import { getSeparators } from "../../shared/config/utils/utils";
import type { TLang, TLocales } from "../../shared/config/constants/locales";
import {
  INPUT_CONFIGS,
  numberAllowedInInput,
  RADIO_OPTIONS,
} from "../../shared/config/constants/formMortgage";
import { useTranslation } from "react-i18next";

type FormMortgageProps = {
  formValue: TFormValue;
  changeValue: (name: keyof TFormValue, value: string | number | null) => void;
  handleSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  resetValue?: () => void;
  errors: TFormErrors;
  locales: TLocales;
};

// Объект для отдельного назначения классов у текстовых инпутов в зависимости от имени
const TextInputClassName: Partial<Record<keyof TInputConfigsName, string>> = {
  amount: styles.form_inputList_bigInput,
};

export const FormMortgage = memo(
  ({
    formValue,
    changeValue,
    handleSubmit,
    resetValue,
    errors,
    locales,
  }: FormMortgageProps) => {
    const separators = useMemo(() => getSeparators(locales), [locales]);

    const { t } = useTranslation("form");

    //Проверка определенных полей (сейчас только rate), можно ли вводить 0 или 0 с разделителем(в зависимости от локали)
    const canEnterZero = (
      value: string,
      name: keyof TInputConfigsName,
      decimalSeparator: string
    ) => name === "rate" && (value === "0" || value === `0${decimalSeparator}`);

    //Валидация числовых полей формы с учетом лимитов и canEnterZero
    const isAllowedInput = (
      floatValue: number | undefined,
      value: string,
      name: keyof TInputConfigsName
    ) => {
      if (canEnterZero(value, name, separators.decimalSeparator)) return true;
      const { minLimit, maxLimit } = numberAllowedInInput[name];
      return (
        floatValue === undefined ||
        (floatValue >= minLimit && floatValue <= maxLimit)
      );
    };

    //Проверка инпута при потере фокуса на canEnterZero, и удаление значения
    const handleBlur = (
      e: React.FocusEvent<HTMLInputElement>,
      name: keyof TInputConfigsName
    ) => {
      if (canEnterZero(e.target.value, name, separators.decimalSeparator)) {
        changeValue(name, "");
      }
    };

    return (
      <form className={styles.form} onSubmit={handleSubmit} autoComplete="off">
        <div className={styles.form_header}>
          <Typography as="h1" variant="heading">
            {t("header.heading")}
          </Typography>
        </div>
        <div className={styles.form_inputList}>
          {INPUT_CONFIGS.map(({ name, label, affix }) => (
            <NumericFormat
              key={name}
              customInput={TextInputField}
              thousandSeparator={separators.thousandSeparator}
              decimalSeparator={separators.decimalSeparator}
              allowedDecimalSeparators={[".", ","]}
              allowNegative={false}
              decimalScale={2}
              isAllowed={({ floatValue, value }) =>
                isAllowedInput(floatValue, value, name)
              }
              type="text"
              name={name}
              value={formValue[name]}
              label={t(label)}
              labelVariant="label-sm"
              labelColor="muted"
              affix={affix}
              error={errors[name] ? t(errors[name]) : undefined}
              classError={styles.textError}
              onValueChange={({ floatValue }) => {
                changeValue(name, floatValue ?? "");
              }}
              onBlur={(e) => handleBlur(e, name)}
              className={TextInputClassName[name]}
            />
          ))}
          <RadioGroup
            title={t("input.mortgageType")}
            name="type"
            value={formValue.type}
            options={RADIO_OPTIONS}
            onChange={(e) => changeValue("type", e.target.value)}
            className={styles.form_inputList_bigInput}
            error={errors.type ? t(errors.type) : undefined}
            classError={styles.textError}
          />
        </div>
        <div className={styles.form_footer}>
          <button type="submit" className={styles.form_buttonSubmit}>
            <Typography as="span" variant="button-text">
              {t("button.submit")}
            </Typography>
          </button>
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
      </form>
    );
  }
);
