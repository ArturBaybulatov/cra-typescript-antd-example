/**
 * Find out whether a value is a number, or a string, that can be safely
 * converted to a number. Non-real numeric values, such as `NaN`, `Infinity`,
 * etc. are considered not to be numbers.
 * */
export const isNumeric = (val: unknown): val is number | string => {
  if (Number.isFinite(val)) return true;
  if (typeof val !== 'string') return false;
  if (val.trim() === '') return false;
  return Number.isFinite(Number(val));
};
