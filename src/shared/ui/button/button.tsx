import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.scss";

type ButtonProps = {
  type?: "submit" | "reset" | "button";
  children: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "children">;

export const Button = ({ type = "button", children, ...rest }: ButtonProps) => {
  return (
    <button type={type} className={styles.button} {...rest}>
      {children}
    </button>
  );
};
