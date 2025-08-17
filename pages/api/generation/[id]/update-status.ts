import { NextApiRequest, NextApiResponse } from "next";
import { generationDb } from "../../../../lib/jsondb";
import { PresetStatus } from "../../../../lib/jsondb/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { id } = req.query;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { status } = req.body as { status: PresetStatus | undefined };

  if (!id || typeof id !== "string") {
    res.status(400).json({ error: "Invalid generation ID" });
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  if (!status || !["draft", "ready"].includes(status)) {
    res.status(400).json({ error: "Invalid status value" });
    return;
  }

  try {
    const generation = await generationDb.getGenerationById(id);
    if (!generation) {
      res.status(404).json({ error: "Generation not found" });
      return;
    }

    const updatedGeneration = {
      ...generation,
      status,
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    await generationDb.updateGeneration(updatedGeneration);
    res.status(200).json({ success: true });
    return;
  } catch (error) {
    console.error("Error updating generation status:", error);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
}
