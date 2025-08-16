import type { NextApiRequest, NextApiResponse } from "next";
import { generationDb, type GenerationRecord } from "../../lib/jsondb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GenerationRecord[] | { error: string }>
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ error: "Method not allowed" }); return;
  }

  try {
    const { limit } = req.query;

    let generations: GenerationRecord[];

    if (limit && typeof limit === "string") {
      const limitNum = parseInt(limit, 10);
      if (isNaN(limitNum) || limitNum < 1) {
        res.status(400).json({ error: "Invalid limit parameter" }); return;
      }
      generations = await generationDb.getLatestGenerations(limitNum);
    } else {
      generations = await generationDb.getAllGenerations();
    }

    res.status(200).json(generations);
  } catch (error) {
    console.error("Error fetching generations:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
