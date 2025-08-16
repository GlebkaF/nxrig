export function parseEnum<T extends Record<string, string>>(
  e: T,
  input: string
): T[keyof T] {
  function isEnumKey<T extends Record<string, string>>(
    e: T,
    k: string
    // @ts-expect-error - TODO: fix this
  ): k is keyof T {
    return k in e;
  }

  function isEnumValue<T extends Record<string, string>>(
    e: T,
    v: string
  ): v is T[keyof T] {
    // Работает и для string-enum'ов, и для "as const" объектов
    return Object.values(e).includes(v as T[keyof T]);
  }

  // @ts-expect-error - TODO: fix this
  if (isEnumKey(e, input)) return e[input]; // по ключу
  if (isEnumValue(e, input)) return input as T[keyof T]; // по значению

  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  throw new Error(`Invalid enum value: ${input}`);
}
