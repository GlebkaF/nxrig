import Header from "components/Header";
import Footer from "components/Footer";
import { Metadata } from "next";
import ClientSearch from "../components/ClientSearch";

export const metadata: Metadata = {
  title:
    "NUX Mighty Plug Pro & Mighty Space Patches – Free Guitar Presets Library | NX Rig",
  description:
    "Download free NUX Mighty Plug Pro and Mighty Space patches and guitar presets. Fully compatible with both devices. Explore authentic tones for rock, blues, and metal. Easy to use, tested by real musicians.",
  openGraph: {
    title:
      "NUX Mighty Plug Pro & Mighty Space Patches – Free Guitar Presets Library | NX Rig",
    description:
      "Download free NUX Mighty Plug Pro and Mighty Space patches and guitar presets. Fully compatible with both devices. Explore authentic tones for rock, blues, and metal. Easy to use, tested by real musicians.",
    images: ["/images/og-image.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "NUX Mighty Plug Pro & Mighty Space Patches – Free Guitar Presets Library | NX Rig",
    description:
      "Download free NUX Mighty Plug Pro and Mighty Space patches and guitar presets. Fully compatible with both devices. Explore authentic tones for rock, blues, and metal. Easy to use, tested by real musicians.",
    images: ["/images/og-image.svg"],
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">
          NUX Mighty Plug Pro & Mighty Space Patches – Guitar Presets Library
        </h1>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">
            Free NUX Mighty Presets
          </h2>{" "}
          <p className="text-gray-300 max-w-3xl">
            Explore our collection of free, high-quality presets for your NUX
            Mighty Plug Pro and NUX Mighty Space. All presets are fully
            compatible with both devices and carefully crafted and tested by
            real musicians.
          </p>
        </div>

        <h2 className="text-2xl font-semibold mb-6">
          Guitar Presets for NUX Mighty Devices
        </h2>

        <ClientSearch />
      </main>

      <Footer>
        <div className="container mx-auto">
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 mb-6">
              Welcome to NX Rig – a dedicated library of{" "}
              <strong>NUX Mighty Plug Pro and Mighty Space patches</strong> and
              custom guitar presets. Our collection is designed for both NUX
              Mighty devices, giving you ready-to-play tones for practice,
              recording, and live playing.
            </p>

            <p className="text-gray-300 mb-6">
              Whether you need clean tones, classic rock crunch, or heavy metal
              distortion, our <strong>NUX Mighty presets</strong> make it easy
              to get the sound you want. All patches are created and tested by
              real musicians, so they work in real playing situations.
            </p>

            <h3 className="text-2xl font-semibold text-white mt-8 mb-4">
              Guitar Presets for NUX Mighty Plug Pro & Mighty Space
            </h3>
            <p className="text-gray-300 mb-6">
              At NX Rig you&apos;ll find song-based patches inspired by
              legendary artists. Each preset comes with carefully tuned
              parameters and can be loaded into your device in seconds. All
              presets are fully compatible with both NUX Mighty Plug Pro and NUX
              Mighty Space.
            </p>

            <p className="text-gray-300">
              Start exploring{" "}
              <strong>guitar presets for NUX Mighty devices</strong> today and
              take your sound to the next level.
            </p>
          </div>
        </div>
      </Footer>
    </div>
  );
}
