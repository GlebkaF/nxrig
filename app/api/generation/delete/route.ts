import { NextResponse } from "next/server";
import { generationDb } from "../../../../lib/jsondb";

// Исключаем этот API роут из статической генерации
export function generateStaticParams() {
  return [{ id: "this-is-a-dummy-id-for-static-build" }];
}

export async function DELETE(request: Request): Promise<NextResponse> {
  const { id } = (await request.json()) as { id: string };

  if (!id) {
    return NextResponse.json(
      { error: "Invalid generation ID" },
      { status: 400 },
    );
  }

  try {
    const success = await generationDb.deleteGeneration(id);

    if (!success) {
      return NextResponse.json(
        { error: "Generation not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting generation:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
