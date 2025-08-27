import { Metadata } from "next";
import { generationDb, type GenerationRecord } from "../../../../lib/jsondb";
import { GenerationViewer } from "../../../../components/GenerationViewer";

interface GenerationPageProps {
  params: {
    id: string;
  };
}

// Исключаем этот API роут из статической генерации
export function generateStaticParams() {
  return [{ id: "this-is-a-dummy-id-for-static-build" }];
}

export async function generateMetadata({
  params,
}: GenerationPageProps): Promise<Metadata> {
  const generation = await generationDb.getGenerationById(params.id);

  if (!generation) {
    return {
      title: "Генерация не найдена",
      description: "Запрошенная генерация не существует",
    };
  }

  return {
    title: `Генерация ${generation.id} | Guitar Chain Generator`,
    description: `Генерация гитарной цепочки: ${generation.proDescription.genre} - ${generation.proDescription.sound_description}`,
  };
}

async function getGeneration(
  id: string,
): Promise<{ generation: GenerationRecord | null; error?: string }> {
  if (!id) {
    return {
      generation: null,
      error: "Invalid generation ID",
    };
  }

  try {
    const generation = await generationDb.getGenerationById(id);

    if (!generation) {
      return {
        generation: null,
        error: "Generation not found",
      };
    }

    return {
      generation: JSON.parse(JSON.stringify(generation)) as GenerationRecord,
    };
  } catch (error) {
    console.error("Error fetching generation:", error);
    return {
      generation: null,
      error: "Internal server error",
    };
  }
}

export default async function GenerationPage({ params }: GenerationPageProps) {
  const { generation, error } = await getGeneration(params.id);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <GenerationViewer generation={generation} error={error} />;
}
