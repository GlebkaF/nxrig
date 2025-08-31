import { Metadata } from "next";
import { presets } from "lib/public/presets";
import artists from "data/artists.json";
import Header from "components/Header";
import Footer from "components/Footer";
import Link from "next/link";
import Script from "next/script";
import { ReactElement } from "react";

export const metadata: Metadata = {
  title: "Artist Presets for NUX Mighty Plug Pro & Mighty Space | nxrig",
  description:
    "Browse all artists and download free presets for NUX Mighty Plug Pro and Mighty Space. Recreate tones of Metallica, Nirvana, Radiohead, RHCP, and more.",
  alternates: {
    canonical: "https://nxrig.com/preset",
  },
  openGraph: {
    title: "Artist Presets for NUX Mighty Plug Pro & Mighty Space | nxrig",
    description:
      "Browse all artists and download free presets for NUX Mighty Plug Pro and Mighty Space. Recreate tones of Metallica, Nirvana, Radiohead, RHCP, and more.",
    url: "https://nxrig.com/preset",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

interface ArtistWithPresetCount {
  id: number;
  title: string;
  slug: string;
  description: string;
  presetCount: number;
}

export default function ArtistsPage(): ReactElement {
  // Calculate preset count for each artist
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

  // JSON-LD structured data
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "NUX Artist Presets",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: artistsWithPresetCount.length,
    itemListElement: artistsWithPresetCount.map((artist, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "MusicGroup",
        name: artist.title,
        url: `https://nxrig.com/preset/${artist.slug}`,
      },
    })),
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I install a preset?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Download the .mspatch file or scan the QR. Import it in Mighty Editor (desktop) or MightyAmp (mobile), then save to a slot.",
        },
      },
      {
        "@type": "Question",
        name: "Is it compatible with Mighty Space?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "In most cases yes. Amp/drive settings transfer 1:1; you may tweak output level and reverb/delay mix to taste.",
        },
      },
      {
        "@type": "Question",
        name: "Which pickups do I need?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Presets work with single coils and humbuckers. Artist pages note the expected pickup position; adjust gain/EQ for your guitar.",
        },
      },
      {
        "@type": "Question",
        name: "Are the presets free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Use them, tweak them, and share feedback—credits appreciated but not required.",
        },
      },
      {
        "@type": "Question",
        name: "Can I request a specific song or artist?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely. Use Request Patch and we'll prioritize popular requests.",
        },
      },
    ],
  };

  return (
    <>
      <Script
        id="ld-itemlist"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />
      <Script
        id="ld-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="min-h-screen flex flex-col bg-gray-900 text-white">
        <Header />
        <main className="flex-grow">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-6 text-white">
              NUX Mighty Plug Pro Artist Presets — All Artists
            </h1>

            <p className="mb-4 text-gray-300 leading-relaxed">
              Find artist-inspired guitar tones for{" "}
              <strong>NUX Mighty Plug Pro</strong> and{" "}
              <strong>Mighty Space</strong>. Each preset is crafted to get you
              close to the signature sound—rhythm and lead variants, sensible
              gain levels, IR/cab choices, and effect chains that just work.
            </p>
            <p className="mb-8 text-gray-300 leading-relaxed">
              Open an artist page to see song-by-song patches, quick setup
              notes, and pickup tips. Import via <strong>Mighty Editor</strong>{" "}
              (desktop) or <strong>MightyAmp</strong> (mobile) using a .mspatch
              file or a QR code. All downloads are free.
            </p>

            <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-2 mb-10">
              {artistsWithPresetCount.map((artist) => (
                <li key={artist.id}>
                  <Link
                    href={`/preset/${artist.slug}`}
                    className="text-blue-400 hover:text-blue-300 underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                  >
                    {artist.title} presets ({artist.presetCount})
                  </Link>
                </li>
              ))}
            </ul>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-white">
                Popular right now
              </h2>
              <ul className="list-disc pl-5 space-y-1 text-gray-300">
                <li>
                  <Link
                    href="/preset/metallica"
                    className="text-blue-400 hover:text-blue-300 underline"
                  >
                    Metallica — Master of Puppets (rhythm/lead)
                  </Link>
                </li>
                <li>
                  <Link
                    href="/preset/nirvana"
                    className="text-blue-400 hover:text-blue-300 underline"
                  >
                    Nirvana — Smells Like Teen Spirit
                  </Link>
                </li>
                <li>
                  <Link
                    href="/preset/red-hot-chili-peppers"
                    className="text-blue-400 hover:text-blue-300 underline"
                  >
                    Red Hot Chili Peppers — Californication
                  </Link>
                </li>
                <li>
                  <Link
                    href="/preset/led-zeppelin"
                    className="text-blue-400 hover:text-blue-300 underline"
                  >
                    Led Zeppelin — Whole Lotta Love
                  </Link>
                </li>
                <li>
                  <Link
                    href="/preset/guns-and-roses"
                    className="text-blue-400 hover:text-blue-300 underline"
                  >
                    Guns N&apos; Roses — Sweet Child O&apos; Mine
                  </Link>
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-white">
                New presets
              </h2>
              <p className="text-gray-300">
                Freshly added artist tones for NUX Mighty Plug Pro & Mighty
                Space. Check them out and tell us what to add next.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-white">
                Explore by genre
              </h2>
              <div className="space-y-2 text-gray-300">
                <p>
                  <strong className="text-white">Metal:</strong> tight high-gain
                  rhythms, palm-mutes, modern IRs.
                </p>
                <p>
                  <strong className="text-white">Grunge:</strong> gritty mids,
                  moderate gain, roomy reverbs.
                </p>
                <p>
                  <strong className="text-white">Classic Rock:</strong> crunchy
                  amps, vintage cabs, light drive.
                </p>
                <p>
                  <strong className="text-white">Alternative:</strong>{" "}
                  clean/edge-of-breakup, chorus/mod textures.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-white">
                Request a patch
              </h2>
              <p className="text-gray-300">
                Can&apos;t find the tone you need?{" "}
                <Link
                  href="/order"
                  className="text-blue-400 hover:text-blue-300 underline font-medium"
                >
                  Request a patch
                </Link>{" "}
                — we&apos;ll add it in a few days and email you when it&apos;s
                ready.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-white">FAQ</h2>
              <div className="space-y-4">
                <details className="bg-gray-800 rounded-lg p-4">
                  <summary className="cursor-pointer font-medium text-white hover:text-blue-400">
                    How do I install a preset?
                  </summary>
                  <p className="mt-2 text-gray-300">
                    Download the .mspatch file or scan the QR. Import it in
                    Mighty Editor (desktop) or MightyAmp (mobile), then save to
                    a slot.
                  </p>
                </details>
                <details className="bg-gray-800 rounded-lg p-4">
                  <summary className="cursor-pointer font-medium text-white hover:text-blue-400">
                    Is it compatible with Mighty Space?
                  </summary>
                  <p className="mt-2 text-gray-300">
                    In most cases yes. Amp/drive settings transfer 1:1; you may
                    tweak output level and reverb/delay mix to taste.
                  </p>
                </details>
                <details className="bg-gray-800 rounded-lg p-4">
                  <summary className="cursor-pointer font-medium text-white hover:text-blue-400">
                    Which pickups do I need?
                  </summary>
                  <p className="mt-2 text-gray-300">
                    Presets work with single coils and humbuckers. Artist pages
                    note the expected pickup position; adjust gain/EQ for your
                    guitar.
                  </p>
                </details>
                <details className="bg-gray-800 rounded-lg p-4">
                  <summary className="cursor-pointer font-medium text-white hover:text-blue-400">
                    Are the presets free?
                  </summary>
                  <p className="mt-2 text-gray-300">
                    Yes. Use them, tweak them, and share feedback—credits
                    appreciated but not required.
                  </p>
                </details>
                <details className="bg-gray-800 rounded-lg p-4">
                  <summary className="cursor-pointer font-medium text-white hover:text-blue-400">
                    Can I request a specific song or artist?
                  </summary>
                  <p className="mt-2 text-gray-300">
                    Absolutely. Use Request Patch and we&apos;ll prioritize
                    popular requests.
                  </p>
                </details>
              </div>
            </section>

            <section className="border-t border-gray-700 pt-6 text-sm text-gray-400">
              <p>
                Download free <strong>NUX Mighty Plug Pro</strong> and{" "}
                <strong>Mighty Space</strong> presets inspired by legendary
                artists. Explore metal, grunge, classic rock, and alternative
                sounds — or request a custom patch.
              </p>
            </section>
          </div>
        </main>
        <Footer>
          <div className="container mx-auto px-4">
            <p className="text-gray-300 text-center">
              Download free NUX Mighty Plug Pro presets and recreate the sound
              of your favorite artists.
            </p>
          </div>
        </Footer>
      </div>
    </>
  );
}
