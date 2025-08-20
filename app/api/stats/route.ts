import { NextResponse } from "next/server";
import { generationDb, type GenerationStats } from "../../../lib/jsondb";

export async function GET(): Promise<
  NextResponse<GenerationStats | { error: string }>
> {
  try {
    const stats = await generationDb.getStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
