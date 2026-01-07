import { Metadata } from "next";
import { presets } from "lib/public/presets";
import Header from "components/Header";
import Footer from "components/Footer";
import { PresetEditor } from "components/PresetEditor";

export const metadata: Metadata = {
  title: "Online Patch Editor for NUX Mighty Devices | nxrig.com",
  description:
    "Free online patch editor for NUX Mighty Plug Pro and Mighty Space. Create custom guitar tones in your browser - an alternative to the mobile app. Adjust effects, tweak parameters, and download QR codes instantly.",
  keywords: [
    "NUX patch editor",
    "NUX online editor",
    "NUX Mighty Plug Pro editor",
    "NUX Mighty Space editor",
    "guitar patch editor online",
    "NUX tone editor",
    "MightyApp alternative",
  ],
};

interface EditorPageProps {
  searchParams: {
    preset?: string;
  };
}

export default async function EditorPage({ searchParams }: EditorPageProps) {
  // Получаем ID пресета из query параметров или используем первый пресет
  const presetId = searchParams.preset || presets[0]?.id;

  // Находим пресет по ID
  const preset = presets.find((p) => p.id === presetId) || presets[0];

  if (!preset) {
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
          <PresetEditor preset={preset} />
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
