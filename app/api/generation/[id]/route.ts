import { NextResponse } from "next/server";
import { generationDb, type GenerationRecord } from "../../../../lib/jsondb";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse<GenerationRecord | { error: string }>> {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "Generation ID is required" },
        { status: 400 }
      );
    }

    const generation = await generationDb.getGenerationById(id);

    if (!generation) {
      return NextResponse.json(
        { error: "Generation not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(generation);
  } catch (error) {
    console.error("Error fetching generation:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
