"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

interface ArtistEntry {
  id: number;
  title: string;
  slug: string;
  description: string;
  presetCount: number;
  genre: string;
  instrument: string;
  difficulty: string;
}

interface ArtistFilterGridProps {
  artists: ArtistEntry[];
}

const difficultyOptions = ["All", "Beginner", "Intermediate", "Advanced"];
const instrumentOptions = ["All", "Guitar", "Bass"];

export function ArtistFilterGrid({ artists }: ArtistFilterGridProps) {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [selectedInstrument, setSelectedInstrument] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");

  const genres = useMemo(() => {
    const set = new Set(artists.map((artist) => artist.genre));
    return ["All", ...Array.from(set).sort()];
  }, [artists]);

  const filteredArtists = useMemo(() => {
    return artists.filter((artist) => {
      if (selectedGenre !== "All" && artist.genre !== selectedGenre) {
        return false;
      }
      if (
        selectedInstrument !== "All" &&
        artist.instrument !== selectedInstrument
      ) {
        return false;
      }
      if (
        selectedDifficulty !== "All" &&
        artist.difficulty !== selectedDifficulty
      ) {
        return false;
      }
      return true;
    });
  }, [artists, selectedGenre, selectedInstrument, selectedDifficulty]);

  return (
    <div>
      <div className="bg-gray-800/60 rounded-lg p-4 mb-8 border border-white/10">
        <h2 className="text-lg font-semibold text-white mb-4">
          Filter presets
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          <label className="flex flex-col text-sm text-gray-300">
            Genre
            <select
              value={selectedGenre}
              onChange={(event) => {
                setSelectedGenre(event.target.value);
              }}
              className="mt-2 rounded-lg bg-gray-900 border border-white/10 px-3 py-2 text-white"
            >
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col text-sm text-gray-300">
            Instrument
            <select
              value={selectedInstrument}
              onChange={(event) => {
                setSelectedInstrument(event.target.value);
              }}
              className="mt-2 rounded-lg bg-gray-900 border border-white/10 px-3 py-2 text-white"
            >
              {instrumentOptions.map((instrument) => (
                <option key={instrument} value={instrument}>
                  {instrument}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col text-sm text-gray-300">
            Difficulty
            <select
              value={selectedDifficulty}
              onChange={(event) => {
                setSelectedDifficulty(event.target.value);
              }}
              className="mt-2 rounded-lg bg-gray-900 border border-white/10 px-3 py-2 text-white"
            >
              {difficultyOptions.map((difficulty) => (
                <option key={difficulty} value={difficulty}>
                  {difficulty}
                </option>
              ))}
            </select>
          </label>
        </div>
        <p className="text-sm text-gray-400 mt-4">
          Showing {filteredArtists.length} of {artists.length} artists.
        </p>
      </div>

      {filteredArtists.length === 0 ? (
        <div className="text-gray-400 mb-10">
          No artists match the selected filters. Try a different combination.
        </div>
      ) : (
        <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {filteredArtists.map((artist) => (
            <li key={artist.id} className="bg-gray-800 rounded-lg p-4">
              <Link href={`/preset/${artist.slug}`} className="block group">
                <h3 className="text-lg font-semibold text-blue-400 group-hover:text-blue-300 mb-1">
                  {artist.title}
                </h3>
                <p className="text-sm text-gray-400 mb-2">{artist.genre}</p>
                <p className="text-sm text-gray-300">
                  {artist.presetCount}{" "}
                  {artist.presetCount === 1 ? "preset" : "presets"}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  {artist.instrument} · {artist.difficulty}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
