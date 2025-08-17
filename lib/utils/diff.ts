/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// Простая рекурсивная функция для отображения различий между двумя объектами
// Возвращает объект, содержащий только изменённые поля

export type DiffObject = Record<string, unknown>;

export const diffObjects = (a: unknown, b: unknown): DiffObject => {
  if (a === b) {
    return {};
  }

  if (typeof a !== "object" || a === null || typeof b !== "object" || b === null) {
    return { before: a, after: b } as DiffObject;
  }

  const result: DiffObject = {};
  const objA = a as Record<string, unknown>;
  const objB = b as Record<string, unknown>;
  const keys = Array.from(new Set([...Object.keys(objA), ...Object.keys(objB)]));

  for (const key of keys) {
    const diff = diffObjects(objA[key], objB[key]);
    if (Object.keys(diff).length > 0) {
      result[key] = diff;
    }
  }

  return result;
};
