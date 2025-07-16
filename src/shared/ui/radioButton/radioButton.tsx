import styles from "./RadioButton.module.scss";

type RadioButtonProps = {
  name: string;
  value: string;
} & Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "name" | "value"
>;

export const RadioButton = ({ name, value, ...rest }: RadioButtonProps) => {
  return (
    <>
      <input
        className={styles.inputRadio}
        type="radio"
        name={name}
        value={value}
        {...rest}
      />
      <span className={styles.visualRadio}></span>
    </>
  );
};
