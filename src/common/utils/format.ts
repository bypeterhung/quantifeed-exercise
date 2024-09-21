import dayjs from "dayjs";

import { hasValue } from "./has-value";

export function formatDate(
  date: Date | null | undefined,
  pattern: string
): string {
  return hasValue(date) ? dayjs(date).format(pattern) : "";
}

export function formatNumber(
  number: number,
  locale: string,
  options?: Intl.NumberFormatOptions
) {
  return new Intl.NumberFormat(locale, options).format(number);
}
