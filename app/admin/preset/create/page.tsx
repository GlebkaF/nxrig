import { Metadata } from "next";
import { generationDb } from "../../../../lib/jsondb";
import { PresetCreateForm } from "../../../../components/PresetCreateForm";
import artistsRaw from "../../../../data/artists.json";

interface PresetCreatePageProps {
  searchParams: {
    generationId?: string;
  };
}

export const metadata: Metadata = {
  title: "Создать пресет | Guitar Chain Generator",
  description: "Создание нового пресета на основе генерации",
};

async function getGenerationData(generationId: string | undefined) {
  if (!generationId) {
    return { generation: null, error: "ID генерации не указан" };
  }

  try {
    const generation = await generationDb.getGenerationById(generationId);
    if (!generation) {
      return { generation: null, error: "Генерация не найдена" };
    }
    return { generation, error: null };
  } catch (error) {
    console.error("Error fetching generation:", error);
    return { generation: null, error: "Ошибка при загрузке генерации" };
  }
}

export default async function PresetCreatePage({
  searchParams,
}: PresetCreatePageProps) {
  const { generation, error } = await getGenerationData(
    searchParams.generationId,
  );

  if (error || !generation) {
    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Ошибка</h1>
            <p className="text-gray-600 mb-8">
              {error || "Генерация не найдена"}
            </p>
            <a
              href="/admin"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              ← Назад к каталогу
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <a
                href="/admin"
                className="inline-flex items-center px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                ← Назад к каталогу
              </a>
              <a
                href={`/admin/generation/${generation.id}`}
                className="inline-flex items-center px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                ← К генерации
              </a>
            </div>
            <h1 className="text-xl font-bold text-gray-900">Создать пресет</h1>
            <div className="text-sm text-gray-500">
              Из генерации {generation.id}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <PresetCreateForm generation={generation} artists={artistsRaw} />
      </main>
    </div>
  );
}
