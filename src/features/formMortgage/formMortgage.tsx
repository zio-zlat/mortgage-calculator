import type React from "react";
import { RadioGroup } from "../../shared/ui/radioGroup/radioGroup";
import { TextInputField } from "../../shared/ui/textInputField/textInputField";
import styles from "./formMortgage.module.scss";
import { Typography } from "../../shared/ui/typography/typography";
import type {
  TFormValue,
  TTextInputField,
  TOptionRadio,
  TInputConfigsName,
  TFormErrors,
} from "../../shared/types/formMortgage";
import { memo, useMemo } from "react";
import { NumericFormat } from "react-number-format";
import { getSeparators } from "../../shared/config/utils/utils";
import type { TLocales } from "../../shared/config/constants/locales";
import { numberAllowedInInput } from "../../shared/config/constants/formMortgage";

type FormMortgageProps = {
  formValue: TFormValue;
  inputConfigs: TTextInputField[];
  radioOptions: TOptionRadio[];
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
    inputConfigs,
    radioOptions,
    changeValue,
    handleSubmit,
    resetValue,
    errors,
    locales,
  }: FormMortgageProps) => {
    const separators = useMemo(() => getSeparators(locales), [locales]);

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
            Mortgage Calculator
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
              Clear All
            </Typography>
          </button>
        </div>
        <div className={styles.form_inputList}>
          {inputConfigs.map(({ name, label, affix }) => (
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
              label={label}
              labelVariant="label-sm"
              labelColor="muted"
              affix={affix}
              error={errors[name]}
              classError={styles.textError}
              onValueChange={({ floatValue }) => {
                changeValue(name, floatValue ?? "");
              }}
              onBlur={(e) => handleBlur(e, name)}
              className={TextInputClassName[name]}
            />
          ))}
          <RadioGroup
            title="Mortgage Type"
            name="type"
            value={formValue.type}
            options={radioOptions}
            onChange={(e) => changeValue("type", e.target.value)}
            className={styles.form_inputList_bigInput}
            error={errors.type}
            classError={styles.textError}
          />
        </div>
        <button type="submit" className={styles.form_buttonSubmit}>
          <Typography as="span" variant="button-text">
            Calculate Repayments
          </Typography>
        </button>
      </form>
    );
  }
);
