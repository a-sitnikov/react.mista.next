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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const childrenToText = (children: any[] | undefined): string[] => {
  if (!children) return [""];

  return children.map((value) => {
    if (!value) return value;

    if (typeof value === "string") {
      return value;
    } else if (value.type === "br") {
      return "<br>";
    } else if (
      value.type.displayName === "Connect(LinkToPost)" ||
      value.type.displayName === "Connect(t)"
    ) {
      return value.props.number;
    } else {
      console.log(value);
      return value;
    }
  });
};

export const isNil = (value: unknown): value is null | undefined => {
  return value === null || value === undefined;
};
