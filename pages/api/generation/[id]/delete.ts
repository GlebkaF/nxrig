import { NextApiRequest, NextApiResponse } from "next";
import { generationDb } from "../../../../lib/jsondb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Invalid generation ID" });
  }

  try {
    const success = await generationDb.deleteGeneration(id);

    if (!success) {
      return res.status(404).json({ error: "Generation not found" });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error deleting generation:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
