import type { NextApiRequest, NextApiResponse } from "next";
import { generationDb, type GenerationStats } from "../../lib/jsondb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GenerationStats | { error: string }>
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ error: "Method not allowed" }); return;
  }

  try {
    const stats = await generationDb.getStats();
    res.status(200).json(stats);
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
