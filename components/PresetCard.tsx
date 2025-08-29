"use client";

import { QRCodeCanvas } from "qrcode.react";
import Image from "next/image";
import Link from "next/link";
import { Preset } from "lib/public/interface";
import { encodeChain } from "lib/core/encoder";
import { createPresetLink } from "lib/utils/urls";
import { CompatibleDevices } from "./DeviceBadge";

interface PresetCardProps {
  preset: Preset;
}

export function PresetCard({ preset }: PresetCardProps): React.ReactElement {
  const qrCode = encodeChain(preset.chain);

  // Определяем фоновое изображение
  const bgImage = preset.origin.imageUrl ?? "/images/cover/default-cover.webp";
  return (
    <Link
      href={createPresetLink(preset)}
      className="block bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02] relative border border-white/10"
    >
      <div className="absolute inset-0">
        <Image
          src={bgImage}
          alt={`${preset.origin.artist.title} - ${preset.origin.song} cover`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={true}
          className="object-cover opacity-30"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
      </div>

      <div className="relative p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* QR Code */}
          <div className="shrink-0">
            <div className="bg-white p-2 rounded">
              <QRCodeCanvas value={qrCode.qrCode} size={180} level="M" />
            </div>
          </div>

          <div className="text-center md:text-left flex-grow">
            <div className="text-gray-300">
              <div className="text-lg font-medium">
                {preset.origin.song}&nbsp;—&nbsp;{preset.origin.part}
              </div>
              <div className="text-sm text-gray-400">
                {preset.origin.artist.title}
              </div>
            </div>

            {/* Device and Instrument Type */}
            <div className="mt-4 flex items-center justify-center md:justify-start gap-2 text-xs">
              <CompatibleDevices />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
