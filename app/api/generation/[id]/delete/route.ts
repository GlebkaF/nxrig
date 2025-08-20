import { NextResponse } from "next/server";
import { generationDb } from "../../../../../lib/jsondb";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      { error: "Invalid generation ID" },
      { status: 400 }
    );
  }

  try {
    const success = await generationDb.deleteGeneration(id);

    if (!success) {
      return NextResponse.json(
        { error: "Generation not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting generation:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
