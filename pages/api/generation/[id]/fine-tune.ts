import type { NextApiRequest, NextApiResponse } from "next";
import { generationDb, type GenerationRecord } from "../../../../lib/jsondb";
import { createFineTuner } from "../../../../lib/ai-generator/fine-tuner";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GenerationRecord | { error: string }>
): Promise<void> {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const { id } = req.query;
    const { feedback } = req.body as { feedback?: string };

    if (!id || typeof id !== "string") {
      res.status(400).json({ error: "Generation ID is required" });
      return;
    }
    if (!feedback || typeof feedback !== "string") {
      res.status(400).json({ error: "Feedback is required" });
      return;
    }

    const generation = await generationDb.getGenerationById(id);
    if (!generation) {
      res.status(404).json({ error: "Generation not found" });
      return;
    }

    const currentChain =
      generation.versions[generation.versions.length - 1].chain;

    const tuner = await createFineTuner();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newChain = await tuner.refine(currentChain, feedback);

    const newVersion = {
      chain: newChain,
      prompt: feedback,
      timestamp: new Date().toISOString(),
    };

    const versions = [...generation.versions, newVersion];

    const updated: GenerationRecord = {
      ...generation,
      versions,
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    await generationDb.updateGeneration(updated);

    res.status(200).json(updated);
  } catch (error) {
    console.error("Error fine-tuning generation:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
