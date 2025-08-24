import { NextResponse } from "next/server";
import { generationDb } from "../../../../../lib/jsondb";

import { PresetStatus } from "../../../../../lib/jsondb/types";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  const { id } = params;
  const { status } = (await request.json()) as {
    status: PresetStatus | undefined;
  };

  if (!id) {
    return NextResponse.json(
      { error: "Invalid generation ID" },
      { status: 400 }
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  if (!status || !["draft", "ready"].includes(status)) {
    return NextResponse.json(
      { error: "Invalid status value" },
      { status: 400 }
    );
  }

  try {
    const generation = await generationDb.getGenerationById(id);
    if (!generation) {
      return NextResponse.json(
        { error: "Generation not found" },
        { status: 404 }
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
      { status: 500 }
    );
  }
}
