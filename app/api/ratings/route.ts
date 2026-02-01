import { NextRequest, NextResponse } from "next/server";
import {
  addPresetRating,
  getPresetRatingSummary,
  getPresetRatings,
  RatingEntry,
} from "lib/server/ratings";

const MAX_COMMENT_LENGTH = 240;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const presetId = searchParams.get("presetId");

  if (!presetId) {
    return NextResponse.json(
      { error: "Missing presetId parameter." },
      { status: 400 },
    );
  }

  const [summary, entries] = await Promise.all([
    getPresetRatingSummary(presetId),
    getPresetRatings(presetId, 5),
  ]);

  return NextResponse.json({ summary, entries });
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as Partial<RatingEntry> & {
    presetId?: string;
  };

  if (!body.presetId) {
    return NextResponse.json(
      { error: "Missing presetId in request body." },
      { status: 400 },
    );
  }

  if (typeof body.rating !== "number" || body.rating < 1 || body.rating > 5) {
    return NextResponse.json(
      { error: "Rating must be a number between 1 and 5." },
      { status: 400 },
    );
  }

  if (!body.userName || !body.userEmail) {
    return NextResponse.json(
      { error: "User name and email are required." },
      { status: 400 },
    );
  }

  const comment = body.comment?.trim() ?? "";
  if (comment.length > MAX_COMMENT_LENGTH) {
    return NextResponse.json(
      {
        error: `Comment must be under ${MAX_COMMENT_LENGTH.toString()} characters.`,
      },
      { status: 400 },
    );
  }

  const entry: RatingEntry = {
    rating: body.rating,
    comment,
    userName: body.userName,
    userEmail: body.userEmail,
    createdAt: new Date().toISOString(),
  };

  const summary = await addPresetRating(body.presetId, entry);

  return NextResponse.json({ summary });
}
