export const createSlug = (text: string): string => {
  return encodeURIComponent(
    text
      .toLowerCase()
      .replace(/['']/g, "") // Удаляем апострофы
      .replace(/[^a-z0-9]+/g, "-") // Заменяем все не-буквы/цифры на дефис
      .replace(/^-+|-+$/g, "") // Убираем дефисы в начале и конце
  );
};
