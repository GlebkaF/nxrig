"use client";

import { Preset } from "lib/public/interface";
import { FC } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { encodeChain } from "lib/core/encoder";
import ChainEditor from "./chain/ChainEditor";
import { CompatibleDevices } from "./DeviceBadge";
import Link from "next/link";
import { createArtistLink } from "lib/utils/urls";

interface PresetDetailsProps {
  preset: Preset;
}

export const PresetDetails: FC<PresetDetailsProps> = ({ preset }) => {
  const qrCode = encodeChain(preset.chain);
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-left">
        <Link
          href={createArtistLink(preset)}
          className="text-pink-400 hover:text-pink-300 transition-colors"
        >
          {preset.origin.artist.title}
        </Link>{" "}
        – {preset.origin.song} {preset.origin.part} Patch for NUX Mighty Devices
      </h1>

      <div className="mb-6">
        <CompatibleDevices />
      </div>

      <div className="flex gap-8 items-start mb-8">
        <div className="flex-1">
          <div className="flex gap-8 md:items-start flex-col-reverse items-center md:flex-row">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 mb-8 border border-white/10">
              <h2 className="text-2xl font-semibold mb-4 text-left">
                Preset Details
              </h2>
              <ul className="space-y-3">
                <li>
                  <strong>Inspired by:</strong> {preset.origin.artist.title} –{" "}
                  {preset.origin.song}
                </li>
                <li>
                  <strong>Song part:</strong> {preset.origin.part}
                </li>
                <li>
                  <strong>Recommended pickup:</strong>{" "}
                  {preset.pickup.type.charAt(0).toUpperCase() +
                    preset.pickup.type.slice(1)}{" "}
                  {preset.pickup.position.charAt(0).toUpperCase() +
                    preset.pickup.position.slice(1)}
                  , tone {preset.pickup.tone}
                </li>
                <li className="pt-4 text-gray-300">{preset.description}</li>
              </ul>
            </div>
            <div className="w-[300px] shrink-0">
              <div className="bg-white p-4 rounded-lg shadow-lg mb-4">
                <QRCodeCanvas value={qrCode.qrCode} size={268} level="M" />
              </div>
              <p className="text-sm text-gray-400 text-center">
                Scan QR code with MightyApp
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-left">
              How to Use
            </h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>Download the patch file or scan QR code.</li>
              <li>
                Load it into your NUX Mighty Plug Pro or NUX Mighty Space using
                MightyApp.
              </li>
              <li>
                Play along with {preset.origin.artist.title} and enjoy the
                authentic tone.
              </li>
            </ol>
          </div>

          <div className="mt-8">
            <button
              onClick={() => {
                const canvas = document.querySelector("canvas");
                if (!canvas) return;

                canvas.toBlob((blob) => {
                  if (!blob) return;

                  const element = document.createElement("a");
                  element.href = URL.createObjectURL(blob);
                  element.download = `${preset.origin.artist.title} - ${preset.origin.song} ${preset.origin.part}.png`;
                  document.body.appendChild(element);
                  element.click();
                  document.body.removeChild(element);
                }, "image/png");
              }}
              className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Download «{preset.origin.song} {preset.origin.part}» patch file
            </button>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-left">
              Chain Configuration
            </h2>
            <ChainEditor
              chain={preset.chain}
              onChange={() => {}}
              readonly={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
