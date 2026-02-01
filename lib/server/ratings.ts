import fs from "fs/promises";
import path from "path";

export interface RatingEntry {
  rating: number;
  comment: string;
  userName: string;
  userEmail: string;
  createdAt: string;
}

export interface RatingSummary {
  average: number;
  count: number;
}

const ratingsFilePath = path.join(process.cwd(), "data", "ratings.json");

async function readRatings(): Promise<Record<string, RatingEntry[]>> {
  try {
    const file = await fs.readFile(ratingsFilePath, "utf-8");
    return JSON.parse(file) as Record<string, RatingEntry[]>;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      await fs.writeFile(ratingsFilePath, "{}", "utf-8");
      return {};
    }
    throw error;
  }
}

async function writeRatings(
  data: Record<string, RatingEntry[]>,
): Promise<void> {
  await fs.writeFile(ratingsFilePath, JSON.stringify(data, null, 2), "utf-8");
}

function summarize(entries: RatingEntry[]): RatingSummary {
  if (entries.length === 0) {
    return { average: 0, count: 0 };
  }
  const total = entries.reduce((sum, entry) => sum + entry.rating, 0);
  return {
    average: Number((total / entries.length).toFixed(2)),
    count: entries.length,
  };
}

export async function getPresetRatingSummary(
  presetId: string,
): Promise<RatingSummary> {
  const ratings = await readRatings();
  return summarize(ratings[presetId] ?? []);
}

export async function getPresetRatings(
  presetId: string,
  limit: number = 5,
): Promise<RatingEntry[]> {
  const ratings = await readRatings();
  const entries = ratings[presetId] ?? [];
  return entries.slice(-limit).reverse();
}

export async function addPresetRating(
  presetId: string,
  entry: RatingEntry,
): Promise<RatingSummary> {
  const ratings = await readRatings();
  const entries = ratings[presetId] ?? [];
  const updated = [...entries, entry];
  ratings[presetId] = updated;
  await writeRatings(ratings);
  return summarize(updated);
}
