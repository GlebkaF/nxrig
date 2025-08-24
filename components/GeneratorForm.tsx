"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export function GeneratorForm(): React.ReactElement {
  const router = useRouter();
  const [prompt, setPrompt] = useState<string>(
    "Metallice Enter Sandman Rhythm Guitar Main Riff"
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleGenerate = async (): Promise<void> => {
    if (!prompt.trim()) {
      setError("Пожалуйста, введите описание желаемого звука");
      return;
    }

    setIsLoading(true);
    setError("");

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

      const data = (await response.json()) as {
        generationId: string;
        message: string;
      };

      // Перенаправляем на страницу с результатом генерации
      router.push(`/admin/generation/${data.generationId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Произошла ошибка");
      setIsLoading(false);
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
    <>
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

      {/* Loading state info */}
      {isLoading && (
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                Генерация может занять до 30 секунд. После завершения вы будете
                перенаправлены на страницу с результатом.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
