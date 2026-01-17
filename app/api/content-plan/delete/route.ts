import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

interface ContentPlanTrack {
  artist: string;
  song: string;
  instrument: string;
  part: string;
  songsterrUrl: string;
  trackIndex: number;
}

interface ContentPlanData {
  tracks: ContentPlanTrack[];
}

const CONTENT_PLAN_PATH = path.join(
  process.cwd(),
  "data",
  "content-plan-cleaned.json",
);

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = (await request.json()) as { songsterrUrl: string };

    if (!body.songsterrUrl) {
      return NextResponse.json(
        { error: "songsterrUrl is required" },
        { status: 400 },
      );
    }

    // Read current data
    const fileContent = await fs.readFile(CONTENT_PLAN_PATH, "utf-8");
    const data: ContentPlanData = JSON.parse(fileContent);

    // Find and remove the track
    const initialLength = data.tracks.length;
    data.tracks = data.tracks.filter(
      (track) => track.songsterrUrl !== body.songsterrUrl,
    );

    if (data.tracks.length === initialLength) {
      return NextResponse.json({ error: "Track not found" }, { status: 404 });
    }

    // Write back
    await fs.writeFile(
      CONTENT_PLAN_PATH,
      JSON.stringify(data, null, 2),
      "utf-8",
    );

    return NextResponse.json({
      success: true,
      message: "Track deleted",
      remainingTracks: data.tracks.length,
    });
  } catch (error) {
    console.error("Error deleting track:", error);
    return NextResponse.json(
      { error: "Failed to delete track" },
      { status: 500 },
    );
  }
}
