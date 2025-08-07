type InputProps = {
  type: string;
  name: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "name">;

export const Input = ({ type, name, ...rest }: InputProps) => (
  <input type={type} name={name} {...rest} />
);
