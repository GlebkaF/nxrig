import { NextResponse } from "next/server";
import { generationDb } from "../../../../lib/jsondb";

import { PresetStatus } from "../../../../lib/jsondb/types";

// Исключаем этот API роут из статической генерации
export function generateStaticParams() {
  return [{ id: "this-is-a-dummy-id-for-static-build" }];
}

export async function POST(request: Request): Promise<NextResponse> {
  const { id, status } = (await request.json()) as {
    id: string;
    status: PresetStatus | undefined;
  };

  if (!id) {
    return NextResponse.json(
      { error: "Invalid generation ID" },
      { status: 400 },
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  if (!status || !["draft", "ready"].includes(status)) {
    return NextResponse.json(
      { error: "Invalid status value" },
      { status: 400 },
    );
  }

  try {
    const generation = await generationDb.getGenerationById(id);
    if (!generation) {
      return NextResponse.json(
        { error: "Generation not found" },
        { status: 404 },
      );
    }

    const updatedGeneration = {
      ...generation,
      status,
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    await generationDb.updateGeneration(updatedGeneration);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating generation status:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
