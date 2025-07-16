import styles from "./TextInput.module.scss";
import { useLayoutEffect, useRef } from "react";
import type { InputAffix, InputTypes } from "../../types/textInput";

type TextInputProps = {
  type: InputTypes;
  name: string;
  affix?: InputAffix;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "name">;

export const TextInput = ({ type, name, affix, ...rest }: TextInputProps) => {
  const affixRef = useRef<HTMLSpanElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useLayoutEffect(() => {
    if (affixRef.current && inputRef.current) {
      const widthAffix = affixRef.current.getBoundingClientRect().width;
      if (affix?.type === "prefix") {
        inputRef.current.style.paddingLeft = `${widthAffix + 14}px`;
      } else {
        inputRef.current.style.paddingRight = `${widthAffix + 14}px`;
      }
    }
  }, [affix]);

  return (
    <div className={styles.inputWrapper}>
      {affix && (
        <span aria-hidden="true" className={styles[affix.type]} ref={affixRef}>
          {affix.content}
        </span>
      )}
      <input
        className={styles.input}
        ref={inputRef}
        type={type}
        name={name}
        {...rest}
      />
    </div>
  );
};
