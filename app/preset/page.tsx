import { Metadata } from "next";
import { presets } from "lib/public/presets";
import artists from "data/artists.json";
import Header from "components/Header";
import Footer from "components/Footer";
import Link from "next/link";
import { ReactElement } from "react";

export const metadata: Metadata = {
  title: "All Artists - Guitar Presets for NUX Mighty Plug Pro & Mighty Space",
  description:
    "Browse all artists with guitar presets for NUX Mighty Plug Pro and Mighty Space. Download free presets from Metallica, AC/DC, Led Zeppelin, Nirvana and more.",
};

interface ArtistWithPresetCount {
  id: number;
  title: string;
  slug: string;
  description: string;
  presetCount: number;
}

export default function ArtistsPage(): ReactElement {
  // Подсчитываем количество пресетов для каждого артиста
  const artistsWithPresetCount: ArtistWithPresetCount[] = artists
    .map((artist) => {
      const presetCount = presets.filter(
        (preset) => preset.origin.artist.slug === artist.slug,
      ).length;

      return {
        ...artist,
        presetCount,
      };
    })
    .filter((artist) => artist.presetCount > 0) // Show only artists with presets
    .sort((a, b) => a.title.localeCompare(b.title)); // Sort alphabetically

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-8 text-white">All Artists</h1>

          <ul className="space-y-2">
            {artistsWithPresetCount.map((artist) => (
              <li key={artist.id}>
                <Link
                  href={`/preset/${artist.slug}`}
                  className="text-blue-400 hover:text-blue-300"
                >
                  {artist.title} ({artist.presetCount})
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer>
        <div className="container mx-auto px-4">
          <p className="text-gray-300 text-center">
            Download free NUX Mighty Plug Pro presets and recreate the sound of
            your favorite artists.
          </p>
        </div>
      </Footer>
    </div>
  );
}
