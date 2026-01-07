import { presets } from "lib/public/presets";
import Header from "components/Header";
import Footer from "components/Footer";
import { EditorPageClient } from "./EditorPageClient";

export default function EditorPage() {
  // Серверный рендеринг с дефолтным пресетом для SEO
  const defaultPreset = presets[0];

  if (!defaultPreset) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-900 text-white">
        <Header />
        <main className="flex-grow">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">No Presets Available</h1>
            <p className="text-gray-400">
              There are no presets available to edit at this time.
            </p>
          </div>
        </main>
        <Footer>
          <div className="container mx-auto">
            <p className="text-gray-300">NUX Must Have - Preset Editor</p>
          </div>
        </Footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <EditorPageClient defaultPreset={defaultPreset} />
        </div>
      </main>
      <Footer>
        <div className="container mx-auto">
          <p className="text-gray-300">
            Customize your preset and download the QR code to load it into your
            NUX Mighty device.
          </p>
        </div>
      </Footer>
    </div>
  );
}
