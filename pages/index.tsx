import { presets } from "lib/public/presets";
import { PresetCard } from "components/PresetCard";
import Header from "components/Header";
import Footer from "components/Footer";
import { useState } from "react";
import { publicConfig } from "lib/public/config";

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
      <Header />

      <main className="container mx-auto px-4 py-8">
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

        {filteredPresets.length > 0 ? (
          <div
            id="presets"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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
