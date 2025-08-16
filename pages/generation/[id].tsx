import { GetServerSideProps } from "next";
import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { QRCodeCanvas } from "qrcode.react";
import ChainEditor from "../../components/chain/ChainEditor";
import { encodeChain } from "../../lib/core/encoder";
import { generationDb, type GenerationRecord } from "../../lib/jsondb";

interface GenerationPageProps {
  generation: GenerationRecord | null;
  error?: string;
}

export default function GenerationPage({
  generation,
  error,
}: GenerationPageProps): React.ReactElement {
  const [qrCodeData, setQrCodeData] = useState<string>("");

  // Функция для подсчета включенных эффектов в цепи
  const getEnabledEffectsCount = (
    chain: GenerationRecord["finalChain"]
  ): number => {
    return Object.values(chain).filter(
      (block) =>
        typeof block === "object" &&
        "enabled" in block &&
        (block as { enabled: boolean }).enabled
    ).length;
  };

  useEffect(() => {
    if (generation?.finalChain) {
      try {
        const encoded = encodeChain(generation.finalChain);
        setQrCodeData(encoded.qrCode);
      } catch (err) {
        console.error("Error encoding chain:", err);
      }
    }
  }, [generation]);

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
              href="/"
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

  return (
    <>
      <Head>
        <title>Генерация {generation.id} | Guitar Chain Generator</title>
        <meta
          name="description"
          content={`Генерация гитарной цепочки: ${generation.proDescription.genre} - ${generation.proDescription.sound_description}`}
        />
      </Head>

      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="inline-flex items-center px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                ← Назад к каталогу
              </Link>
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
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Цепочка эффектов
                </h2>
                <ChainEditor
                  chain={generation.finalChain}
                  onChange={() => {}} // Пустая функция, так как редактирование отключено
                  readonly={true}
                />
              </div>
            </div>

            {/* Sidebar с информацией */}
            <div className="space-y-6">
              {/* QR Code */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  QR-код для загрузки
                </h3>
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
                    <span className="font-medium text-gray-900">
                      Усилитель:
                    </span>
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
                      {getEnabledEffectsCount(generation.finalChain)}
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
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<
  GenerationPageProps
> = async (context) => {
  const { id } = context.params || {};

  if (!id || typeof id !== "string") {
    return {
      props: {
        generation: null,
        error: "Invalid generation ID",
      },
    };
  }

  try {
    const generation = await generationDb.getGenerationById(id);

    if (!generation) {
      return {
        props: {
          generation: null,
          error: "Generation not found",
        },
      };
    }

    return {
      props: {
        generation: JSON.parse(JSON.stringify(generation)) as GenerationRecord, // Сериализация для Next.js
      },
    };
  } catch (error) {
    console.error("Error fetching generation:", error);
    return {
      props: {
        generation: null,
        error: "Internal server error",
      },
    };
  }
};
