import { Metadata } from "next";
import { presets } from "lib/public/presets";
import { ArtistPresets } from "components/ArtistPresets";

import Header from "components/Header";
import Footer from "components/Footer";
import { ReactElement } from "react";

// TODO: add seo description for artist page

interface ArtistPageProps {
  params: {
    artist: string;
  };
}

export async function generateMetadata({
  params,
}: ArtistPageProps): Promise<Metadata> {
  const artistName = params.artist.replace(/-/g, " ").toUpperCase();

  return {
    title: `${artistName} - Guitar Presets for NUX Mighty Plug Pro & Mighty Space`,
    description: `Download free NUX Mighty Plug Pro and Mighty Space presets for ${artistName}. Each preset is carefully crafted to match the original guitar tones and fully compatible with both devices.`,
  };
}

export async function generateStaticParams(): Promise<{ artist: string }[]> {
  const artistSet = new Set(presets.map((preset) => preset.origin.artist.slug));
  return Array.from(artistSet).map((artist) => ({
    artist,
  }));
}

export default function ArtistPage({ params }: ArtistPageProps): ReactElement {
  const artistSlug = params.artist;
  const artistName = artistSlug.replace(/-/g, " ").toUpperCase();

  const artistPresets = presets.filter(
    (preset) => preset.origin.artist.slug === artistSlug
  );

  if (artistPresets.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-900 text-white">
        <Header />
        <main className="flex-grow">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-4 text-white">
              Artist Not Found
            </h1>
            <p className="text-gray-400">
              Unfortunately, there are no presets available for this artist.
            </p>
          </div>
        </main>
        <Footer>
          <div className="container mx-auto">
            <p className="text-gray-300">
              Browse our collection of guitar presets for other artists.
            </p>
          </div>
        </Footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header />
      <main className="flex-grow">
        <ArtistPresets artist={artistName} presets={artistPresets} />
      </main>
      <Footer>
        <div className="container mx-auto px-4">
          <p className="text-gray-300">
            Download free NUX Mighty Plug Pro presets for {artistName}. Each
            preset is carefully crafted to match the original guitar tones.
          </p>
        </div>
      </Footer>
    </div>
  );
}
