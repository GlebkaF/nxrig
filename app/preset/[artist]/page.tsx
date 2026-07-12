import { Metadata } from "next";
import { presets } from "lib/public/presets";
import { ArtistPresets } from "components/ArtistPresets";

import Header from "components/Header";
import Footer from "components/Footer";
import { ReactElement } from "react";
import { createSeoMetadata, SITE_URL } from "lib/seo";
import { createPresetLink } from "lib/utils/urls";
import { notFound } from "next/navigation";
import JsonLd from "components/JsonLd";

// TODO: add seo description for artist page

interface ArtistPageProps {
  params: {
    artist: string;
  };
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: ArtistPageProps): Promise<Metadata> {
  const artistSlug = params.artist;
  const artistName = artistSlug.replace(/-/g, " ").toUpperCase();

  // Находим пресеты артиста для получения его описания
  const artistPresets = presets.filter(
    (preset) => preset.origin.artist.slug === artistSlug,
  );

  const firstPreset = artistPresets[0];
  const displayName = firstPreset?.origin.artist.title ?? artistName;
  const artistDescription = `Download free ${displayName} guitar presets for NUX Mighty Plug Pro and Mighty Space. Browse song tones, patch settings, QR codes, and downloads.`;

  return createSeoMetadata({
    title: `${displayName} Guitar Presets for NUX Mighty | NXRIG`,
    description: artistDescription,
    path: `/preset/${artistSlug}/`,
  });
}

export async function generateStaticParams(): Promise<{ artist: string }[]> {
  const artistSet = new Set(presets.map((preset) => preset.origin.artist.slug));
  return Array.from(artistSet).map((artist) => ({
    artist,
  }));
}

export default function ArtistPage({ params }: ArtistPageProps): ReactElement {
  const artistSlug = params.artist;

  const artistPresets = presets
    .filter((preset) => preset.origin.artist.slug === artistSlug)
    .sort((a, b) => a.origin.song.localeCompare(b.origin.song));

  const firstPreset = artistPresets[0];
  if (!firstPreset) {
    notFound();
  }

  const displayName = firstPreset.origin.artist.title;
  const artistDescription = firstPreset.origin.artist.description;
  const artistUrl = `${SITE_URL}/preset/${artistSlug}/`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${SITE_URL}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Guitar presets",
          item: `${SITE_URL}/preset/`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: displayName,
          item: artistUrl,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: `${displayName} guitar presets for NUX Mighty`,
      description: artistDescription,
      url: artistUrl,
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: artistPresets.length,
        itemListElement: artistPresets.map((preset, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: `${preset.origin.song} – ${preset.origin.part}`,
          url: new URL(createPresetLink(preset), SITE_URL).toString(),
        })),
      },
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <JsonLd data={structuredData} />
      <Header />
      <main className="flex-grow">
        <ArtistPresets
          artist={displayName}
          presets={artistPresets}
          description={artistDescription}
        />
      </main>
      <Footer>
        <div className="container mx-auto px-4">
          <p className="text-gray-300">
            Download free NUX Mighty Plug Pro presets for {displayName}. Each
            preset is carefully crafted to match the original guitar tones.
          </p>
        </div>
      </Footer>
    </div>
  );
}
