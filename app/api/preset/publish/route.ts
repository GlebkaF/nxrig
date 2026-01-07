import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { generationDb } from "../../../../lib/jsondb";

interface PublishPresetsRequest {
  presetIds: string[];
}

export async function POST(request: NextRequest) {
  try {
    const body: PublishPresetsRequest = await request.json();

    // Валидация входных данных
    if (!Array.isArray(body.presetIds)) {
      return NextResponse.json(
        { error: "presetIds array is required" },
        { status: 400 },
      );
    }

    if (body.presetIds.length === 0) {
      return NextResponse.json(
        { error: "At least one preset ID is required" },
        { status: 400 },
      );
    }

    // Читаем presets.json
    const presetsPath = path.join(process.cwd(), "data", "presets.json");
    const presetsData = await fs
      .readFile(presetsPath, "utf-8")
      .then((data) => JSON.parse(data));

    const currentDate = new Date().toISOString();
    const publishedPresets: Array<{ id: string; slug: string }> = [];
    const errors: Array<{ id: string; error: string }> = [];

    // Обрабатываем каждый пресет
    for (const presetId of body.presetIds) {
      try {
        // Находим пресет
        const presetIndex = (
          presetsData as Array<{
            id: string;
            isDraft?: boolean;
            slug: string;
          }>
        ).findIndex((p) => p.id === presetId);

        if (presetIndex === -1) {
          errors.push({ id: presetId, error: "Preset not found" });
          continue;
        }

        const preset = presetsData[presetIndex] as {
          id: string;
          isDraft?: boolean;
          slug: string;
          createdAt: string | null;
          updatedAt: string;
        };

        // Проверяем, что это драфт
        if (preset.isDraft !== true) {
          errors.push({ id: presetId, error: "Preset is not a draft" });
          continue;
        }

        // Обновляем пресет
        presetsData[presetIndex] = {
          ...preset,
          isDraft: false,
          createdAt: currentDate,
          updatedAt: currentDate,
        };

        publishedPresets.push({ id: preset.id, slug: preset.slug });

        // Обновляем статус генерации
        try {
          const generation = await generationDb.getGenerationById(preset.id);
          if (generation) {
            await generationDb.updateGeneration({
              ...generation,
              status: "ready",
            });
          }
        } catch (genError) {
          console.warn(
            `Failed to update generation status for ${preset.id}:`,
            genError,
          );
          // Продолжаем выполнение, даже если не удалось обновить генерацию
        }
      } catch (error) {
        console.error(`Error publishing preset ${presetId}:`, error);
        errors.push({
          id: presetId,
          error:
            error instanceof Error ? error.message : "Unknown error occurred",
        });
      }
    }

    // Сохраняем обновленный presets.json
    await fs.writeFile(
      presetsPath,
      JSON.stringify(presetsData, null, 2),
      "utf-8",
    );

    console.log(
      `✅ Published ${String(publishedPresets.length)} preset(s): ${publishedPresets.map((p) => p.id).join(", ")}`,
    );

    return NextResponse.json({
      success: true,
      published: publishedPresets,
      errors: errors.length > 0 ? errors : undefined,
      message: `Successfully published ${String(publishedPresets.length)} preset(s)`,
    });
  } catch (error) {
    console.error("Error publishing presets:", error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
