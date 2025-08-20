"use client";

import React, { useState, useEffect, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import jsQR from "jsqr";
import { encodeChain } from "../lib/core/encoder";
import { decodeChain } from "../lib/core/decoder";
import { createDefaultChain } from "../lib/core/helpers/create-chain";
import { Chain } from "../lib/core/interface";
import ChainEditor from "./chain/ChainEditor";

export function EncoderTester(): React.ReactElement {
  const [chain, setChain] = useState<Chain>(createDefaultChain());
  const [qrCode, setQrCode] = useState<string>("");
  const [bytes, setBytes] = useState<number[]>([]);
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Функции для работы с QR-кодом из изображения
  const scanQrFromImage = (imageBitmap: ImageBitmap): string => {
    const canvas = document.createElement("canvas");
    canvas.width = imageBitmap.width;
    canvas.height = imageBitmap.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Failed to get canvas context");

    ctx.drawImage(imageBitmap, 0, 0);
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imgData.data, imgData.width, imgData.height);
    return code?.data || "";
  };

  const readImageBitmap = (file: File): Promise<ImageBitmap> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => {
        reject(new Error("Failed to read file"));
      };
      reader.onload = () => {
        createImageBitmap(new Blob([reader.result as ArrayBuffer]))
          .then(resolve)
          .catch(() => {
            const img = new Image();
            img.onload = () => {
              resolve(createImageBitmap(img));
            };
            img.onerror = () => {
              reject(new Error("Invalid image"));
            };
            img.src = reader.result as string;
          });
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>): void => {
    void (async () => {
      try {
        setError("");
        const file = e.target.files?.[0];
        if (!file) return;

        const bmp = await readImageBitmap(file);
        const qrText = scanQrFromImage(bmp);
        if (!qrText) throw new Error("QR код не найден на изображении");

        const decodedChain = decodeChain(qrText);
        setChain(decodedChain);
        e.target.value = "";
      } catch (ex) {
        setError(ex instanceof Error ? ex.message : String(ex));
      }
    })();
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const downloadQRCode = (): void => {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "chain-qr-code.png";
      link.href = url;
      link.click();
    }
  };

  // Обновляем QR код при изменении чейна
  useEffect(() => {
    try {
      const encoded = encodeChain(chain);
      setQrCode(encoded.qrCode);
      setBytes([...encoded.rawBytes]);
    } catch (error) {
      console.error("Ошибка при энкодинге:", error);
    }
  }, [chain]);

  const resetToDefault = () => {
    setChain(createDefaultChain());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🎸 Interactive Chain Editor
          </h1>
          <p className="text-lg text-gray-600">
            Редактируйте чейн эффектов и получайте NUX совместимый QR код в
            реальном времени
          </p>
        </div>

        {/* Info Card */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8 rounded-r-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-blue-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                <strong>Описание:</strong> Интерактивный редактор принимает чейн
                эффектов, мапит его на конфигурацию из{" "}
                <code className="bg-blue-100 px-2 py-1 rounded">config.ts</code>{" "}
                и генерирует <strong>NUX совместимый QR код</strong> с префиксом{" "}
                <code className="bg-green-100 px-2 py-1 rounded text-green-800">
                  nux://MightyAmp:
                </code>
                . QR код обновляется автоматически при изменении параметров.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Chain Editor */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  🔧 Редактор чейна
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={handleImportClick}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    📷 Импорт из QR
                  </button>
                  <button
                    onClick={resetToDefault}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Сбросить
                  </button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileSelect}
                />
              </div>
              {error && (
                <div className="m-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                  {error}
                </div>
              )}
              <div className="p-6">
                <ChainEditor chain={chain} onChange={setChain} />
              </div>
            </div>
          </div>

          {/* QR Code and Data */}
          <div className="space-y-6">
            {/* QR Code */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b">
                <h2 className="text-xl font-semibold text-gray-900">
                  📱 NUX QR код
                </h2>
              </div>
              <div className="p-6 text-center">
                <div className="inline-block p-4 bg-white border-2 border-gray-200 rounded-lg mb-4">
                  <QRCodeCanvas
                    value={qrCode}
                    size={200}
                    includeMargin={true}
                  />
                </div>
                <div className="space-y-2">
                  <button
                    onClick={downloadQRCode}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    💾 Скачать PNG
                  </button>
                  <div className="text-xs text-gray-500 break-all font-mono bg-gray-50 p-3 rounded">
                    {qrCode}
                  </div>
                </div>
              </div>
            </div>

            {/* Chain JSON */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b">
                <h2 className="text-xl font-semibold text-gray-900">
                  📋 JSON чейна
                </h2>
              </div>
              <div className="p-6">
                <pre className="text-xs bg-gray-50 p-4 rounded-lg overflow-auto max-h-64 border">
                  {JSON.stringify(chain, null, 2)}
                </pre>
              </div>
            </div>

            {/* Byte Array Visualization */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b">
                <h2 className="text-xl font-semibold text-gray-900">
                  🔢 Байтовый массив ({bytes.filter((b) => b !== 0).length}{" "}
                  ненулевых из {bytes.length})
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-10 gap-1 text-xs font-mono">
                  {bytes.map((byte, index) => {
                    const isNonZero = byte !== 0;
                    const isHeader = index >= 2 && index <= 11; // Примерно заголовки блоков

                    return (
                      <div
                        key={index}
                        className={`
                          p-1 text-center rounded border text-xs
                          ${
                            isNonZero
                              ? isHeader
                                ? "bg-yellow-100 border-yellow-400 font-bold text-yellow-800"
                                : "bg-green-100 border-green-400 font-bold text-green-800"
                              : "bg-gray-50 border-gray-200 text-gray-500"
                          }
                        `}
                        title={`Index ${index.toString()}: ${byte.toString()}`}
                      >
                        {index}:{byte}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b">
                <h2 className="text-xl font-semibold text-gray-900">
                  📊 Статистика
                </h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Активных блоков:</span>
                    <span className="font-bold ml-2">
                      {
                        Object.values(chain).filter((block) => block.enabled)
                          .length
                      }
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Всего блоков:</span>
                    <span className="font-bold ml-2">
                      {Object.keys(chain).length}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Размер QR:</span>
                    <span className="font-bold ml-2">
                      {qrCode.length} символов
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Ненулевых байт:</span>
                    <span className="font-bold ml-2">
                      {bytes.filter((b) => b !== 0).length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Large QR Code for Scanning */}
        <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              📱 Большой QR код для сканирования
            </h2>
          </div>
          <div className="p-8 text-center">
            <div className="inline-block p-6 bg-white border-2 border-gray-200 rounded-xl shadow-lg">
              <QRCodeCanvas
                value={qrCode}
                size={300}
                level="H"
                includeMargin={true}
              />
            </div>
            <div className="mt-4">
              <button
                onClick={downloadQRCode}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                💾 Скачать большой QR код
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
