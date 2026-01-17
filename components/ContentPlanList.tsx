"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ContentPlanTrack {
  artist: string;
  song: string;
  instrument: string;
  part: string;
  songsterrUrl: string;
  trackIndex: number;
}

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

interface ContentPlanListProps {
  initialTracks: ContentPlanTrack[];
}

export function ContentPlanList({
  initialTracks,
}: ContentPlanListProps): React.ReactElement {
  const router = useRouter();
  const [tracks, setTracks] = useState<ContentPlanTrack[]>(initialTracks);
  const [search, setSearch] = useState("");
  const [loadingUrl, setLoadingUrl] = useState<string | null>(null);
  const [deletingUrl, setDeletingUrl] = useState<string | null>(null);
  const [postponingUrl, setPostponingUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Drafts state
  const [drafts, setDrafts] = useState<DraftPreset[]>([]);
  const [draftsLoading, setDraftsLoading] = useState(true);
  const [publishingId, setPublishingId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [lastGenerationUrl, setLastGenerationUrl] = useState<string | null>(
    null,
  );

  // Load drafts on mount
  useEffect(() => {
    void loadDrafts();
  }, []);

  const loadDrafts = async () => {
    try {
      setDraftsLoading(true);
      const response = await fetch("/api/preset/drafts");
      if (!response.ok) throw new Error("Failed to load drafts");
      const data = (await response.json()) as {
        drafts: DraftPreset[];
        count: number;
      };
      setDrafts(data.drafts);
    } catch (err) {
      console.error("Error loading drafts:", err);
    } finally {
      setDraftsLoading(false);
    }
  };

  const handlePublish = async (draft: DraftPreset) => {
    setPublishingId(draft.id);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch("/api/preset/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ presetIds: [draft.id] }),
      });

      if (!response.ok) {
        const errorData = (await response.json()) as { error: string };
        throw new Error(errorData.error || "Failed to publish");
      }

      setSuccessMessage(
        `Published: ${draft.origin.artist.title} - ${draft.origin.song}`,
      );

      // Remove from local state
      setDrafts((prev) => prev.filter((d) => d.id !== draft.id));

      // Refresh router after short delay
      setTimeout(() => {
        router.refresh();
        setSuccessMessage(null);
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Publish failed");
    } finally {
      setPublishingId(null);
    }
  };

  // Round-robin sort: all Track 0 first, then Track 1, etc.
  // Within each trackIndex, preserve original order (already sorted by popularity)
  const sortedTracks = useMemo(() => {
    // Group tracks by song key (artist + song)
    const songOrder: string[] = [];
    const tracksBySong = new Map<string, ContentPlanTrack[]>();

    for (const track of tracks) {
      const key = `${track.artist}|${track.song}`;
      if (!tracksBySong.has(key)) {
        songOrder.push(key);
        tracksBySong.set(key, []);
      }
      const songTracksArr = tracksBySong.get(key);
      if (songTracksArr) {
        songTracksArr.push(track);
      }
    }

    // Find max trackIndex
    let maxTrackIndex = 0;
    for (const songTracks of tracksBySong.values()) {
      for (const track of songTracks) {
        maxTrackIndex = Math.max(maxTrackIndex, track.trackIndex);
      }
    }

    // Build round-robin sorted list
    const result: ContentPlanTrack[] = [];
    for (let idx = 0; idx <= maxTrackIndex; idx++) {
      for (const songKey of songOrder) {
        const songTracks = tracksBySong.get(songKey);
        if (songTracks) {
          const track = songTracks.find((t) => t.trackIndex === idx);
          if (track) {
            result.push(track);
          }
        }
      }
    }

    return result;
  }, [tracks]);

  const filteredTracks = useMemo(() => {
    if (!search.trim()) return sortedTracks;
    const query = search.toLowerCase();
    return sortedTracks.filter(
      (track) =>
        track.artist.toLowerCase().includes(query) ||
        track.song.toLowerCase().includes(query) ||
        track.part.toLowerCase().includes(query),
    );
  }, [sortedTracks, search]);

  const handleGenerate = async (track: ContentPlanTrack) => {
    setLoadingUrl(track.songsterrUrl);
    setError(null);

    // Open new tab immediately (synchronously) to avoid popup blocker
    const newTab = window.open("about:blank", "_blank");

    try {
      // Step 1: Generate prompt from Songsterr URL
      const promptResponse = await fetch("/api/songsterr-to-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ songsterrUrl: track.songsterrUrl }),
      });

      if (!promptResponse.ok) {
        const errorData = (await promptResponse.json()) as { error: string };
        throw new Error(
          errorData.error || `Error: ${promptResponse.statusText}`,
        );
      }

      const promptData = (await promptResponse.json()) as {
        prompt: string;
        metadata: {
          url: string;
          artist: string;
          title: string;
          trackType: string;
          trackName?: string;
          suggestedPart: string;
        };
      };

      // Step 2: Generate chain from prompt
      const chainResponse = await fetch("/api/generate-chain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: promptData.prompt,
          songsterrData: promptData.metadata,
        }),
      });

      if (!chainResponse.ok) {
        const errorData = (await chainResponse.json()) as { error: string };
        throw new Error(
          errorData.error || `Error: ${chainResponse.statusText}`,
        );
      }

      const chainData = (await chainResponse.json()) as {
        generationId: string;
        message: string;
      };

      // Step 3: Delete track from content plan
      await fetch("/api/content-plan/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ songsterrUrl: track.songsterrUrl }),
      });

      // Remove from local state
      setTracks((prev) =>
        prev.filter((t) => t.songsterrUrl !== track.songsterrUrl),
      );

      // Navigate the new tab to the generation page
      const generationUrl = `/admin/generation/${chainData.generationId}`;
      if (newTab) {
        newTab.location.href = generationUrl;
      }

      // Show success message with link
      setSuccessMessage("Generated!");
      setLastGenerationUrl(generationUrl);
      setLoadingUrl(null);
    } catch (err) {
      // Close the blank tab on error
      if (newTab) {
        newTab.close();
      }
      setError(err instanceof Error ? err.message : "Generation failed");
      setLoadingUrl(null);
    }
  };

  const handleDelete = async (track: ContentPlanTrack) => {
    if (!confirm(`Delete "${track.artist} - ${track.song}" (${track.part})?`)) {
      return;
    }

    setDeletingUrl(track.songsterrUrl);
    setError(null);

    try {
      const response = await fetch("/api/content-plan/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ songsterrUrl: track.songsterrUrl }),
      });

      if (!response.ok) {
        const errorData = (await response.json()) as { error: string };
        throw new Error(errorData.error || `Error: ${response.statusText}`);
      }

      // Remove from local state
      setTracks((prev) =>
        prev.filter((t) => t.songsterrUrl !== track.songsterrUrl),
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setDeletingUrl(null);
    }
  };

  const handlePostpone = async (track: ContentPlanTrack) => {
    setPostponingUrl(track.songsterrUrl);
    setError(null);

    try {
      const response = await fetch("/api/content-plan/postpone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          songsterrUrl: track.songsterrUrl,
          positions: 100,
        }),
      });

      if (!response.ok) {
        const errorData = (await response.json()) as { error: string };
        throw new Error(errorData.error || `Error: ${response.statusText}`);
      }

      // Move track in local state
      setTracks((prev) => {
        const currentIndex = prev.findIndex(
          (t) => t.songsterrUrl === track.songsterrUrl,
        );
        if (currentIndex === -1) return prev;

        const newIndex = Math.min(currentIndex + 100, prev.length - 1);
        const newTracks = [...prev];
        const removed = newTracks.splice(currentIndex, 1);
        const movedTrack = removed[0];
        if (movedTrack) {
          newTracks.splice(newIndex, 0, movedTrack);
        }
        return newTracks;
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Postpone failed");
    } finally {
      setPostponingUrl(null);
    }
  };

  return (
    <div>
      {/* Success message */}
      {successMessage && (
        <div className="mb-4 p-4 bg-green-900/50 border border-green-700 rounded-lg text-green-300 flex items-center gap-4">
          <span>{successMessage}</span>
          {lastGenerationUrl && (
            <a
              href={lastGenerationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 bg-green-600 hover:bg-green-500 text-white rounded transition-colors"
            >
              Open Generation →
            </a>
          )}
          <button
            onClick={() => {
              setSuccessMessage(null);
              setLastGenerationUrl(null);
            }}
            className="ml-auto text-green-400 hover:text-green-200"
          >
            ✕
          </button>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mb-4 p-4 bg-red-900/50 border border-red-700 rounded-lg text-red-300">
          {error}
        </div>
      )}

      {/* Drafts Section */}
      {drafts.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">
            Drafts ({drafts.length})
          </h2>
          <div className="space-y-2">
            {drafts.map((draft) => (
              <div
                key={draft.id}
                className="flex items-center justify-between bg-purple-900/30 border border-purple-700/50 p-4 rounded-lg"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-medium text-white">
                      {draft.origin.artist.title}
                    </span>
                    <span className="text-gray-400">—</span>
                    <span className="text-gray-200">{draft.origin.song}</span>
                    <span className="text-sm text-gray-400">
                      ({draft.origin.part})
                    </span>
                    <span className="text-xs text-purple-400 px-2 py-0.5 bg-purple-900/50 rounded">
                      {draft.pickup.type} • {draft.pickup.position}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Created: {new Date(draft.updatedAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Link
                    href={`/admin/generation/${draft.id}`}
                    className="px-3 py-1.5 bg-gray-600 hover:bg-gray-500 text-white text-sm rounded transition-colors"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => {
                      void handlePublish(draft);
                    }}
                    disabled={publishingId === draft.id}
                    className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-sm rounded transition-colors flex items-center gap-1"
                  >
                    {publishingId === draft.id ? (
                      <>
                        <svg
                          className="animate-spin h-4 w-4"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Publishing...
                      </>
                    ) : (
                      "Publish"
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {draftsLoading && (
        <div className="mb-8 text-gray-400">Loading drafts...</div>
      )}

      {/* Content Plan Section */}
      <h2 className="text-xl font-semibold text-white mb-4">
        Content Plan ({filteredTracks.length})
      </h2>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder="Search by artist, song, or part..."
          className="w-full max-w-md px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {search && (
          <p className="text-gray-400 text-sm mt-2">
            Found {filteredTracks.length} tracks
          </p>
        )}
      </div>

      {/* Tracks list - round-robin sorted */}
      <div className="space-y-2">
        {filteredTracks.map((track, index) => (
          <div
            key={track.songsterrUrl}
            className="flex items-center justify-between bg-gray-800 p-4 rounded-lg hover:bg-gray-750 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-xs text-gray-500 font-mono">
                  #{index + 1}
                </span>
                <span className="font-medium text-white">{track.artist}</span>
                <span className="text-gray-400">—</span>
                <span className="text-gray-200">{track.song}</span>
                <span className="text-sm text-gray-400">({track.part})</span>
                <span className="text-xs text-gray-500 px-2 py-0.5 bg-gray-700 rounded">
                  Track #{track.trackIndex}
                </span>
              </div>
              <a
                href={track.songsterrUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-400 hover:underline truncate block mt-1"
              >
                {track.songsterrUrl}
              </a>
            </div>
            <div className="flex items-center gap-2 ml-4">
              <button
                onClick={() => {
                  void handleGenerate(track);
                }}
                disabled={
                  loadingUrl === track.songsterrUrl ||
                  deletingUrl === track.songsterrUrl ||
                  postponingUrl === track.songsterrUrl
                }
                className="px-3 py-1.5 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-sm rounded transition-colors flex items-center gap-1"
              >
                {loadingUrl === track.songsterrUrl ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Generating...
                  </>
                ) : (
                  "Generate"
                )}
              </button>
              <button
                onClick={() => {
                  void handlePostpone(track);
                }}
                disabled={
                  loadingUrl === track.songsterrUrl ||
                  deletingUrl === track.songsterrUrl ||
                  postponingUrl === track.songsterrUrl
                }
                className="px-3 py-1.5 bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-sm rounded transition-colors"
              >
                {postponingUrl === track.songsterrUrl ? "..." : "Skip"}
              </button>
              <button
                onClick={() => {
                  void handleDelete(track);
                }}
                disabled={
                  loadingUrl === track.songsterrUrl ||
                  deletingUrl === track.songsterrUrl ||
                  postponingUrl === track.songsterrUrl
                }
                className="px-3 py-1.5 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-sm rounded transition-colors"
              >
                {deletingUrl === track.songsterrUrl ? "..." : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredTracks.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          {search
            ? "No tracks found matching your search"
            : "No tracks in content plan"}
        </div>
      )}
    </div>
  );
}
