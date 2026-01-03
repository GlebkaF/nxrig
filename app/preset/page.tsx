import { Metadata } from "next";
import { presets } from "lib/public/presets";
import artists from "data/artists.json";
import Header from "components/Header";
import Footer from "components/Footer";
import Link from "next/link";
import Script from "next/script";
import { ReactElement } from "react";

export const metadata: Metadata = {
  title:
    "Free NUX Mighty Plug Pro Presets - 40+ Artists | Metallica, Nirvana, RHCP | nxrig",
  description:
    "Download 75+ free guitar presets for NUX Mighty Plug Pro & Mighty Space. 40+ artists including Metallica, Nirvana, Led Zeppelin, RHCP, Pink Floyd, and more. Easy .mspatch import.",
  alternates: {
    canonical: "https://nxrig.com/preset",
  },
  openGraph: {
    title:
      "Free NUX Mighty Plug Pro Presets - 40+ Artists | Metallica, Nirvana, RHCP | nxrig",
    description:
      "Download 75+ free guitar presets for NUX Mighty Plug Pro & Mighty Space. 40+ artists including Metallica, Nirvana, Led Zeppelin, RHCP, Pink Floyd, and more. Easy .mspatch import.",
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

// Genre mapping for artists
const artistGenres: Record<string, string> = {
  "ac-dc": "Hard Rock",
  "bullet-for-my-valentine": "Metalcore",
  "deep-purple": "Hard Rock",
  "enter-shikari": "Post-Hardcore",
  "guns-and-roses": "Hard Rock",
  "jimi-hendrix": "Psychedelic Rock",
  "led-zeppelin": "Hard Rock",
  "limp-bizkit": "Nu Metal",
  "lynyrd-skynyrd": "Southern Rock",
  metallica: "Thrash Metal",
  nirvana: "Grunge",
  "ozzy-osborn": "Heavy Metal",
  pantera: "Groove Metal",
  "red-hot-chili-peppers": "Alternative Rock",
  slipknot: "Nu Metal",
  rammstein: "Industrial Metal",
  radiohead: "Alternative Rock",
  aria: "Heavy Metal",
  rem: "Alternative Rock",
  "ten-years-after": "Blues Rock",
  "pink-floyd": "Progressive Rock",
  toto: "Rock/Pop",
  "gary-moore": "Blues Rock",
  blur: "Britpop",
  "blue-oyster-cult": "Hard Rock",
  muse: "Alternative Rock",
  hatebreed: "Hardcore/Metalcore",
  "iron-maiden": "Heavy Metal",
  "black-sabbath": "Heavy Metal",
  "the-eagles": "Classic Rock",
  "the-cranberries": "Alternative Rock",
  "arctic-monkeys": "Indie Rock",
  "the-beatles": "Rock/Pop",
  "chuck-berry": "Rock and Roll",
  queen: "Rock",
  slayer: "Thrash Metal",
  "john-frusciante": "Alternative Rock",
  "bobby-helms": "Rockabilly",
  "elvis-presley": "Rock and Roll",
  amatory: "Metalcore",
  "george-michael": "Pop",
  "carlos-santana": "Latin Rock",
};

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
  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://nxrig.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Artist Presets",
        item: "https://nxrig.com/preset",
      },
    ],
  };

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "NUX Artist Presets",
    description:
      "Free guitar presets for NUX Mighty Plug Pro and Mighty Space covering 40+ artists across metal, grunge, classic rock, and alternative genres",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: artistsWithPresetCount.length,
    itemListElement: artistsWithPresetCount.map((artist, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "MusicGroup",
        name: artist.title,
        description: artist.description,
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
      {
        "@type": "Question",
        name: "What is the difference between Mighty Plug Pro and Mighty Space?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Mighty Plug Pro is a portable headphone amp, while Mighty Space is a desktop amp with speaker output. Both share the same amp models and effects, so presets work on both devices with minimal adjustments.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need additional software to use presets?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. You only need the official NUX app: Mighty Editor for desktop (Windows/Mac) or MightyAmp for mobile (iOS/Android). Both are free downloads from NUX.",
        },
      },
      {
        "@type": "Question",
        name: "How often are new presets added?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We add new presets regularly, typically 5-10 per month based on user requests and popular artists. Follow our updates or subscribe to notifications for new releases.",
        },
      },
      {
        "@type": "Question",
        name: "Can I modify presets after downloading?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely! All presets are fully editable. Use them as starting points and adjust any parameter to match your guitar, playing style, or personal taste. We encourage experimentation.",
        },
      },
      {
        "@type": "Question",
        name: "What if the preset doesn't sound right on my guitar?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Guitar tone varies with pickups, wood, and setup. Start by adjusting gain and output level, then tweak EQ (bass/mid/treble). Artist pages include pickup recommendations and adjustment tips.",
        },
      },
    ],
  };

  return (
    <>
      <Script
        id="ld-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }}
      />
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
            <p className="mb-4 text-gray-300 leading-relaxed">
              Open an artist page to see song-by-song patches, quick setup
              notes, and pickup tips. Import via <strong>Mighty Editor</strong>{" "}
              (desktop) or <strong>MightyAmp</strong> (mobile) using a .mspatch
              file or a QR code. All downloads are free.
            </p>
            <p className="mb-4 text-gray-300 leading-relaxed">
              Our collection features <strong>75+ presets</strong> covering{" "}
              <strong>40+ legendary artists</strong> across metal, grunge,
              classic rock, and alternative genres. Each preset is compatible
              with both <strong>NUX Mighty Plug Pro</strong> and{" "}
              <strong>Mighty Space</strong>—amp and drive settings transfer
              perfectly, though you may want to adjust output level and
              reverb/delay mix to suit your device.
            </p>
            <p className="mb-8 text-gray-300 leading-relaxed">
              Import is simple: download the <strong>.mspatch file</strong> and
              load it in Mighty Editor (desktop) or MightyAmp (mobile app), or
              scan the <strong>QR code</strong> directly from your phone. No
              additional software required—just your NUX device and the official
              app.
            </p>

            <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
              {artistsWithPresetCount.map((artist) => {
                const genre = artistGenres[artist.slug] || "Rock";
                return (
                  <li key={artist.id} className="bg-gray-800 rounded-lg p-4">
                    <Link
                      href={`/preset/${artist.slug}`}
                      className="block group"
                    >
                      <h3 className="text-lg font-semibold text-blue-400 group-hover:text-blue-300 mb-1">
                        {artist.title}
                      </h3>
                      <p className="text-sm text-gray-400 mb-2">{genre}</p>
                      <p className="text-sm text-gray-300">
                        {artist.presetCount}{" "}
                        {artist.presetCount === 1 ? "preset" : "presets"}
                      </p>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-white">
                How to use presets
              </h2>
              <div className="bg-gray-800 rounded-lg p-6 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    1. Download the preset
                  </h3>
                  <p className="text-gray-300">
                    Click on any artist above, choose a song, and download the
                    .mspatch file or scan the QR code with your mobile device.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    2. Import to your device
                  </h3>
                  <p className="text-gray-300">
                    Open <strong>Mighty Editor</strong> (desktop) or{" "}
                    <strong>MightyAmp</strong> (mobile app), connect your NUX
                    device, and import the .mspatch file. For QR codes, scan
                    directly in the mobile app.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    3. Save to a slot
                  </h3>
                  <p className="text-gray-300">
                    Once imported, save the preset to any available slot on your
                    Mighty Plug Pro or Mighty Space. You can store up to 7
                    presets at a time.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    4. Adjust for your guitar
                  </h3>
                  <p className="text-gray-300">
                    Every guitar sounds different. Start with the preset as-is,
                    then tweak gain, EQ, and output level to match your pickups
                    and playing style. Artist pages include pickup
                    recommendations.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    5. Backup your presets
                  </h3>
                  <p className="text-gray-300">
                    Use Mighty Editor to export and backup your modified
                    presets. This way you can experiment freely and restore
                    originals anytime.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-white">
                Popular right now
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-gray-800 rounded-lg p-4">
                  <Link
                    href="/preset/metallica"
                    className="text-blue-400 hover:text-blue-300 font-semibold"
                  >
                    Metallica — Master of Puppets
                  </Link>
                  <p className="text-sm text-gray-300 mt-1">
                    Thrash metal classic with tight rhythm and aggressive lead
                    tones
                  </p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <Link
                    href="/preset/nirvana"
                    className="text-blue-400 hover:text-blue-300 font-semibold"
                  >
                    Nirvana — Smells Like Teen Spirit
                  </Link>
                  <p className="text-sm text-gray-300 mt-1">
                    Iconic grunge tone with dynamic clean-to-distortion
                    transitions
                  </p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <Link
                    href="/preset/red-hot-chili-peppers"
                    className="text-blue-400 hover:text-blue-300 font-semibold"
                  >
                    Red Hot Chili Peppers — Californication
                  </Link>
                  <p className="text-sm text-gray-300 mt-1">
                    Smooth alternative rock with warm overdrive and subtle
                    chorus
                  </p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <Link
                    href="/preset/led-zeppelin"
                    className="text-blue-400 hover:text-blue-300 font-semibold"
                  >
                    Led Zeppelin — Whole Lotta Love
                  </Link>
                  <p className="text-sm text-gray-300 mt-1">
                    Classic hard rock with vintage crunch and powerful mids
                  </p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <Link
                    href="/preset/guns-and-roses"
                    className="text-blue-400 hover:text-blue-300 font-semibold"
                  >
                    Guns N&apos; Roses — Sweet Child O&apos; Mine
                  </Link>
                  <p className="text-sm text-gray-300 mt-1">
                    Legendary hard rock tone with singing sustain and clarity
                  </p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <Link
                    href="/preset/pink-floyd"
                    className="text-blue-400 hover:text-blue-300 font-semibold"
                  >
                    Pink Floyd — Comfortably Numb
                  </Link>
                  <p className="text-sm text-gray-300 mt-1">
                    Atmospheric lead tone with rich delay and smooth sustain
                  </p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <Link
                    href="/preset/iron-maiden"
                    className="text-blue-400 hover:text-blue-300 font-semibold"
                  >
                    Iron Maiden — The Trooper
                  </Link>
                  <p className="text-sm text-gray-300 mt-1">
                    Galloping metal riffs with dual guitar harmonies
                  </p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <Link
                    href="/preset/ac-dc"
                    className="text-blue-400 hover:text-blue-300 font-semibold"
                  >
                    AC/DC — Back in Black
                  </Link>
                  <p className="text-sm text-gray-300 mt-1">
                    Punchy hard rock rhythm with tight low-end and bite
                  </p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <Link
                    href="/preset/radiohead"
                    className="text-blue-400 hover:text-blue-300 font-semibold"
                  >
                    Radiohead — Creep
                  </Link>
                  <p className="text-sm text-gray-300 mt-1">
                    Dynamic alternative tone from clean jangle to explosive
                    chorus
                  </p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <Link
                    href="/preset/black-sabbath"
                    className="text-blue-400 hover:text-blue-300 font-semibold"
                  >
                    Black Sabbath — Paranoid
                  </Link>
                  <p className="text-sm text-gray-300 mt-1">
                    Dark, heavy metal tone that defined the genre
                  </p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <Link
                    href="/preset/jimi-hendrix"
                    className="text-blue-400 hover:text-blue-300 font-semibold"
                  >
                    Jimi Hendrix — Purple Haze
                  </Link>
                  <p className="text-sm text-gray-300 mt-1">
                    Psychedelic rock with fuzz and expressive wah tones
                  </p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <Link
                    href="/preset/queen"
                    className="text-blue-400 hover:text-blue-300 font-semibold"
                  >
                    Queen — Bohemian Rhapsody
                  </Link>
                  <p className="text-sm text-gray-300 mt-1">
                    Versatile rock tone for epic multi-layered arrangements
                  </p>
                </div>
              </div>
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
              <div className="space-y-4">
                <div className="bg-gray-800 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Metal (20+ presets)
                  </h3>
                  <p className="text-gray-300 mb-2">
                    Tight high-gain rhythms, palm-mutes, modern IRs. Perfect for
                    heavy riffs and aggressive solos. Works best with humbuckers
                    and high-output pickups.
                  </p>
                  <p className="text-gray-300">
                    Artists:{" "}
                    <Link
                      href="/preset/metallica"
                      className="text-blue-400 hover:text-blue-300 underline"
                    >
                      Metallica
                    </Link>
                    ,{" "}
                    <Link
                      href="/preset/slayer"
                      className="text-blue-400 hover:text-blue-300 underline"
                    >
                      Slayer
                    </Link>
                    ,{" "}
                    <Link
                      href="/preset/iron-maiden"
                      className="text-blue-400 hover:text-blue-300 underline"
                    >
                      Iron Maiden
                    </Link>
                    ,{" "}
                    <Link
                      href="/preset/pantera"
                      className="text-blue-400 hover:text-blue-300 underline"
                    >
                      Pantera
                    </Link>
                    ,{" "}
                    <Link
                      href="/preset/black-sabbath"
                      className="text-blue-400 hover:text-blue-300 underline"
                    >
                      Black Sabbath
                    </Link>
                  </p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Grunge (10+ presets)
                  </h3>
                  <p className="text-gray-300 mb-2">
                    Gritty mids, moderate gain, roomy reverbs. Raw and emotional
                    tones that defined the 90s. Great with both single coils and
                    humbuckers.
                  </p>
                  <p className="text-gray-300">
                    Artists:{" "}
                    <Link
                      href="/preset/nirvana"
                      className="text-blue-400 hover:text-blue-300 underline"
                    >
                      Nirvana
                    </Link>
                  </p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Classic Rock (25+ presets)
                  </h3>
                  <p className="text-gray-300 mb-2">
                    Crunchy amps, vintage cabs, light drive. Timeless tones from
                    the golden era of rock. Ideal for Les Pauls and
                    Stratocasters.
                  </p>
                  <p className="text-gray-300">
                    Artists:{" "}
                    <Link
                      href="/preset/led-zeppelin"
                      className="text-blue-400 hover:text-blue-300 underline"
                    >
                      Led Zeppelin
                    </Link>
                    ,{" "}
                    <Link
                      href="/preset/ac-dc"
                      className="text-blue-400 hover:text-blue-300 underline"
                    >
                      AC/DC
                    </Link>
                    ,{" "}
                    <Link
                      href="/preset/deep-purple"
                      className="text-blue-400 hover:text-blue-300 underline"
                    >
                      Deep Purple
                    </Link>
                    ,{" "}
                    <Link
                      href="/preset/pink-floyd"
                      className="text-blue-400 hover:text-blue-300 underline"
                    >
                      Pink Floyd
                    </Link>
                    ,{" "}
                    <Link
                      href="/preset/the-eagles"
                      className="text-blue-400 hover:text-blue-300 underline"
                    >
                      The Eagles
                    </Link>
                  </p>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Alternative (20+ presets)
                  </h3>
                  <p className="text-gray-300 mb-2">
                    Clean/edge-of-breakup, chorus/mod textures. Versatile tones
                    from jangly cleans to atmospheric soundscapes. Works with
                    any pickup configuration.
                  </p>
                  <p className="text-gray-300">
                    Artists:{" "}
                    <Link
                      href="/preset/radiohead"
                      className="text-blue-400 hover:text-blue-300 underline"
                    >
                      Radiohead
                    </Link>
                    ,{" "}
                    <Link
                      href="/preset/red-hot-chili-peppers"
                      className="text-blue-400 hover:text-blue-300 underline"
                    >
                      Red Hot Chili Peppers
                    </Link>
                    ,{" "}
                    <Link
                      href="/preset/muse"
                      className="text-blue-400 hover:text-blue-300 underline"
                    >
                      Muse
                    </Link>
                    ,{" "}
                    <Link
                      href="/preset/rem"
                      className="text-blue-400 hover:text-blue-300 underline"
                    >
                      REM
                    </Link>
                    ,{" "}
                    <Link
                      href="/preset/arctic-monkeys"
                      className="text-blue-400 hover:text-blue-300 underline"
                    >
                      Arctic Monkeys
                    </Link>
                  </p>
                </div>
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
              <h2 className="text-2xl font-semibold mb-4 text-white">
                About our presets
              </h2>
              <div className="bg-gray-800 rounded-lg p-6 space-y-4 text-gray-300">
                <p>
                  Every preset on nxrig is carefully crafted to capture the
                  authentic tone of legendary artists. We don&apos;t just dial
                  in random settings—we analyze the original recordings, study
                  gear setups, and test extensively on real NUX devices.
                </p>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Our process
                  </h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      Research the artist&apos;s gear, amp settings, and
                      recording techniques
                    </li>
                    <li>
                      Create initial presets using appropriate amp models, IRs,
                      and effects
                    </li>
                    <li>
                      Test on multiple guitars (single coils, humbuckers,
                      different woods)
                    </li>
                    <li>
                      Fine-tune gain staging, EQ, and effect parameters for
                      balance
                    </li>
                    <li>
                      Verify compatibility across Mighty Plug Pro and Mighty
                      Space
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Quality control
                  </h3>
                  <p>
                    Each preset is tested in real playing conditions—not just in
                    isolation. We check how it sits in a mix, how it responds to
                    different playing dynamics, and whether it works for both
                    rhythm and lead parts when applicable.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Regular updates
                  </h3>
                  <p>
                    We continuously add new presets based on user requests and
                    popular demand. Existing presets are refined as we discover
                    better techniques or when NUX releases firmware updates with
                    new features.
                  </p>
                </div>
                <p>
                  All presets are free to download, modify, and share. We
                  believe great guitar tone should be accessible to everyone.
                </p>
              </div>
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
                <details className="bg-gray-800 rounded-lg p-4">
                  <summary className="cursor-pointer font-medium text-white hover:text-blue-400">
                    What is the difference between Mighty Plug Pro and Mighty
                    Space?
                  </summary>
                  <p className="mt-2 text-gray-300">
                    Mighty Plug Pro is a portable headphone amp, while Mighty
                    Space is a desktop amp with speaker output. Both share the
                    same amp models and effects, so presets work on both devices
                    with minimal adjustments.
                  </p>
                </details>
                <details className="bg-gray-800 rounded-lg p-4">
                  <summary className="cursor-pointer font-medium text-white hover:text-blue-400">
                    Do I need additional software to use presets?
                  </summary>
                  <p className="mt-2 text-gray-300">
                    No. You only need the official NUX app: Mighty Editor for
                    desktop (Windows/Mac) or MightyAmp for mobile (iOS/Android).
                    Both are free downloads from NUX.
                  </p>
                </details>
                <details className="bg-gray-800 rounded-lg p-4">
                  <summary className="cursor-pointer font-medium text-white hover:text-blue-400">
                    How often are new presets added?
                  </summary>
                  <p className="mt-2 text-gray-300">
                    We add new presets regularly, typically 5-10 per month based
                    on user requests and popular artists. Follow our updates or
                    subscribe to notifications for new releases.
                  </p>
                </details>
                <details className="bg-gray-800 rounded-lg p-4">
                  <summary className="cursor-pointer font-medium text-white hover:text-blue-400">
                    Can I modify presets after downloading?
                  </summary>
                  <p className="mt-2 text-gray-300">
                    Absolutely! All presets are fully editable. Use them as
                    starting points and adjust any parameter to match your
                    guitar, playing style, or personal taste. We encourage
                    experimentation.
                  </p>
                </details>
                <details className="bg-gray-800 rounded-lg p-4">
                  <summary className="cursor-pointer font-medium text-white hover:text-blue-400">
                    What if the preset doesn&apos;t sound right on my guitar?
                  </summary>
                  <p className="mt-2 text-gray-300">
                    Guitar tone varies with pickups, wood, and setup. Start by
                    adjusting gain and output level, then tweak EQ
                    (bass/mid/treble). Artist pages include pickup
                    recommendations and adjustment tips.
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
