import { Preset } from "lib/public/interface";
import { FC } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { encodeChain } from "lib/core/encoder";
import ChainEditor from "./chain/ChainEditor";

interface PresetDetailsProps {
  preset: Preset;
}

export const PresetDetails: FC<PresetDetailsProps> = ({ preset }) => {
  const qrCode = encodeChain(preset.chain);
  return (
    <div className="px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-left">
        {`${preset.origin.artist} – ${preset.origin.song} ${preset.origin.part} Patch for NUX Mighty Plug Pro`}
      </h1>

      <div className="flex gap-8 items-start mb-8">
        <div className="flex-1">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 mb-8 border border-white/10">
            <h2 className="text-2xl font-semibold mb-4 text-left">
              Patch Details
            </h2>
            <ul className="space-y-2">
              <li>
                <strong>Device:</strong> NUX Mighty Plug Pro
              </li>
              <li>
                <strong>Inspired by:</strong> {preset.origin.artist} –{" "}
                {preset.origin.song}
              </li>
              <li>
                <strong>Instrument:</strong> Guitar
              </li>
              <li>
                <strong>Song part:</strong> {preset.origin.part}
              </li>
              <li className="pt-4 text-gray-300">{preset.description}</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-left">
              How to Use
            </h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>Download the patch file or scan QR code.</li>
              <li>Load it into your NUX Mighty Plug Pro using MightyApp.</li>
              <li>
                Play along with {preset.origin.artist} and enjoy the authentic
                tone.
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
                  element.download = `${preset.origin.artist} - ${preset.origin.song} ${preset.origin.part}.png`;
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

        <div className="w-[300px] shrink-0">
          <div className="bg-white p-4 rounded-lg shadow-lg mb-4">
            <QRCodeCanvas value={qrCode.qrCode} size={268} level="M" />
          </div>
          <p className="text-sm text-gray-400 text-center">
            Scan QR code with MightyApp
          </p>
        </div>
      </div>
    </div>
  );
};
