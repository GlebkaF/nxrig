import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Chain } from "../lib/core/interface";
import Header from "../components/Header";
import ChainEditor from "../components/chain/ChainEditor";

export default function GeneratorPage(): React.ReactElement {
  const [prompt, setPrompt] = useState<string>(
    "Metallice Enter Sandman Main Riff"
  );
  const [chain, setChain] = useState<Chain | null>(null);
  const [qrCode, setQrCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleGenerate = async (): Promise<void> => {
    if (!prompt.trim()) {
      setError("Пожалуйста, введите описание желаемого звука");
      return;
    }

    setIsLoading(true);
    setError("");
    setChain(null);
    setQrCode("");

    try {
      const response = await fetch("/api/generate-chain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.statusText}`);
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const data = await response.json();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      setChain(data.chain);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      setQrCode(data.qrCode);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Произошла ошибка");
    } finally {
      setIsLoading(false);
    }
  };

  const downloadQRCode = (): void => {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "generated-chain-qr.png";
      link.href = url;
      link.click();
    }
  };

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ): void => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void handleGenerate();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      <Header />
      <div className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              🎸 AI Chain Generator
            </h1>
            <p className="text-lg text-gray-600">
              Опишите желаемый звук, и AI создаст для вас идеальный чейн
              эффектов
            </p>
          </div>

          {/* Input Section */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="bg-gray-50 px-6 py-4 border-b">
              <h2 className="text-xl font-semibold text-gray-900">
                ✨ Опишите желаемый звук
              </h2>
            </div>
            <div className="p-6">
              <textarea
                value={prompt}
                onChange={(e) => {
                  setPrompt(e.target.value);
                }}
                onKeyUp={handleKeyPress}
                placeholder="Например: Тяжелый металлический звук с дисторшном и ревербом для соло..."
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                rows={4}
                disabled={isLoading}
              />
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Нажмите Enter для генерации или используйте кнопку
                </p>
                <button
                  onClick={() => {
                    void handleGenerate();
                  }}
                  disabled={isLoading || !prompt.trim()}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    isLoading || !prompt.trim()
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-purple-600 text-white hover:bg-purple-700 shadow-lg hover:shadow-xl"
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Генерирую...
                    </span>
                  ) : (
                    "🎯 Сгенерировать Chain"
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Results Section */}
          {chain && qrCode && (
            <div className="space-y-6 animate-fadeIn">
              {/* QR Code */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">
                    📱 Сгенерированный QR код
                  </h2>

                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                    ✨ AI Generated
                  </span>
                </div>
                <div className="p-6 text-center">
                  <div className="inline-block p-4 bg-white border-2 border-gray-200 rounded-lg mb-4">
                    <QRCodeCanvas
                      value={qrCode}
                      size={250}
                      level="H"
                      includeMargin={true}
                    />
                  </div>
                  <div className="space-y-3">
                    <button
                      onClick={downloadQRCode}
                      className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      💾 Скачать QR код
                    </button>
                    <div className="text-xs text-gray-500 break-all font-mono bg-gray-50 p-3 rounded">
                      {qrCode}
                    </div>
                  </div>
                </div>
              </div>

              {/* Chain Editor */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b">
                  <h2 className="text-xl font-semibold text-gray-900">
                    🎛️ Редактор чейна
                  </h2>
                </div>
                <div className="p-6">
                  <ChainEditor
                    chain={chain}
                    onChange={setChain}
                    readonly={true}
                  />
                </div>
              </div>

              {/* JSON View */}
              <details className="bg-white rounded-lg shadow-md overflow-hidden">
                <summary className="bg-gray-50 px-6 py-4 border-b cursor-pointer hover:bg-gray-100">
                  <span className="text-xl font-semibold text-gray-900">
                    📋 JSON представление
                  </span>
                </summary>
                <div className="p-6">
                  <pre className="text-xs bg-gray-50 p-4 rounded-lg overflow-auto max-h-96 border">
                    {JSON.stringify(chain, null, 2)}
                  </pre>
                </div>
              </details>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
