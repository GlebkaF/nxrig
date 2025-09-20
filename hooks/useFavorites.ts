"use client";

import { useState, useEffect, useCallback } from "react";

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Загружаем избранные из localStorage при монтировании
  useEffect(() => {
    try {
      const stored = localStorage.getItem("favorites");
      if (stored) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Ошибка загрузки избранных:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Сохраняем избранные в localStorage при изменении
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("favorites", JSON.stringify(favorites));
      } catch (error) {
        console.error("Ошибка сохранения избранных:", error);
      }
    }
  }, [favorites, isLoaded]);

  const addToFavorites = useCallback((presetId: string) => {
    setFavorites((prev) => {
      if (!prev.includes(presetId)) {
        return [...prev, presetId];
      }
      return prev;
    });
  }, []);

  const removeFromFavorites = useCallback((presetId: string) => {
    setFavorites((prev) => prev.filter((id) => id !== presetId));
  }, []);

  const toggleFavorite = useCallback((presetId: string) => {
    setFavorites((prev) => {
      if (prev.includes(presetId)) {
        return prev.filter((id) => id !== presetId);
      } else {
        return [...prev, presetId];
      }
    });
  }, []);

  const isFavorite = useCallback(
    (presetId: string) => {
      return favorites.includes(presetId);
    },
    [favorites],
  );

  return {
    favorites,
    isLoaded,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
  };
}
