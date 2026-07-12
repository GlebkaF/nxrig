import Image from "next/image";
import Link from "next/link";
import { PresetCardData } from "lib/public/preset-card";
import { CompatibleDevices } from "./DeviceBadge";
import { FavoriteButton } from "./FavoriteButton";

interface PresetCardProps {
  preset: PresetCardData;
}

export function PresetCard({ preset }: PresetCardProps): React.ReactElement {
  const presetName = `${preset.artist} - ${preset.song} ${preset.part}`;

  return (
    <article className="relative overflow-hidden rounded-xl border border-white/10 bg-gray-800/50 backdrop-blur-sm transition-all duration-300 hover:border-pink-500/40 hover:bg-gray-800/70">
      <div className="absolute inset-0">
        <Image
          src={preset.imageUrl}
          alt=""
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover opacity-20"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/50" />
      </div>

      <Link
        href={preset.href}
        className="relative block min-h-40 p-6 pr-16 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-pink-500"
      >
        <h3 className="text-xl font-semibold text-gray-100">
          {preset.song} – {preset.part}
        </h3>
        <p className="mt-1 text-sm text-gray-300">{preset.artist}</p>
        <CompatibleDevices className="mt-5" />
        <span className="mt-5 inline-block text-sm font-medium text-pink-400">
          View patch settings →
        </span>
      </Link>

      <FavoriteButton
        presetId={preset.id}
        presetName={presetName}
        variant="compact"
        className="absolute right-4 top-4 z-10 bg-black/40"
      />
    </article>
  );
}
