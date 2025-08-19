import { presets } from "lib/public/presets";
import { PresetCard } from "components/PresetCard";
import Header from "components/Header";
import Footer from "components/Footer";

export default function Home(): React.ReactElement {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Presets grid */}
        <div
          id="presets"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {presets.map((preset) => (
            <PresetCard key={preset.id} preset={preset} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
