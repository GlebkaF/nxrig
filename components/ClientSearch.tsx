"use client";

import { presets } from "lib/public/presets";
import { PresetCard } from "components/PresetCard";
import { useState } from "react";
import Link from "next/link";

export default function ClientSearch(): React.ReactElement {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPresets = presets
    .filter(
      (preset) =>
        preset.origin.song.toLowerCase().includes(searchQuery.toLowerCase()) ||
        preset.origin.artist.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        preset.origin.part.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) => {
      const isCyrillicA = /^[а-яёА-ЯЁ]/.test(a.origin.song);
      const isCyrillicB = /^[а-яёА-ЯЁ]/.test(b.origin.song);

      // Если одна песня на кириллице, а другая нет
      if (isCyrillicA && !isCyrillicB) return 1; // Кириллица идет после
      if (!isCyrillicA && isCyrillicB) return -1; // Латиница идет первой

      // Если обе на одном алфавите, сортируем по алфавиту
      return a.origin.song.localeCompare(b.origin.song);
    });

  return (
    <>
      {/* Search input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search presets..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          className="w-full max-w-md px-4 py-2 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </div>

      {filteredPresets.length > 0 ? (
        <div
          id="presets"
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8"
        >
          {filteredPresets.map((preset) => (
            <PresetCard key={preset.id} preset={preset} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-400 mb-4">No presets found</p>
          <Link href="/order">
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
              Request Patch
            </button>
          </Link>
        </div>
      )}
    </>
  );
}
