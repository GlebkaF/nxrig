"use client";

import { useFavorites } from "hooks/useFavorites";
import { presets } from "lib/public/presets";
import Header from "components/Header";
import Footer from "components/Footer";
import { PresetCard } from "components/PresetCard";
import { ReactElement } from "react";
import Link from "next/link";

export default function FavoritesPage(): ReactElement {
  const { favorites, isLoaded } = useFavorites();

  // Фильтруем пресеты по избранным ID
  const favoritePresets = presets.filter((preset) =>
    favorites.includes(preset.id),
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-6">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-pink-400"
            >
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
            </svg>
            <h1 className="text-4xl font-bold text-white">Favorite Presets</h1>
          </div>

          <p className="mb-8 text-gray-300 leading-relaxed">
            Here are all your favorite presets for{" "}
            <strong>NUX Mighty Plug Pro</strong> and{" "}
            <strong>Mighty Space</strong>. Add your favorite tones to quickly
            find them later.
          </p>

          {!isLoaded ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-gray-400">Loading favorite presets...</div>
            </div>
          ) : favoritePresets.length === 0 ? (
            <div className="text-center py-12">
              <div className="mb-4">
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mx-auto text-gray-500"
                >
                  <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-2 text-gray-300">
                No favorite presets yet
              </h2>
              <p className="text-gray-400 mb-6">
                Add presets to favorites by clicking the star on preset cards.
              </p>
              <Link
                href="/preset"
                className="inline-flex items-center gap-2 px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition-colors"
              >
                Browse All Presets
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-6 text-sm text-gray-400">
                Found {favoritePresets.length} favorite preset
                {favoritePresets.length !== 1 ? "s" : ""}
              </div>

              <div className="grid gap-6">
                {favoritePresets.map((preset) => (
                  <PresetCard key={preset.id} preset={preset} />
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer>
        <div className="container mx-auto px-4">
          <p className="text-gray-300 text-center">
            Manage your favorite presets for NUX Mighty Plug Pro and Mighty
            Space.
          </p>
        </div>
      </Footer>
    </div>
  );
}
