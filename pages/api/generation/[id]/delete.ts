import { NextApiRequest, NextApiResponse } from "next";
import { generationDb } from "../../../../lib/jsondb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method !== "DELETE") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { id } = req.query;

  if (!id || typeof id !== "string") {
    res.status(400).json({ error: "Invalid generation ID" });
    return;
  }

  try {
    const success = await generationDb.deleteGeneration(id);

    if (!success) {
      res.status(404).json({ error: "Generation not found" });
      return;
    }

    res.status(200).json({ success: true });
    return;
  } catch (error) {
    console.error("Error deleting generation:", error);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
}
