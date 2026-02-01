"use client";

import { useEffect, useMemo, useState } from "react";

interface RatingSummary {
  average: number;
  count: number;
}

interface RatingEntry {
  rating: number;
  comment: string;
  userName: string;
  createdAt: string;
}

interface PresetRatingsProps {
  presetId: string;
  presetName: string;
  initialSummary: RatingSummary;
}

const MAX_COMMENT_LENGTH = 240;
const USER_STORAGE_KEY = "nxrig-user";

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function PresetRatings({
  presetId,
  presetName,
  initialSummary,
}: PresetRatingsProps) {
  const [summary, setSummary] = useState<RatingSummary>(initialSummary);
  const [entries, setEntries] = useState<RatingEntry[]>([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const presetIdParam = encodeURIComponent(presetId);

  useEffect(() => {
    const saved = window.localStorage.getItem(USER_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as { name: string; email: string };
        setUserName(parsed.name);
        setUserEmail(parsed.email);
        setIsRegistered(true);
      } catch {
        window.localStorage.removeItem(USER_STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    async function loadRatings() {
      try {
        const response = await fetch(`/api/ratings?presetId=${presetIdParam}`);
        if (!response.ok) {
          return;
        }
        const data = (await response.json()) as {
          summary: RatingSummary;
          entries: RatingEntry[];
        };
        setSummary(data.summary);
        setEntries(data.entries);
      } catch {
        setError("Unable to load ratings right now.");
      }
    }

    void loadRatings();
  }, [presetIdParam]);

  const stars = useMemo(() => {
    return Array.from({ length: 5 }, (_, index) => index + 1);
  }, []);

  function handleRegister(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (!userName || !userEmail) {
      setError("Please enter your name and email to continue.");
      return;
    }

    window.localStorage.setItem(
      USER_STORAGE_KEY,
      JSON.stringify({ name: userName, email: userEmail }),
    );
    setIsRegistered(true);
    setSuccess("Thanks! You can now rate presets.");
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/ratings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          presetId: presetIdParam,
          rating,
          comment: comment.trim(),
          userName,
          userEmail,
        }),
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        throw new Error(data.error ?? "Unable to submit rating.");
      }

      const data = (await response.json()) as { summary: RatingSummary };
      setSummary(data.summary);
      setComment("");
      setSuccess("Thanks for your feedback!");

      const refresh = await fetch(`/api/ratings?presetId=${presetIdParam}`);
      if (refresh.ok) {
        const refreshed = (await refresh.json()) as {
          summary: RatingSummary;
          entries: RatingEntry[];
        };
        setEntries(refreshed.entries);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unable to submit rating.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-white/10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-white">
            Ratings & Reviews
          </h2>
          <p className="text-gray-400 text-sm">
            Share your experience with {presetName}.
          </p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-pink-400">
            {summary.count > 0 ? summary.average.toFixed(1) : "—"}
          </div>
          <p className="text-sm text-gray-400">
            {summary.count > 0
              ? `${summary.count.toString()} review${
                  summary.count === 1 ? "" : "s"
                }`
              : "No reviews yet"}
          </p>
        </div>
      </div>

      {!isRegistered ? (
        <form
          onSubmit={(event) => {
            handleRegister(event);
          }}
          className="grid gap-4 md:grid-cols-2"
        >
          <div className="md:col-span-2 text-gray-300">
            Create a free profile to keep ratings spam-free.
          </div>
          <input
            type="text"
            placeholder="Your name"
            value={userName}
            onChange={(event) => {
              setUserName(event.target.value);
            }}
            className="rounded-lg bg-gray-900 border border-white/10 px-4 py-2 text-white"
            required
          />
          <input
            type="email"
            placeholder="Email address"
            value={userEmail}
            onChange={(event) => {
              setUserEmail(event.target.value);
            }}
            className="rounded-lg bg-gray-900 border border-white/10 px-4 py-2 text-white"
            required
          />
          <button
            type="submit"
            className="md:col-span-2 bg-pink-500 hover:bg-pink-600 text-white font-semibold px-4 py-2 rounded-lg"
          >
            Create free account
          </button>
        </form>
      ) : (
        <form
          onSubmit={(event) => {
            void handleSubmit(event);
          }}
          className="space-y-4"
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-gray-300">Your rating:</span>
            <div className="flex items-center gap-1">
              {stars.map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => {
                    setRating(star);
                  }}
                  className={`text-2xl ${
                    rating >= star ? "text-yellow-400" : "text-gray-600"
                  }`}
                  aria-label={`Rate ${star.toString()} star`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          <textarea
            value={comment}
            onChange={(event) => {
              setComment(event.target.value);
            }}
            maxLength={MAX_COMMENT_LENGTH}
            placeholder="Leave a quick note (optional)"
            className="w-full rounded-lg bg-gray-900 border border-white/10 px-4 py-3 text-white min-h-[120px]"
          />
          <div className="text-sm text-gray-500">
            {comment.length}/{MAX_COMMENT_LENGTH.toString()} characters
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-4 py-2 rounded-lg disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit rating"}
          </button>
        </form>
      )}

      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
      {success && <p className="mt-4 text-sm text-green-400">{success}</p>}

      {entries.length > 0 && (
        <div className="mt-8 space-y-4">
          <h3 className="text-lg font-semibold text-white">Latest reviews</h3>
          {entries.map((entry, index) => (
            <div
              key={`${entry.userName}-${entry.createdAt}-${String(index)}`}
              className="bg-gray-900/60 rounded-lg p-4 border border-white/5"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-semibold text-white">
                  {entry.userName}
                </div>
                <div className="text-xs text-gray-500">
                  {formatDate(entry.createdAt)}
                </div>
              </div>
              <div className="text-yellow-400 text-sm mb-2">
                {"★".repeat(entry.rating)}
                <span className="text-gray-600">
                  {"★".repeat(5 - entry.rating)}
                </span>
              </div>
              {entry.comment && (
                <p className="text-gray-300 text-sm">{entry.comment}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
