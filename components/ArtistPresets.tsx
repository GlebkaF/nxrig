import { Preset } from "lib/public/interface";
import Link from "next/link";
import { createPresetLink } from "lib/utils/urls";

interface ArtistPresetsProps {
  artist: string;
  presets: Preset[];
  description?: string;
}

export function ArtistPresets({
  artist,
  presets,
  description,
}: ArtistPresetsProps): React.ReactElement {
  return (
    <div className="container mx-auto px-4 py-8">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-400">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="hover:text-pink-400">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/preset/" className="hover:text-pink-400">
              Presets
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-gray-200">
            {artist}
          </li>
        </ol>
      </nav>

      <h1 className="text-4xl font-bold mb-6 text-white">{artist}</h1>
      {description && (
        <p className="text-lg text-gray-300 mb-8 leading-relaxed">
          {description}
        </p>
      )}
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
