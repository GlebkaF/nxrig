import { presets } from "lib/public/presets";
import { PresetCard } from "components/PresetCard";
import Header from "components/Header";
import Footer from "components/Footer";
import { useState } from "react";
import { publicConfig } from "lib/public/config";
import Head from "next/head";

export default function Home(): React.ReactElement {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPresets = presets
    .filter(
      (preset) =>
        preset.origin.song.toLowerCase().includes(searchQuery.toLowerCase()) ||
        preset.origin.artist.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => a.origin.song.localeCompare(b.origin.song));

  const handleRequestPreset = (): void => {
    const emailSubject = encodeURIComponent(
      publicConfig.email.subjects.presetRequest
    );
    const emailBody = encodeURIComponent(
      publicConfig.email.templates.presetRequest(searchQuery)
    );
    window.location.href = `mailto:${publicConfig.contacts.email}?subject=${emailSubject}&body=${emailBody}`;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Head>
        <title>
          NUX Mighty Plug Pro Patches – Free Guitar Presets Library | NX Rig
        </title>
        <meta
          name="description"
          content="Download free NUX Mighty Plug Pro patches and guitar presets. Explore authentic tones for rock, blues, and metal. Easy to use, tested by real musicians."
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="NUX Mighty Plug Pro Patches – Free Guitar Presets Library | NX Rig"
        />
        <meta
          property="og:description"
          content="Download free NUX Mighty Plug Pro patches and guitar presets. Explore authentic tones for rock, blues, and metal. Easy to use, tested by real musicians."
        />
        <meta property="og:image" content="/images/og-image.svg" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="NUX Mighty Plug Pro Patches – Free Guitar Presets Library | NX Rig"
        />
        <meta
          name="twitter:description"
          content="Download free NUX Mighty Plug Pro patches and guitar presets. Explore authentic tones for rock, blues, and metal. Easy to use, tested by real musicians."
        />
        <meta name="twitter:image" content="/images/og-image.svg" />
      </Head>
      <Header />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">
          NUX Mighty Plug Pro Patches – Guitar Presets Library
        </h1>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">
            Free Mighty Plug Pro Presets
          </h2>
          <p className="text-gray-300 max-w-2xl">
            Explore our collection of free, high-quality presets for your NUX
            Mighty Plug Pro. Each preset is carefully crafted and tested by real
            musicians.
          </p>
        </div>

        {/* Search input */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search presets..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            className="w-full max-w-md px-4 py-2 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        <h2 className="text-2xl font-semibold mb-6">
          Guitar Presets for NUX Mighty
        </h2>

        {filteredPresets.length > 0 ? (
          <div
            id="presets"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          >
            {filteredPresets.map((preset) => (
              <PresetCard key={preset.id} preset={preset} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 mb-4">No presets found</p>
            <button
              onClick={handleRequestPreset}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              Request preset
            </button>
          </div>
        )}
      </main>

      <Footer>
        <div className="container mx-auto">
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 mb-6">
              Welcome to NX Rig – a dedicated library of{" "}
              <strong>NUX Mighty Plug Pro patches</strong> and custom guitar
              presets. Our collection is designed for the NUX Mighty Plug Pro,
              giving you ready-to-play tones for practice, recording, and live
              playing.
            </p>

            <p className="text-gray-300 mb-6">
              Whether you need clean tones, classic rock crunch, or heavy metal
              distortion, our <strong>Mighty Plug Pro presets</strong> make it
              easy to get the sound you want. All patches are created and tested
              by real musicians, so they work in real playing situations.
            </p>

            <h3 className="text-2xl font-semibold text-white mt-8 mb-4">
              Guitar Presets for NUX Mighty Plug Pro
            </h3>
            <p className="text-gray-300 mb-6">
              At NX Rig you&apos;ll find song-based patches inspired by
              legendary artists. Each preset comes with carefully tuned
              parameters and can be loaded into your device in seconds.
            </p>

            <p className="text-gray-300 mb-4">
              Why choose NX Rig? Free and easy to use, Authentic tones for
              different genres, Guitar presets created by musicians, for
              musicians.
            </p>

            <p className="text-gray-300">
              Start exploring <strong>guitar presets for NUX Mighty</strong>{" "}
              today and take your sound to the next level.
            </p>
          </div>
        </div>
      </Footer>
    </div>
  );
}
