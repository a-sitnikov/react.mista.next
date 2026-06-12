import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const groupBy = <T, K extends string | number>(
  list: T[],
  getKey: (item: T) => K,
) =>
  list.reduce(
    (previous, currentItem) => {
      const group = getKey(currentItem);
      if (!previous[group]) previous[group] = [];
      previous[group].push(currentItem);
      return previous;
    },
    {} as Record<K, T[]>,
  );

export const undefinedIfEmpty = <T>(value: T | undefined): T | undefined => {
  if (Array.isArray(value)) {
    return value.length > 0 ? value : undefined;
  } else {
    return value ? value : undefined;
  }
};

export const asArray = <T>(value: T | T[]): T[] =>
  Array.isArray(value) ? value : [value];

export const childrenToText = (children: unknown | undefined): string[] => {
  if (!children) return [""];

  return asArray(children).map((value) => {
    if (!value) return "";

    if (typeof value === "string") {
      return value;
    } else if (
      typeof value === "object" &&
      "type" in value &&
      value.type === "br"
    ) {
      return "<br>";
    } else {
      return String(value);
    }
  });
};

export const isNil = (value: unknown): value is null | undefined => {
  return value === null || value === undefined;
};
