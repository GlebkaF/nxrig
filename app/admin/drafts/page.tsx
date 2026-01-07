"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface DraftPreset {
  id: string;
  origin: {
    artist: {
      id: number;
      title: string;
      slug: string;
    };
    song: string;
    part: string;
    imageUrl: string | null;
  };
  description: string;
  pickup: {
    type: string;
    tone: number;
    position: string;
  };
  slug: string;
  updatedAt: string;
}

export default function AdminDraftsPage() {
  const router = useRouter();
  const [drafts, setDrafts] = useState<DraftPreset[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [isPublishing, setIsPublishing] = useState(false);
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  // Загрузка драфтов
  useEffect(() => {
    void loadDrafts();
  }, []);

  const loadDrafts = async () => {
    try {
      setIsLoading(true);
      setError("");
      const response = await fetch("/api/preset/drafts");

      if (!response.ok) {
        throw new Error("Failed to load drafts");
      }

      const data = (await response.json()) as {
        drafts: DraftPreset[];
        count: number;
      };
      setDrafts(data.drafts);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  // Публикация выбранных драфтов
  const publishSelected = async () => {
    if (selectedIds.size === 0) {
      setError("Please select at least one draft to publish");
      return;
    }

    try {
      setIsPublishing(true);
      setError("");
      setSuccessMessage("");

      const response = await fetch("/api/preset/publish", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          presetIds: Array.from(selectedIds),
        }),
      });

      if (!response.ok) {
        const errorData = (await response.json()) as { error: string };
        throw new Error(errorData.error || "Failed to publish drafts");
      }

      const result = (await response.json()) as {
        published: Array<{ id: string; slug: string }>;
        message: string;
      };

      setSuccessMessage(
        `Successfully published ${String(result.published.length)} preset(s)`,
      );
      setSelectedIds(new Set());

      // Перезагружаем список драфтов
      await loadDrafts();

      // Обновляем страницу через некоторое время
      setTimeout(() => {
        router.refresh();
      }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsPublishing(false);
    }
  };

  // Публикация следующих 2
  const publishNext2 = async () => {
    if (drafts.length === 0) {
      setError("No drafts available");
      return;
    }

    const next2Ids = drafts.slice(0, 2).map((d) => d.id);
    setSelectedIds(new Set(next2Ids));

    // Небольшая задержка для визуализации выбора
    setTimeout(() => {
      void publishSelected();
    }, 300);
  };

  // Переключение выбора
  const toggleSelection = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  // Выбрать все
  const selectAll = () => {
    if (selectedIds.size === drafts.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(drafts.map((d) => d.id)));
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold text-gray-900">Draft Presets</h1>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 py-8">
          <p className="text-gray-600">Loading drafts...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/admin"
                className="inline-flex items-center px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                ← Back to Admin
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">
                Draft Presets ({drafts.length})
              </h1>
            </div>
            <div className="flex gap-2">
              {drafts.length >= 2 && (
                <button
                  onClick={() => {
                    void publishNext2();
                  }}
                  disabled={isPublishing}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Publish Next 2
                </button>
              )}
              <button
                onClick={() => {
                  void publishSelected();
                }}
                disabled={selectedIds.size === 0 || isPublishing}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Publish Selected ({selectedIds.size})
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Сообщения */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {successMessage && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-green-600">{successMessage}</p>
          </div>
        )}

        {drafts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <p className="text-gray-600 mb-4">No draft presets found</p>
            <Link
              href="/admin/generator"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create New Generation
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Таблица */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={selectedIds.size === drafts.length}
                        onChange={selectAll}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                      Artist
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                      Song - Part
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                      Pickup
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                      Created
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {drafts.map((draft) => (
                    <tr
                      key={draft.id}
                      className={`hover:bg-gray-50 ${
                        selectedIds.has(draft.id) ? "bg-blue-50" : ""
                      }`}
                    >
                      <td className="px-4 py-4">
                        <input
                          type="checkbox"
                          checked={selectedIds.has(draft.id)}
                          onChange={() => {
                            toggleSelection(draft.id);
                          }}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-4 py-4 text-sm font-medium text-gray-900">
                        {draft.origin.artist.title}
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm text-gray-900">
                          {draft.origin.song}
                        </div>
                        <div className="text-xs text-gray-500">
                          {draft.origin.part}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">
                        {draft.pickup.type} ({draft.pickup.tone}) -{" "}
                        {draft.pickup.position}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">
                        {new Date(draft.updatedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex gap-2">
                          <Link
                            href={`/admin/generation/${draft.id}`}
                            className="text-sm text-blue-600 hover:text-blue-800"
                          >
                            View Generation
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
