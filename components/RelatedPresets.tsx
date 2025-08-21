"use client";

import { Preset } from "lib/public/interface";
import Link from "next/link";
import { createPresetLink } from "lib/utils/urls";

interface RelatedPresetsProps {
  title: string;
  presets: Preset[];
  currentPresetId?: string;
}

export function RelatedPresets({
  title,
  presets,
  currentPresetId,
}: RelatedPresetsProps): React.ReactElement | null {
  const filteredPresets = currentPresetId
    ? presets.filter((preset) => preset.id !== currentPresetId)
    : presets;

  if (filteredPresets.length === 0) {
    return null;
  }

  return (
    <div className="">
      <h2 className="text-xl font-semibold mb-4 text-white">{title}</h2>
      <ul className="space-y-2">
        {filteredPresets.map((preset) => (
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
