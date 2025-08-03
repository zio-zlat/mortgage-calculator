import clsx from "clsx";
import type { TInputAffix, TInputTypes } from "../../types/formMortgage";
import styles from "./TextInput.module.scss";
import { useLayoutEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

type TextInputProps = {
  type: TInputTypes;
  name: string;
  affix?: TInputAffix;
  error?: boolean;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "name">;

export const TextInput = ({
  type,
  name,
  affix,
  error,
  ...rest
}: TextInputProps) => {
  const affixRef = useRef<HTMLSpanElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { t } = useTranslation();

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

  return (
    <div className={styles.inputWrapper}>
      <input
        className={clsx(styles.input, error && styles.input_error)}
        ref={inputRef}
        type={type}
        name={name}
        {...rest}
      />
      {affix && (
        <span aria-hidden="true" className={styles[affix.type]} ref={affixRef}>
          {t(affix.content)}
        </span>
      )}
    </div>
  );
};
