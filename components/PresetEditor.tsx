"use client";

import { FC, useState, useEffect, useRef } from "react";
import { Preset } from "lib/public/interface";
import { Chain } from "lib/core/interface";
import { encodeChain } from "lib/core/encoder";
import { decodeChain } from "lib/core/decoder";
import ChainEditor from "./chain/ChainEditor";
import { QRCodeCanvas } from "qrcode.react";
import { trackEvent } from "lib/analytics";
import jsQR from "jsqr";

interface PresetEditorProps {
  preset: Preset;
}

export const PresetEditor: FC<PresetEditorProps> = ({ preset }) => {
  // State для хранения текущей версии chain
  const [chain, setChain] = useState<Chain>(preset.chain);
  const [qrCode, setQrCode] = useState<string>("");
  const [importError, setImportError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Обновляем QR-код при изменении chain
  useEffect(() => {
    const encoded = encodeChain(chain);
    setQrCode(encoded.qrCode);
  }, [chain]);

  // Функция для скачивания QR-кода
  const handleDownloadQR = () => {
    const canvas = document.querySelector("#preset-qr-canvas");
    if (!canvas || !(canvas instanceof HTMLCanvasElement)) return;

    // Трекинг события скачивания
    trackEvent({
      action: "download_qr_editor",
      category: "editor",
      label: "custom_preset",
      value: 1,
    });

    canvas.toBlob((blob) => {
      if (!blob) return;

      const element = document.createElement("a");
      element.href = URL.createObjectURL(blob);
      element.download = `nxrig-custom-preset.png`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, "image/png");
  };

  // Функция для импорта QR-кода
  const handleImportQR = () => {
    setImportError("");
    fileInputRef.current?.click();
  };

  // Обработка выбранного файла
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Проверяем, что это изображение
    if (!file.type.startsWith("image/")) {
      setImportError("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        try {
          // Создаём canvas для обработки изображения
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            setImportError("Failed to process image");
            return;
          }

          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);

          // Получаем данные изображения
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

          // Декодируем QR-код
          const code = jsQR(imageData.data, imageData.width, imageData.height);

          if (!code) {
            setImportError("No QR code found in the image");
            return;
          }

          // Декодируем chain из QR-кода
          const decodedChain = decodeChain(code.data);
          setChain(decodedChain);
          setImportError("");

          // Трекинг события импорта
          trackEvent({
            action: "import_qr_editor",
            category: "editor",
            label: "qr_imported",
            value: 1,
          });
        } catch (error) {
          console.error("Error decoding QR code:", error);
          setImportError(
            error instanceof Error
              ? error.message
              : "Failed to decode QR code. Make sure it's a valid NUX preset QR code.",
          );
        }
      };

      img.onerror = () => {
        setImportError("Failed to load image");
      };

      img.src = e.target?.result as string;
    };

    reader.onerror = () => {
      setImportError("Failed to read file");
    };

    reader.readAsDataURL(file);

    // Сбрасываем input, чтобы можно было загрузить тот же файл снова
    event.target.value = "";
  };

  return (
    <div>
      {/* Заголовок */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Online Patch Editor</h1>
        <p className="text-gray-400 text-lg">
          Create custom guitar tones for NUX Mighty Plug Pro and Mighty Space
          right in your browser. Adjust effects, tweak parameters, and download
          QR codes - no mobile app required.
        </p>
      </div>

      {/* Основной контент: Редактор и QR-код */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Левая часть: Редактор */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-4">Chain Configuration</h2>
          <ChainEditor chain={chain} onChange={setChain} readonly={false} />
        </div>

        {/* Правая часть: QR-код */}
        <div className="lg:w-[350px] shrink-0">
          <div className="sticky top-8">
            <h2 className="text-2xl font-semibold mb-4">QR Code</h2>
            <div className="bg-white p-4 rounded-lg shadow-lg mb-4">
              <QRCodeCanvas
                id="preset-qr-canvas"
                value={qrCode}
                size={318}
                level="M"
              />
            </div>

            <div className="space-y-3">
              <button
                onClick={handleImportQR}
                className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 px-4 rounded transition-colors flex items-center justify-center gap-2"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Import QR Code
              </button>

              <button
                onClick={handleDownloadQR}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-4 rounded transition-colors flex items-center justify-center gap-2"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                Download QR Code
              </button>
            </div>

            {/* Скрытый input для загрузки файла */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            {/* Сообщение об ошибке */}
            {importError && (
              <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded text-red-400 text-sm">
                {importError}
              </div>
            )}

            <p className="text-sm text-gray-400 text-center mt-4">
              Scan this QR code with MightyApp to load your custom preset
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
