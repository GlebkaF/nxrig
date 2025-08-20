import { NextResponse } from "next/server";
import { generationDb, type GenerationRecord } from "../../../../../lib/jsondb";
import { createFineTuner } from "../../../../../lib/ai-generator/fine-tuner";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse<GenerationRecord | { error: string }>> {
  try {
    const { id } = params;
    const { feedback } = (await request.json()) as { feedback?: string };

    if (!id) {
      return NextResponse.json(
        { error: "Generation ID is required" },
        { status: 400 }
      );
    }
    if (!feedback || typeof feedback !== "string") {
      return NextResponse.json(
        { error: "Feedback is required" },
        { status: 400 }
      );
    }

    const generation = await generationDb.getGenerationById(id);
    if (!generation) {
      return NextResponse.json(
        { error: "Generation not found" },
        { status: 404 }
      );
    }

    const latestVersion = generation.versions[generation.versions.length - 1];
    if (!latestVersion) {
      return NextResponse.json({ error: "No versions found" }, { status: 400 });
    }
    const currentChain = latestVersion.chain;

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

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error fine-tuning generation:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
