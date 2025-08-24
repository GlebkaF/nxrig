import { NextResponse } from "next/server";
import { generationDb, type GenerationRecord } from "../../../lib/jsondb";

// Исключаем этот API роут из статической генерации
export function generateStaticParams() {
  return [{ id: "this-is-a-dummy-id-for-static-build" }];
}

export async function GET(): Promise<
  NextResponse<GenerationRecord[] | { error: string }>
> {
  try {
    const generations = await generationDb.getAllGenerations();

    return NextResponse.json(generations);
  } catch (error) {
    console.error("Error fetching generations:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
