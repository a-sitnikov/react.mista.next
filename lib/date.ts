import dayjs from "dayjs";

export function isToday(td: Date | number): boolean {
  return dayjs(td).isSame(new Date(), "day");
}

export const formatTime = (time: number): string => {
  if (time === 2147483648000) return "";

  if (isToday(time)) {
    return dayjs(time).format("HH:mm");
  } else {
    return dayjs(time).format("DD.MM.YY");
  }
};
