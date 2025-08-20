import { QRCodeCanvas } from "qrcode.react";
import Image from "next/image";
import Link from "next/link";
import { Preset } from "lib/public/interface";
import { encodeChain } from "lib/core/encoder";
import { createPresetLink } from "lib/utils/urls";

interface PresetCardProps {
  preset: Preset;
}

export function PresetCard({ preset }: PresetCardProps): React.ReactElement {
  const qrCode = encodeChain(preset.chain);

  // Определяем фоновое изображение
  const bgImage = preset.origin.imageUrl ?? "/images/cover/default-cover.png";
  return (
    <Link
      href={createPresetLink(preset)}
      className="block bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02] relative border border-white/10"
    >
      <div className="absolute inset-0">
        <Image
          src={bgImage}
          alt="Background"
          fill
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
      </div>

      <div className="relative p-6">
        {/* QR Code */}
        <div className="flex justify-center mb-6">
          <div className="bg-white p-2 rounded">
            <QRCodeCanvas value={qrCode.qrCode} size={180} level="M" />
          </div>
        </div>

        <div className="text-center">
          <div className="text-gray-300">
            <div className="text-lg font-medium">{preset.origin.song}</div>
            <div className="text-sm text-gray-400">{preset.origin.artist}</div>
            {preset.origin.part && (
              <div className="text-xs text-gray-500 mt-1">
                {preset.origin.part}
              </div>
            )}
          </div>

          {/* Device and Instrument Type */}
          <div className="mt-4 flex items-center justify-center gap-2 text-xs">
            <span className="bg-pink-500/20 text-pink-400 px-2 py-1 rounded">
              Guitar
            </span>
            <span className="bg-violet-500/20 text-violet-400 px-2 py-1 rounded">
              NUX Mighty Plug Pro
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
