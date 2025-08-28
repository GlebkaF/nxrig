"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { QRCodeCanvas } from "qrcode.react";
import ChainEditor from "./chain/ChainEditor";
import DiffViewer from "./DiffViewer";
import Toggle from "./Toggle";
import { encodeChain } from "../lib/core/encoder";
import { Chain } from "../lib/core/interface";
import type { GenerationRecord } from "../lib/jsondb";
import { diffObjects } from "../lib/utils/diff";

interface GenerationViewerProps {
  generation: GenerationRecord | null;
  error?: string | null | undefined;
}

export function GenerationViewer({
  generation,
  error,
}: GenerationViewerProps): React.ReactElement {
  const [qrCodeData, setQrCodeData] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [isTuning, setIsTuning] = useState<boolean>(false);
  const [tuneError, setTuneError] = useState<string>("");
  const [selectedVersion, setSelectedVersion] = useState<number>(-1);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const router = useRouter();

  const versions = useMemo(() => {
    if (!generation) return [];
    const mappedVersions = generation.versions.map((v) => ({
      chain: v.chain,
      prompt: v.prompt,
    }));
    // Устанавливаем последнюю версию при изменении списка версий
    if (mappedVersions.length > 0 && selectedVersion === -1) {
      setSelectedVersion(mappedVersions.length - 1);
    }
    return mappedVersions;
  }, [generation, selectedVersion]);

  // Функция для подсчета включенных эффектов в цепи
  const getEnabledEffectsCount = (chain: Chain): number => {
    return Object.values(chain).filter(
      (block) =>
        typeof block === "object" &&
        "enabled" in block &&
        (block as { enabled: boolean }).enabled,
    ).length;
  };

  useEffect(() => {
    if (generation && versions[selectedVersion]) {
      try {
        const encoded = encodeChain(versions[selectedVersion].chain);
        setQrCodeData(encoded.qrCode);
      } catch (err) {
        console.error("Error encoding chain:", err);
      }
    }
  }, [generation, versions, selectedVersion]);

  if (error || !generation) {
    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Генерация не найдена
            </h1>
            <p className="text-gray-600 mb-8">
              {error || "Запрошенная генерация не существует"}
            </p>
            <Link
              href="/admin"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              ← Назад к каталогу
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const formatTimestamp = (timestamp: string): string => {
    return new Date(timestamp).toLocaleString("ru-RU", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleCopyLatestChain = async (): Promise<void> => {
    if (!versions.length) return;

    try {
      const latestVersion = versions[versions.length - 1];
      if (!latestVersion?.chain) return;

      const latestChain = JSON.stringify(latestVersion.chain, null, 2);
      await navigator.clipboard.writeText(latestChain);
      setCopySuccess(true);
      setTimeout((): void => {
        setCopySuccess(false);
      }, 2000);
    } catch (err) {
      console.error("Ошибка при копировании:", err);
    }
  };

  const handleFineTune = async (): Promise<void> => {
    if (!feedback.trim()) {
      return;
    }
    setIsTuning(true);
    setTuneError("");
    try {
      const response = await fetch(`/api/generation/fine-tune`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: generation.id,
          feedback,
        }),
      });
      if (!response.ok) {
        throw new Error(await response.text());
      }
      setFeedback("");
      router.refresh();
    } catch (err) {
      setTuneError(err instanceof Error ? err.message : "Ошибка");
    } finally {
      setIsTuning(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link
                href="/admin"
                className="inline-flex items-center px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                ← Назад к каталогу
              </Link>
              <button
                onClick={() => {
                  if (
                    window.confirm(
                      "Вы уверены, что хотите удалить эту генерацию?",
                    )
                  ) {
                    void (async (): Promise<void> => {
                      try {
                        const response = await fetch(`/api/generation/delete`, {
                          method: "DELETE",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ id: generation.id }),
                        });
                        if (!response.ok) {
                          throw new Error(await response.text());
                        }
                        router.push("/");
                      } catch (err) {
                        console.error("Error deleting generation:", err);
                        alert("Ошибка при удалении генерации");
                      }
                    })();
                  }
                }}
                className="inline-flex items-center px-3 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Удалить
              </button>
            </div>
            <h1 className="text-xl font-bold text-gray-900">
              Генерация {generation.id}
            </h1>
            <div className="text-sm text-gray-500">
              {formatTimestamp(generation.timestamp)}
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Chain Editor - основная колонка */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Цепочка эффектов
                </h2>
                <div className="flex items-center gap-2">
                  <select
                    value={selectedVersion}
                    onChange={(e) => {
                      setSelectedVersion(Number(e.target.value));
                    }}
                    className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {versions.map((_, index: number) => (
                      <option key={index} value={index}>
                        Версия {index + 1}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => void handleCopyLatestChain()}
                    className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                      copySuccess
                        ? "bg-green-500 text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    }`}
                    title="Скопировать последнюю версию chain"
                  >
                    {copySuccess ? "Скопировано!" : "Скопировать последнюю"}
                  </button>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Версия {selectedVersion + 1}
                </h3>
                {versions[selectedVersion] && (
                  <ChainEditor
                    chain={versions[selectedVersion].chain}
                    onChange={() => {}}
                    readonly={true}
                  />
                )}
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Тонкая настройка
              </h2>
              <textarea
                value={feedback}
                onChange={(e) => {
                  setFeedback(e.target.value);
                }}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                rows={3}
                placeholder="Например: слишком глухой"
                disabled={isTuning}
              />
              {tuneError && (
                <p className="text-sm text-red-600 mt-2">{tuneError}</p>
              )}
              <button
                onClick={() => {
                  void handleFineTune();
                }}
                disabled={isTuning || !feedback.trim()}
                className={`mt-4 px-4 py-2 rounded-lg font-medium transition-all ${
                  isTuning || !feedback.trim()
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-purple-600 text-white hover:bg-purple-700"
                }`}
              >
                {isTuning ? "Обновление..." : "Отправить"}
              </button>
            </div>
          </div>

          {/* Sidebar с информацией */}
          <div className="space-y-6">
            {/* QR Code */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  QR-код для загрузки
                </h3>
                <Toggle
                  label="Готов"
                  value={generation.status === "ready"}
                  onChange={(newValue) => {
                    void (async (): Promise<void> => {
                      try {
                        console.log("update-status");
                        const response = await fetch(
                          `/api/generation/update-status`,
                          {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                              id: generation.id,
                              status: newValue ? "ready" : "draft",
                            }),
                          },
                        );
                        if (!response.ok) {
                          throw new Error(await response.text());
                        }
                        router.refresh();
                      } catch (err) {
                        console.error("Error updating status:", err);
                        // TODO: Add error handling UI
                      }
                    })();
                  }}
                  color="#22c55e"
                />
              </div>
              {qrCodeData ? (
                <div className="flex justify-center">
                  <QRCodeCanvas
                    value={qrCodeData}
                    size={200}
                    level="M"
                    className="border rounded"
                  />
                </div>
              ) : (
                <div className="flex justify-center items-center h-[200px] bg-gray-50 rounded">
                  <span className="text-gray-500">Загрузка QR-кода...</span>
                </div>
              )}
            </div>

            {/* Original Prompt */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Исходный запрос
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                &ldquo;{generation.originalPrompt}&rdquo;
              </p>
            </div>

            {/* Genre & Description */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Описание звука
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium text-gray-900">Жанр:</span>
                  <span className="ml-2 text-gray-700">
                    {generation.proDescription.genre}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-900">Звук:</span>
                  <p className="mt-1 text-gray-700 leading-relaxed">
                    {generation.proDescription.sound_description}
                  </p>
                </div>
                {generation.proDescription.guitar_rig_description && (
                  <div>
                    <span className="font-medium text-gray-900">Риг:</span>
                    <p className="mt-1 text-gray-700 leading-relaxed">
                      {generation.proDescription.guitar_rig_description}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* References */}
            {generation.proDescription.references.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Референсы
                </h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  {generation.proDescription.references.map((ref, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-gray-400 mr-2">•</span>
                      <span>{ref}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Real Rig Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Аналоговый риг
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-medium text-gray-900">Усилитель:</span>
                  <span className="ml-2 text-gray-700">
                    {generation.realRig.amplifier}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-900">Кабинет:</span>
                  <span className="ml-2 text-gray-700">
                    {generation.realRig.cabinet}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-900">
                    Включенных эффектов:
                  </span>
                  <span className="ml-2 text-gray-700">
                    {((): number => {
                      const getEffectsCount = (): number => {
                        const latestVersion =
                          generation.versions[generation.versions.length - 1];
                        return latestVersion
                          ? getEnabledEffectsCount(latestVersion.chain)
                          : 0;
                      };
                      return getEffectsCount();
                    })()}
                  </span>
                </div>
                {generation.realRig.pedalboard.length > 0 && (
                  <div>
                    <span className="font-medium text-gray-900">Педали:</span>
                    <ul className="mt-1 space-y-1">
                      {generation.realRig.pedalboard.map((pedal, index) => (
                        <li key={index} className="flex items-start ml-2">
                          <span className="text-gray-400 mr-2">•</span>
                          <span className="text-gray-700">{pedal}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            {versions.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Версии
                </h3>
                {versions.map((v, index) => {
                  const prev = index > 0 ? versions[index - 1]?.chain : null;
                  const diff = prev ? diffObjects(prev, v.chain) : null;
                  return (
                    <div key={index} className="mb-4">
                      <p className="font-medium text-gray-900">
                        Версия {index + 1}
                      </p>
                      <p className="text-sm text-gray-600">
                        Запрос: {v.prompt}
                      </p>
                      {diff && (
                        <div className="mt-2">
                          <DiffViewer diff={diff} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
