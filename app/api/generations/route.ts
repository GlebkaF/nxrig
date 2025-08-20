import { NextResponse } from "next/server";
import { generationDb, type GenerationRecord } from "../../../lib/jsondb";

export async function GET(
  request: Request
): Promise<NextResponse<GenerationRecord[] | { error: string }>> {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit");

    let generations: GenerationRecord[];

    if (limit) {
      const limitNum = parseInt(limit, 10);
      if (isNaN(limitNum) || limitNum < 1) {
        return NextResponse.json(
          { error: "Invalid limit parameter" },
          { status: 400 }
        );
      }
      generations = await generationDb.getLatestGenerations(limitNum);
    } else {
      generations = await generationDb.getAllGenerations();
    }

    return NextResponse.json(generations);
  } catch (error) {
    console.error("Error fetching generations:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
