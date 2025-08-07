import clsx from "clsx";
import { Typography } from "../typography/Typography";
import styles from "./numericInputField.module.scss";
import type { TInputAffix, TInputNumber } from "../../types/formMortgage";
import { memo, useLayoutEffect, useMemo, useRef } from "react";
import { NumericInput } from "../numericInput/NumericInput";
import {
  NUMBER_ALLOWED_IN_INPUT,
  ZERO_ALLOWED_IN_INPUT,
} from "../../config/constants/formMortgage";
import { useTranslation } from "react-i18next";
import { getSeparators } from "../../config/utils/utils";

type NumericInputFieldProps = {
  id?: string;
  name: keyof TInputNumber;
  value: string;
  label: string;
  affix?: TInputAffix;
  error?: string;
  onChange: (name: keyof TInputNumber, value: number | undefined) => void;
  className?: string;
};

export const NumericInputField = memo(
  ({
    id,
    name,
    value,
    label,
    affix,
    error,
    onChange,
    className,
  }: NumericInputFieldProps) => {
    const affixRef = useRef<HTMLSpanElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useLayoutEffect(() => {
      if (affixRef.current && inputRef.current) {
        const widthAffix = affixRef.current.getBoundingClientRect().width;
        if (affix?.type === "prefix") {
          inputRef.current.style.paddingLeft = `${widthAffix + 20}px`;
        } else {
          inputRef.current.style.paddingRight = `${widthAffix}px`;
        }
      }
    }, [affix]);

    const { t, i18n } = useTranslation("form");

    const separators = useMemo(
      () => getSeparators(i18n.language),
      [i18n.language]
    );

    const inputId = id || `input-${name}`;

    return (
      <div className={clsx(styles.numberInputField, className)}>
        <Typography as="label" htmlFor={inputId} color="muted">
          {t(label)}
        </Typography>
        <div className={styles.inputWrapper}>
          <NumericInput
            ref={inputRef}
            type="text"
            id={inputId}
            name={name}
            value={value}
            separators={separators}
            zeroAllowedInInput={ZERO_ALLOWED_IN_INPUT}
            numberAllowedInInput={NUMBER_ALLOWED_IN_INPUT}
            onChange={onChange}
            className={clsx(styles.input, error ? styles.input_error : "")}
          />
          {affix && (
            <span
              aria-hidden="true"
              className={styles[affix.type]}
              ref={affixRef}
            >
              {t(affix.content)}
            </span>
          )}
        </div>
        {error && (
          <Typography
            as="span"
            variant="text-error"
            color="error"
            className={styles.textError}
          >
            {t(error)}
          </Typography>
        )}
      </div>
    );
  }
);
