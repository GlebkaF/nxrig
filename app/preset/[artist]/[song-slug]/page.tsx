import { Metadata } from "next";
import { PresetDetails } from "components/PresetDetails";
import { RelatedPresets } from "components/RelatedPresets";
import { Preset } from "lib/public/interface";
import { presets } from "lib/public/presets";
import Header from "components/Header";
import Footer from "components/Footer";
import { createPresetLink } from "lib/utils/urls";
import { createSeoMetadata, SITE_NAME, SITE_URL } from "lib/seo";
import { findPresetByRoute } from "lib/public/find-preset";
import { notFound } from "next/navigation";
import JsonLd from "components/JsonLd";
import Link from "next/link";

interface PresetPageProps {
  params: {
    artist: string;
    "song-slug": string;
  };
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PresetPageProps): Promise<Metadata> {
  const preset = findPresetByRoute(presets, params.artist, params["song-slug"]);

  if (!preset) {
    return {
      title: "Preset Not Found",
      description: "The requested preset could not be found.",
      robots: { index: false, follow: false },
    };
  }

  const title = `${preset.origin.song} ${preset.origin.part} – ${preset.origin.artist.title} | NXRIG`;
  const description = `Download a free ${preset.origin.song} ${preset.origin.part} guitar preset inspired by ${preset.origin.artist.title} for NUX Mighty Plug Pro and Mighty Space.`;
  const imageUrl = preset.origin.imageUrl ?? "/images/cover/default-cover.webp";
  const imageUrlWithProtocol = imageUrl.startsWith("http")
    ? imageUrl
    : `https://nxrig.com${imageUrl}`;

  const baseMetadata = createSeoMetadata({
    title,
    description,
    path: createPresetLink(preset),
    type: "article",
    image: imageUrlWithProtocol,
  });

  return {
    ...baseMetadata,
    authors: [{ name: "NUX Must Have" }],
    category: "Guitar Presets",
    keywords: [
      preset.origin.artist.title,
      "Guitar Tone",
      "NUX Mighty Plug Pro",
      "NUX mp3",
      "NUX Mighty Space",
      "Guitar Preset",
      "NUX Mighty Devices",
    ],
    openGraph: {
      ...baseMetadata.openGraph,
      type: "article",
      publishedTime: preset.createdAt ?? preset.updatedAt,
      modifiedTime: preset.updatedAt,
      authors: [SITE_NAME],
    },
  };
}

export async function generateStaticParams() {
  return presets.map((preset) => ({
    artist: preset.origin.artist.slug,
    "song-slug": preset.slug,
  }));
}

async function getPreset(
  artistSlug: string,
  slug: string,
): Promise<Preset | null> {
  const preset = findPresetByRoute(presets, artistSlug, slug);
  return preset || null;
}

export default async function PresetPage({ params }: PresetPageProps) {
  const preset = await getPreset(params.artist, params["song-slug"]);

  if (!preset) {
    notFound();
  }

  const presetPath = createPresetLink(preset);
  const presetUrl = new URL(presetPath, SITE_URL).toString();
  const artistPath = `/preset/${preset.origin.artist.slug}/`;
  const artistUrl = new URL(artistPath, SITE_URL).toString();
  const imageUrl = new URL(
    preset.origin.imageUrl ?? "/images/cover/default-cover.webp",
    SITE_URL,
  ).toString();
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
          name: preset.origin.artist.title,
          item: artistUrl,
        },
        {
          "@type": "ListItem",
          position: 4,
          name: `${preset.origin.song} – ${preset.origin.part}`,
          item: presetUrl,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      additionalType: "https://schema.org/DigitalDocument",
      name: `${preset.origin.song} ${preset.origin.part} guitar preset`,
      description: preset.description,
      url: presetUrl,
      image: imageUrl,
      isAccessibleForFree: true,
      inLanguage: "en",
      dateCreated: preset.createdAt ?? preset.updatedAt,
      dateModified: preset.updatedAt,
      author: {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
      },
      about: {
        "@type": "MusicRecording",
        name: preset.origin.song,
        byArtist: {
          "@type": "MusicGroup",
          name: preset.origin.artist.title,
        },
      },
      keywords: [
        preset.origin.artist.title,
        preset.origin.song,
        preset.origin.part,
        "NUX Mighty Plug Pro",
        "NUX Mighty Space",
        "guitar preset",
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <JsonLd data={structuredData} />
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto pb-12 px-4 py-8">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-400">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-pink-400">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/preset/" className="hover:text-pink-400">
                  Presets
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href={artistPath} className="hover:text-pink-400">
                  {preset.origin.artist.title}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-gray-200">
                {preset.origin.song} – {preset.origin.part}
              </li>
            </ol>
          </nav>
          <PresetDetails preset={preset} />
          <RelatedPresets
            title={`More presets by ${preset.origin.artist.title}`}
            presets={presets.filter(
              (p) => p.origin.artist.slug === preset.origin.artist.slug,
            )}
            currentPresetId={preset.id}
          />
        </div>
      </main>
      <Footer>
        <div className="container mx-auto">
          <p className="text-gray-300">
            This patch for {preset.origin.song} {preset.origin.part} by{" "}
            {preset.origin.artist.title} is designed for the NUX Mighty Plug
            Pro. It recreates the original tone with authentic dynamics, perfect
            for practicing the song or performing live. Download the patch, load
            it into your device, and play with the legendary{" "}
            {preset.origin.artist.title} sound.
          </p>
        </div>
      </Footer>
    </div>
  );
}
