import { NextApiRequest, NextApiResponse } from "next";
import { generationDb } from "../../../../lib/jsondb";
import { PresetStatus } from "../../../../lib/jsondb/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id } = req.query;
  const { status } = req.body;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Invalid generation ID" });
  }

  if (!status || !["draft", "ready"].includes(status)) {
    return res.status(400).json({ error: "Invalid status value" });
  }

  try {
    const generation = await generationDb.getGenerationById(id);
    if (!generation) {
      return res.status(404).json({ error: "Generation not found" });
    }

    const updatedGeneration = {
      ...generation,
      status: status as PresetStatus,
    };

    await generationDb.updateGeneration(updatedGeneration);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error updating generation status:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
