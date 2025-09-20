"use client";

import { useFavorites } from "hooks/useFavorites";
import { ReactElement } from "react";

interface FavoriteButtonProps {
  presetId: string;
  variant?: "default" | "compact";
  className?: string;
}

export function FavoriteButton({
  presetId,
  variant = "default",
  className = "",
}: FavoriteButtonProps): ReactElement {
  const { isFavorite, toggleFavorite, isLoaded } = useFavorites();

  const isInFavorites = isFavorite(presetId);

  // Не показываем кнопку пока не загрузились данные из localStorage
  if (!isLoaded) {
    return (
      <div
        className={`${variant === "compact" ? "w-8 h-8" : "w-10 h-10"} ${className}`}
      />
    );
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Предотвращаем навигацию если кнопка внутри Link
    e.stopPropagation();
    toggleFavorite(presetId);
  };

  if (variant === "compact") {
    return (
      <button
        onClick={handleClick}
        className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110 ${
          isInFavorites
            ? "text-pink-400 hover:text-pink-300"
            : "text-gray-400 hover:text-pink-400"
        } ${className}`}
        title={isInFavorites ? "Remove from favorites" : "Add to favorites"}
        aria-label={
          isInFavorites ? "Remove from favorites" : "Add to favorites"
        }
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill={isInFavorites ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 border ${
        isInFavorites
          ? "bg-pink-500/20 border-pink-500/50 text-pink-300 hover:bg-pink-500/30"
          : "bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-600/50 hover:border-pink-500/50 hover:text-pink-400"
      } ${className}`}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill={isInFavorites ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
      </svg>
      {isInFavorites ? "In Favorites" : "Add to Favorites"}
    </button>
  );
}
