export type HasValueOptions =
  | "allow-empty-string" // count empty string as valid value (will be ignored if disallow-whitespace is on)
  | "disallow-whitespace" // not count whitespace as valid value
  | "disallow-empty-array" // not count empty array as valid value
  | "disallow-empty-object" // not count empty object as valid value
  | "disallow-nan"; // not count nan as valid value, only works for number

export const hasValue = <T>(
  data: T,
  options: HasValueOptions[] = []
): data is Exclude<T, null | undefined> => {
  if (
    data === null ||
    data === undefined ||
    (!options.includes("allow-empty-string") && data === "")
  ) {
    return false;
  }

  if (
    options.includes("disallow-whitespace") &&
    typeof data === "string" &&
    data.trim() === ""
  ) {
    return false;
  }

  if (
    options.includes("disallow-empty-array") &&
    Array.isArray(data) &&
    data.length === 0
  ) {
    return false;
  }

  if (
    options.includes("disallow-empty-object") &&
    typeof data === "object" &&
    Object.keys(data).length === 0
  ) {
    return false;
  }

  if (
    options.includes("disallow-nan") &&
    typeof data === "number" &&
    Number.isNaN(data)
  ) {
    return false;
  }

  return true;
};
