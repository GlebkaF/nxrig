import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { generationDb } from "../../../../lib/jsondb";
import { validatePresetWithArtist } from "../../../../lib/public/schemas/preset";
import { validateArtist } from "../../../../lib/public/schemas/artist";
import { createSlug } from "../../../../lib/utils/create-slug";

interface CreatePresetRequest {
  generationId: string;
  artistId?: number | null;
  newArtist?: {
    title: string;
    description: string;
  } | null;
  song: string;
  part: string;
  imageUrl?: string | null;
  tabsUrl?: string;
  pickup: {
    type: string;
    tone: number;
    position: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: CreatePresetRequest = await request.json();

    // Валидация входных данных
    if (!body.generationId) {
      return NextResponse.json(
        { error: "Generation ID is required" },
        { status: 400 },
      );
    }
    if (!body.song || !body.song.trim()) {
      return NextResponse.json(
        { error: "Song name is required" },
        { status: 400 },
      );
    }
    if (!body.part || !body.part.trim()) {
      return NextResponse.json(
        { error: "Song part is required" },
        { status: 400 },
      );
    }
    if (
      !body.artistId &&
      (!body.newArtist || !body.newArtist.title || !body.newArtist.title.trim())
    ) {
      return NextResponse.json(
        { error: "Artist ID or new artist data is required" },
        { status: 400 },
      );
    }
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!body.pickup?.type?.trim()) {
      return NextResponse.json(
        { error: "Pickup type is required" },
        { status: 400 },
      );
    }
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!body.pickup?.tone || body.pickup.tone < 1 || body.pickup.tone > 10) {
      return NextResponse.json(
        { error: "Pickup tone must be between 1 and 10" },
        { status: 400 },
      );
    }

    // Получаем генерацию
    const generation = await generationDb.getGenerationById(body.generationId);
    if (!generation) {
      return NextResponse.json(
        { error: "Generation not found" },
        { status: 404 },
      );
    }

    // Получаем последнюю версию chain
    if (generation.versions.length === 0) {
      return NextResponse.json(
        { error: "Generation has no versions" },
        { status: 400 },
      );
    }
    const latestVersion = generation.versions[generation.versions.length - 1];
    if (!latestVersion) {
      return NextResponse.json(
        { error: "Latest version not found" },
        { status: 400 },
      );
    }
    const latestChain = latestVersion.chain;

    // Читаем существующие данные
    const presetsPath = path.join(process.cwd(), "data", "presets.json");
    const artistsPath = path.join(process.cwd(), "data", "artists.json");

    const [presetsData, artistsData] = await Promise.all([
      fs.readFile(presetsPath, "utf-8").then((data) => JSON.parse(data)),
      fs.readFile(artistsPath, "utf-8").then((data) => JSON.parse(data)),
    ]);

    let artist;
    let artistId: number;

    // Обрабатываем артиста
    if (body.newArtist) {
      // Создаем нового артиста
      const maxId = Math.max(
        ...(artistsData as Array<{ id: number }>).map((a) => a.id),
        0,
      );
      artistId = maxId + 1;

      artist = {
        id: artistId,
        title: body.newArtist.title.trim(),
        slug: createSlug(body.newArtist.title.trim()),
        description:
          body.newArtist.description.trim() ||
          `Описание для ${body.newArtist.title.trim()}`,
      };

      // Валидируем нового артиста
      validateArtist(artist);

      // Добавляем в массив артистов
      artistsData.push(artist);
    } else {
      // Используем существующего артиста
      artistId = body.artistId as number;
      artist = (
        artistsData as Array<{
          id: number;
          title: string;
          slug: string;
          description: string;
        }>
      ).find((a) => a.id === artistId);
      if (!artist) {
        return NextResponse.json(
          { error: "Artist not found" },
          { status: 404 },
        );
      }
    }

    const presetId = generation.id;

    // Создаем slug пресета
    const songSlug = body.song
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    const partSlug = body.part
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    const slug = `${songSlug}-guitar-${partSlug}`;

    // Создаем объект пресета
    const preset = {
      id: presetId,
      origin: {
        artistId: artistId,
        song: body.song.trim(),
        part: body.part.trim(),
        imageUrl: body.imageUrl?.trim() || null,
      },
      description: generation.proDescription.sound_description,
      chain: latestChain,
      pickup: {
        type: body.pickup.type.trim(),
        tone: body.pickup.tone,
        position: body.pickup.position,
      },
      slug: slug,
      tabsUrl: body.tabsUrl?.trim() || undefined,
    };

    // Создаем объект для валидации с полным артистом
    const presetWithArtist = {
      id: preset.id,
      origin: {
        artist: artist,
        song: preset.origin.song,
        part: preset.origin.part,
        imageUrl: preset.origin.imageUrl,
      },
      description: preset.description,
      chain: preset.chain,
      pickup: preset.pickup,
      slug: preset.slug,
      tabsUrl: preset.tabsUrl,
    };

    // Валидируем пресет
    validatePresetWithArtist(presetWithArtist);

    // Добавляем пресет в массив
    presetsData.push(preset);

    // Сохраняем файлы
    await Promise.all([
      fs.writeFile(presetsPath, JSON.stringify(presetsData, null, 2), "utf-8"),
      fs.writeFile(artistsPath, JSON.stringify(artistsData, null, 2), "utf-8"),
    ]);

    console.log(`✅ Пресет создан: ${presetId} для артиста ${artist.title}`);

    return NextResponse.json({
      success: true,
      presetId: presetId,
      presetSlug: slug,
      artistSlug: artist.slug,
      message: "Preset created successfully",
    });
  } catch (error) {
    console.error("Error creating preset:", error);

    if (error instanceof Error) {
      // Если это ошибка валидации Zod
      if (error.message.includes("validation")) {
        return NextResponse.json(
          { error: `Validation error: ${error.message}` },
          { status: 400 },
        );
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
