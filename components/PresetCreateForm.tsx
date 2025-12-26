"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { GenerationRecord } from "../lib/jsondb/types";
import { ValidatedArtist } from "../lib/public/schemas/artist";
import { smartMapToPart } from "../lib/utils/track-mapping";

interface PresetCreateFormProps {
  generation: GenerationRecord;
  artists: ValidatedArtist[];
}

interface PresetFormData {
  artistId: number | null;
  newArtistTitle: string;
  newArtistDescription: string;
  song: string;
  part: string;
  imageUrl: string;
  tabsUrl: string;
  pickup: {
    type: string;
    tone: number;
    position: string;
  };
}

export function PresetCreateForm({
  generation,
  artists,
}: PresetCreateFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>("");
  const [isNewArtist, setIsNewArtist] = useState(false);

  const [formData, setFormData] = useState<PresetFormData>({
    artistId: null,
    newArtistTitle: "",
    newArtistDescription: "",
    song: "",
    part: "",
    imageUrl: "/images/cover/default-cover.webp",
    tabsUrl: "",
    pickup: {
      type: generation.proDescription.preferred_pickup || "",
      tone: 5,
      position: "bridge",
    },
  });

  // Автозаполнение формы из songsterrData
  useEffect(() => {
    if (!generation.songsterrData) return;

    const { artist, title, trackType, trackName, url } =
      generation.songsterrData;

    // 1. Поиск существующего артиста (fuzzy match)
    const foundArtist = artists.find(
      (a) =>
        a.title.toLowerCase() === artist.toLowerCase() ||
        a.title.toLowerCase().includes(artist.toLowerCase()) ||
        artist.toLowerCase().includes(a.title.toLowerCase()),
    );

    if (foundArtist) {
      // Артист найден - выбираем его
      setIsNewArtist(false);
      setFormData((prev) => ({
        ...prev,
        artistId: foundArtist.id,
        song: title,
        part: smartMapToPart(trackType, trackName),
        tabsUrl: url,
      }));
      console.log(
        `✅ Артист найден: ${foundArtist.title} (ID: ${String(foundArtist.id)})`,
      );
    } else {
      // Артист не найден - создаем нового
      setIsNewArtist(true);
      setFormData((prev) => ({
        ...prev,
        newArtistTitle: artist,
        newArtistDescription: `Описание для ${artist}`,
        song: title,
        part: smartMapToPart(trackType, trackName),
        tabsUrl: url,
      }));
      console.log(`📝 Создание нового артиста: ${artist}`);
    }

    console.log(
      `🎵 Автозаполнение: ${artist} - ${title} (${smartMapToPart(trackType, trackName)})`,
    );
  }, [generation.songsterrData, artists]);

  // Получаем последнюю версию chain из генерации (не используется в UI, но может понадобиться)
  const latestChain = useMemo(() => {
    if (generation.versions.length === 0) return null;
    const latestVersion = generation.versions[generation.versions.length - 1];
    return latestVersion?.chain || null;
  }, [generation]);

  // Используем latestChain для предотвращения warning
  console.debug("Latest chain available:", !!latestChain);

  // Генерируем slug пресета на лету
  const presetSlug = useMemo(() => {
    if (!formData.song || !formData.part) return "";

    // Используем простую логику без createPresetSlug для избежания проблем с типизацией
    const songSlug = formData.song
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    const partSlug = formData.part
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    return `${songSlug}-guitar-${partSlug}`;
  }, [formData.song, formData.part]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Валидация
      if (!formData.song.trim()) {
        throw new Error("Название песни обязательно");
      }
      if (!formData.part.trim()) {
        throw new Error("Часть песни обязательна");
      }
      if (!isNewArtist && !formData.artistId) {
        throw new Error("Выберите артиста");
      }
      if (isNewArtist && !formData.newArtistTitle.trim()) {
        throw new Error("Название артиста обязательно");
      }
      if (!formData.pickup.type.trim()) {
        throw new Error("Тип звукоснимателя обязателен");
      }
      if (
        !formData.pickup.tone ||
        formData.pickup.tone < 1 ||
        formData.pickup.tone > 10
      ) {
        throw new Error("Тон звукоснимателя должен быть от 1 до 10");
      }

      const payload = {
        generationId: generation.id,
        artistId: isNewArtist ? null : formData.artistId,
        newArtist: isNewArtist
          ? {
              title: formData.newArtistTitle.trim(),
              description:
                formData.newArtistDescription.trim() ||
                `Описание для ${formData.newArtistTitle.trim()}`,
            }
          : null,
        song: formData.song.trim(),
        part: formData.part.trim(),
        imageUrl: formData.imageUrl.trim() || null,
        tabsUrl: formData.tabsUrl.trim() || undefined,
        pickup: {
          type: formData.pickup.type.trim(),
          tone: formData.pickup.tone,
          position: formData.pickup.position,
        },
      };

      const response = await fetch("/api/preset/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Ошибка при создании пресета");
      }

      const result = (await response.json()) as {
        artistSlug: string;
        presetSlug: string;
      };

      // Перенаправляем на созданный пресет
      router.push(`/preset/${result.artistSlug}/${result.presetSlug}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Неизвестная ошибка");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <form
        onSubmit={(e) => {
          void handleSubmit(e);
        }}
        className="space-y-6"
      >
        {/* Автозаполнение из Songsterr */}
        {generation.songsterrData && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-green-900 mb-2">
              ✅ Форма автозаполнена из Songsterr
            </h3>
            <div className="text-sm text-green-700 space-y-1">
              <p>
                <span className="font-medium">Артист:</span>{" "}
                {generation.songsterrData.artist}
              </p>
              <p>
                <span className="font-medium">Песня:</span>{" "}
                {generation.songsterrData.title}
              </p>
              <p>
                <span className="font-medium">Тип трека:</span>{" "}
                {generation.songsterrData.trackType}
              </p>
              <p className="text-xs text-green-600 mt-2">
                💡 Проверьте автозаполненные поля ниже и внесите правки при
                необходимости
              </p>
            </div>
          </div>
        )}

        {/* Информация о генерации */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Данные из генерации
          </h3>

          {/* Исходный промпт */}
          <div className="mb-4">
            <span className="font-medium text-gray-700">Исходный запрос:</span>
            <p className="mt-1 text-sm text-gray-600 italic">
              &ldquo;{generation.originalPrompt}&rdquo;
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Жанр:</span>
              <span className="ml-2 text-gray-600">
                {generation.proDescription.genre}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Описание:</span>
              <span className="ml-2 text-gray-600">
                {generation.proDescription.sound_description}
              </span>
            </div>
          </div>

          {/* Исходный промпт */}
          <div className="mb-4">
            <span className="font-medium text-gray-700">Pickup:</span>
            <p className="mt-1 text-sm text-gray-600 italic">
              &ldquo;{generation.proDescription.preferred_pickup}&rdquo;
            </p>
          </div>
        </div>

        {/* Выбор артиста */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Артист
          </label>
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="radio"
                name="artistType"
                checked={!isNewArtist}
                onChange={() => {
                  setIsNewArtist(false);
                }}
                className="mr-2"
              />
              Выбрать существующего
            </label>
            {!isNewArtist && (
              <select
                value={formData.artistId || ""}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    artistId: e.target.value ? Number(e.target.value) : null,
                  }));
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required={!isNewArtist}
              >
                <option value="">Выберите артиста</option>
                {artists
                  .sort((a, b) => a.title.localeCompare(b.title))
                  .map((artist) => (
                    <option key={artist.id} value={artist.id}>
                      {artist.title}
                    </option>
                  ))}
              </select>
            )}

            <label className="flex items-center">
              <input
                type="radio"
                name="artistType"
                checked={isNewArtist}
                onChange={() => {
                  setIsNewArtist(true);
                }}
                className="mr-2"
              />
              Создать нового
            </label>
            {isNewArtist && (
              <div className="space-y-3 ml-6">
                <input
                  type="text"
                  placeholder="Название артиста"
                  value={formData.newArtistTitle}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      newArtistTitle: e.target.value,
                    }));
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required={isNewArtist}
                />
                <textarea
                  placeholder="Описание артиста (необязательно)"
                  value={formData.newArtistDescription}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      newArtistDescription: e.target.value,
                    }));
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                />
              </div>
            )}
          </div>
        </div>

        {/* Информация о песне */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Название песни *
            </label>
            <input
              type="text"
              value={formData.song}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  song: e.target.value,
                }));
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Например: Master of Puppets"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Часть песни *
            </label>
            <input
              type="text"
              value={formData.part}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  part: e.target.value,
                }));
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Например: Intro, Verse, Chorus"
              required
            />
          </div>
        </div>

        {/* Slug превью */}
        {presetSlug && (
          <div className="bg-blue-50 rounded-lg p-3">
            <span className="text-sm font-medium text-blue-800">
              Slug пресета:
            </span>
            <span className="ml-2 text-sm text-blue-600 font-mono">
              {presetSlug}
            </span>
          </div>
        )}

        {/* Звукосниматель */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Звукосниматель
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Тип *</label>
              <select
                value={formData.pickup.type}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    pickup: { ...prev.pickup, type: e.target.value },
                  }));
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Выберите тип</option>
                <option value="humbucker">Humbucker</option>
                <option value="single">Single Coil</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Тон *</label>
              <select
                value={formData.pickup.tone}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    pickup: { ...prev.pickup, tone: Number(e.target.value) },
                  }));
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((tone) => (
                  <option key={tone} value={tone}>
                    {tone}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Позиция
              </label>
              <select
                value={formData.pickup.position}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    pickup: { ...prev.pickup, position: e.target.value },
                  }));
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="neck">Neck</option>
                <option value="middle">Middle</option>
                <option value="bridge">Bridge</option>
              </select>
            </div>
          </div>
        </div>

        {/* Дополнительные поля */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL изображения
            </label>
            <input
              type="text"
              value={formData.imageUrl}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  imageUrl: e.target.value,
                }));
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="/images/cover/artist-name/song-name.webp или https://example.com/image.jpg"
            />
            <p className="text-xs text-gray-500 mt-1">
              Можно использовать локальные пути (например:
              /images/cover/metallica/master-of-puppets.webp) или внешние URL
            </p>
            {formData.imageUrl && (
              <div className="mt-2">
                <Image
                  src={formData.imageUrl}
                  alt="Предварительный просмотр"
                  width={80}
                  height={80}
                  className="object-cover rounded border"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                  }}
                />
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL табулатур
            </label>
            <input
              type="url"
              value={formData.tabsUrl}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  tabsUrl: e.target.value,
                }));
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://example.com/tabs"
            />
          </div>
        </div>

        {/* Описание (из генерации) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Описание пресета
          </label>
          <textarea
            value={generation.proDescription.sound_description}
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
            rows={3}
            readOnly
          />
          <p className="text-xs text-gray-500 mt-1">
            Описание берется из генерации и не может быть изменено
          </p>
        </div>

        {/* Ошибка */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Кнопки */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => {
              router.back();
            }}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            Отмена
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-4 py-2 text-sm font-medium text-white rounded-md transition-colors ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isSubmitting ? "Создание..." : "Создать пресет"}
          </button>
        </div>
      </form>
    </div>
  );
}
