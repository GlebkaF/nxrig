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
    const body = (await request.json()) as {
      songsterrUrl: string;
      positions?: number;
    };

    if (!body.songsterrUrl) {
      return NextResponse.json(
        { error: "songsterrUrl is required" },
        { status: 400 },
      );
    }

    const positions = body.positions ?? 10;

    // Read current data
    const fileContent = await fs.readFile(CONTENT_PLAN_PATH, "utf-8");
    const data: ContentPlanData = JSON.parse(fileContent);

    // Find the track index
    const currentIndex = data.tracks.findIndex(
      (track) => track.songsterrUrl === body.songsterrUrl,
    );

    if (currentIndex === -1) {
      return NextResponse.json({ error: "Track not found" }, { status: 404 });
    }

    // Calculate new position (don't exceed array bounds)
    const newIndex = Math.min(currentIndex + positions, data.tracks.length - 1);

    // If already at end or would move beyond, just return success
    if (newIndex === currentIndex) {
      return NextResponse.json({
        success: true,
        message: "Track already at end of list",
        newPosition: currentIndex,
      });
    }

    // Remove track from current position
    const removed = data.tracks.splice(currentIndex, 1);
    const track = removed[0];

    // Insert at new position
    if (track) {
      data.tracks.splice(newIndex, 0, track);
    }

    // Write back
    await fs.writeFile(
      CONTENT_PLAN_PATH,
      JSON.stringify(data, null, 2),
      "utf-8",
    );

    return NextResponse.json({
      success: true,
      message: `Track postponed by ${String(newIndex - currentIndex)} positions`,
      oldPosition: currentIndex,
      newPosition: newIndex,
    });
  } catch (error) {
    console.error("Error postponing track:", error);
    return NextResponse.json(
      { error: "Failed to postpone track" },
      { status: 500 },
    );
  }
}
