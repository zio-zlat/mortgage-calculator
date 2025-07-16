import clsx from "clsx";
import type { TColor, TVariant } from "../../types/typography";
import styles from "./typography.module.scss";
import React from "react";

// Текстовые теги, которые можно использовать в компоненте Typography
type TextTags =
  | "p"
  | "span"
  | "label"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6";

type ValidTags = Extract<keyof HTMLElementTagNameMap, TextTags>;

type TTypographyProps<T extends ValidTags> = {
  as?: T;
  children: React.ReactNode;
  variant?: TVariant;
  color?: TColor;
  className?: string;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export const Typography = <T extends ValidTags = "p">({
  as = "p" as T,
  variant = "text-sm",
  color = "default",
  children,
  className,
  ...rest
}: TTypographyProps<T>) => {
  const classes = clsx(variant && styles[variant], styles[color], className);

  return React.createElement(as, { className: classes, ...rest }, children);
};
