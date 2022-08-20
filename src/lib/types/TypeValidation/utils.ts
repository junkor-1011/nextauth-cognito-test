/**
 * user define type guard function to check that a variable has
 * @param x - any parameter
 * @returns - does x have property or not.(<= not null or undefined)
 */
export const isNotNullish = (x: unknown): x is Record<string, unknown> => x != null;

type Iterable<T = unknown> = {
  [Symbol.iterator](): Iterator<T>;
};

export const isIterable = (x: unknown): x is Iterable => {
  if (!isNotNullish(x)) return false;
  if (!(Symbol.iterator in Object(x))) return false;
  return true;
};
