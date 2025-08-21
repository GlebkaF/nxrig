"use client";

import { Preset } from "lib/public/interface";
import Link from "next/link";
import { createPresetLink } from "lib/utils/urls";

interface ArtistPresetsProps {
  artist: string;
  presets: Preset[];
}

export function ArtistPresets({
  artist,
  presets,
}: ArtistPresetsProps): React.ReactElement {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-white">{artist}</h1>
      <ul className="space-y-3">
        {presets.map((preset) => (
          <li key={preset.id}>
            <Link
              href={createPresetLink(preset)}
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              {preset.origin.song} – {preset.origin.part}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
