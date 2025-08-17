import type { NextApiRequest, NextApiResponse } from "next";
import { generationDb, type GenerationRecord } from "../../../lib/jsondb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GenerationRecord | { error: string }>
): Promise<void> {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const { id } = req.query;

    if (!id || typeof id !== "string") {
      res.status(400).json({ error: "Generation ID is required" });
      return;
    }

    const generation = await generationDb.getGenerationById(id);

    if (!generation) {
      res.status(404).json({ error: "Generation not found" });
      return;
    }

    res.status(200).json(generation);
  } catch (error) {
    console.error("Error fetching generation:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
