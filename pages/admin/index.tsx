import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { QRCodeCanvas } from "qrcode.react";
import Header from "../../components/Header";
import type { GenerationRecord, GenerationStats } from "../../lib/jsondb";
import type { Chain } from "../../lib/core/interface";
import { encodeChain } from "../../lib/core/encoder";

export default function HomePage(): React.ReactElement {
  const [generations, setGenerations] = useState<GenerationRecord[]>([]);
  const [stats, setStats] = useState<GenerationStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        setLoading(true);

        // Загружаем последние 20 генераций и статистику параллельно
        const [generationsRes, statsRes] = await Promise.all([
          fetch("/api/generations?limit=20"),
          fetch("/api/stats"),
        ]);

        if (!generationsRes.ok || !statsRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const [generationsData, statsData] = await Promise.all([
          generationsRes.json() as Promise<GenerationRecord[]>,
          statsRes.json() as Promise<GenerationStats>,
        ]);

        setGenerations(generationsData);
        setStats(statsData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Ошибка загрузки данных");
      } finally {
        setLoading(false);
      }
    };

    void fetchData();
  }, []);

  const formatTimestamp = (timestamp: string): string => {
    return new Date(timestamp).toLocaleString("ru-RU", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  // Функция для подсчета включенных эффектов в цепи
  const getEnabledEffectsCount = (chain: Chain): number => {
    return Object.values(chain).filter(
      (block) =>
        typeof block === "object" &&
        "enabled" in block &&
        (block as { enabled: boolean }).enabled
    ).length;
  };

  // Функция для генерации QR-кода
  const generateQRCode = (chain: Chain): string => {
    try {
      const encoded = encodeChain(chain);
      return encoded.qrCode;
    } catch (error) {
      console.error("Error encoding chain:", error);
      return "";
    }
  };

  return (
    <>
      <Head>
        <title>Guitar Chain Generator | Каталог генераций</title>
        <meta
          name="description"
          content="Каталог всех сгенерированных гитарных цепочек эффектов"
        />
      </Head>

      <div className="min-h-screen bg-gray-900 text-gray-100">
        <Header />

        <div className="container mx-auto px-4 pb-8">
          {/* Статистика */}
          {stats && (
            <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gray-800 rounded-lg p-6 text-center">
                <h3 className="text-2xl font-bold text-white">
                  {stats.totalGenerations}
                </h3>
                <p className="text-gray-400">Всего генераций</p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6 text-center">
                <h3 className="text-lg font-semibold text-white">
                  Статус пресетов
                </h3>
                <div className="mt-2 space-y-1">
                  <div className="text-sm text-green-400">
                    Готовых: {stats.statusCount.ready}
                  </div>
                  <div className="text-sm text-yellow-400">
                    В работе: {stats.statusCount.draft}
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-6 text-center">
                <h3 className="text-lg font-semibold text-white">
                  Популярные жанры
                </h3>
                <div className="mt-2 space-y-1">
                  {Object.entries(stats.genresCount)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 3)
                    .map(([genre, count]) => (
                      <div key={genre} className="text-sm text-gray-300">
                        {genre}: {count}
                      </div>
                    ))}
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-6 text-center">
                <h3 className="text-lg font-semibold text-white">
                  Последняя генерация
                </h3>
                <p className="text-sm text-gray-400 mt-2">
                  {stats.latestGeneration
                    ? formatTimestamp(stats.latestGeneration)
                    : "Нет данных"}
                </p>
              </div>
            </div>
          )}

          {/* Заголовок каталога */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-white">Каталог генераций</h1>
            <Link
              href="/admin/generator"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Создать новую генерацию
            </Link>
          </div>

          {/* Контент */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              <p className="mt-4 text-gray-400">Загрузка...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-400">{error}</p>
            </div>
          ) : generations.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 mb-4">Генераций пока нет</p>
              <Link
                href="/admin/generator"
                className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Создать первую генерацию
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {generations.map((generation) => {
                const latestVersion =
                  generation.versions[generation.versions.length - 1];
                const qrCode = latestVersion
                  ? generateQRCode(latestVersion.chain)
                  : "";
                const enabledEffectsCount = latestVersion
                  ? getEnabledEffectsCount(latestVersion.chain)
                  : 0;

                return (
                  <div
                    key={generation.id}
                    className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-xs font-mono text-gray-500">
                        {generation.id}
                      </span>
                      <span className="text-xs text-gray-400">
                        {formatTimestamp(generation.timestamp)}
                      </span>
                    </div>

                    <div className="mb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded">
                          {generation.proDescription.genre}
                        </span>
                        <span
                          className={`px-2 py-1 text-xs rounded ${
                            generation.status === "ready"
                              ? "bg-green-600 text-white"
                              : "bg-yellow-600 text-white"
                          }`}
                        >
                          {generation.status === "ready" ? "Готов" : "В работе"}
                        </span>
                      </div>

                      <h3 className="text-white font-medium mb-2 leading-tight">
                        &ldquo;{truncateText(generation.originalPrompt, 60)}
                        &rdquo;
                      </h3>

                      <p className="text-gray-400 text-sm leading-relaxed">
                        {truncateText(
                          generation.proDescription.sound_description,
                          100
                        )}
                      </p>
                    </div>

                    {/* QR Code */}
                    <div className="mb-3 flex justify-center">
                      <div className="bg-white p-2 rounded">
                        <QRCodeCanvas value={qrCode} size={120} level="M" />
                      </div>
                    </div>

                    <div className="text-xs text-gray-500 space-y-1 mb-3">
                      <div>Усилитель: {generation.realRig.amplifier}</div>
                      <div>Включенных эффектов: {enabledEffectsCount}</div>
                    </div>

                    {/* Кнопка для перехода к детальной странице */}
                    <Link
                      href={`/generation/${generation.id}`}
                      className="block w-full text-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
                    >
                      Подробнее
                    </Link>
                  </div>
                );
              })}
            </div>
          )}

          {/* Ссылка на все генерации */}
          {generations.length >= 20 && (
            <div className="text-center mt-8">
              <button className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors">
                Показать больше
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
