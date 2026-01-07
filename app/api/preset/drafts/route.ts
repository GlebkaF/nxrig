import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { validatePresetWithArtist } from "../../../../lib/public/schemas/preset";
import { validateArtist } from "../../../../lib/public/schemas/artist";

export async function GET() {
  try {
    // Читаем данные
    const presetsPath = path.join(process.cwd(), "data", "presets.json");
    const artistsPath = path.join(process.cwd(), "data", "artists.json");

    const [presetsData, artistsData] = await Promise.all([
      fs.readFile(presetsPath, "utf-8").then((data) => JSON.parse(data)),
      fs.readFile(artistsPath, "utf-8").then((data) => JSON.parse(data)),
    ]);

    // Фильтруем только драфты
    const drafts = (
      presetsData as Array<{
        id: string;
        origin: {
          artistId: number;
          song: string;
          part: string;
          imageUrl: string | null;
        };
        description: string;
        chain: unknown;
        pickup: unknown;
        slug: string;
        tabsUrl?: string;
        isDraft?: boolean;
        createdAt: string | null;
        updatedAt: string;
      }>
    )
      .filter((preset) => preset.isDraft === true)
      .map((preset) => {
        // Находим артиста
        const artist = (
          artistsData as Array<{
            id: number;
            title: string;
            slug: string;
            description: string;
          }>
        ).find((a) => a.id === preset.origin.artistId);

        if (!artist) {
          throw new Error(`Artist not found for preset ${preset.id}`);
        }

        // Валидируем артиста
        const validatedArtist = validateArtist(artist);

        // Создаем полный объект пресета
        const presetWithArtist = {
          id: preset.id,
          origin: {
            artist: validatedArtist,
            song: preset.origin.song,
            part: preset.origin.part,
            imageUrl: preset.origin.imageUrl,
          },
          description: preset.description,
          chain: preset.chain,
          pickup: preset.pickup,
          slug: preset.slug,
          tabsUrl: preset.tabsUrl,
          isDraft: preset.isDraft ?? false,
          createdAt: preset.createdAt,
          updatedAt: preset.updatedAt,
        };

        // Валидируем
        return validatePresetWithArtist(presetWithArtist);
      })
      // Сортируем по дате обновления (старые первыми - FIFO)
      .sort((a, b) => {
        const dateA = new Date(a.updatedAt).getTime();
        const dateB = new Date(b.updatedAt).getTime();
        return dateA - dateB;
      });

    return NextResponse.json({
      drafts,
      count: drafts.length,
    });
  } catch (error) {
    console.error("Error fetching drafts:", error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
