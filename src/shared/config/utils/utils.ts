import type { TLocales } from "../constants/locales";

//Поверхностное сравнение двух объектов по ключам
export const shallowEqual = <T extends object>(obj1: T, obj2: T): boolean => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  return keys1.every((key) => {
    const typeKey = key as keyof T;
    return obj1[typeKey] === obj2[typeKey];
  });
};

//Форматирование чисел
export const numberFormat = (
  value: number | null | undefined,
  locales: TLocales
) => {
  if (value === null || value === undefined) return "";

  const formatter = new Intl.NumberFormat(`${locales}`, {
    maximumFractionDigits: 2,
  });

  return formatter.format(value);
};

//Получение разрядного и десятичного разделителя в выбранной локале
export const getSeparators = (locales: TLocales) => {
  const separators = numberFormat(1000.5, locales).replace(/\d/g, "").split("");

  const thousandSeparator = separators[0];
  const decimalSeparator = separators[1];

  return {
    decimalSeparator: decimalSeparator,
    thousandSeparator: thousandSeparator,
  };
};
