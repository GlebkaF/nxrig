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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
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
        <h1 className="text-4xl font-bold text-center mb-8">
          NUX Mighty Plug Pro Patches – Guitar Presets Library
        </h1>

        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold mb-6">
            Free Mighty Plug Pro Presets
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
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
            className="w-full max-w-md px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

      <Footer />
    </div>
  );
}
