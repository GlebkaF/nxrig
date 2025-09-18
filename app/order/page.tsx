import Header from "../../components/Header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Custom Patch | NX Rig - Professional NUX Mighty Presets",
  description:
    "Order a custom patch for your NUX Mighty Plug Pro or Mighty Space. Professional sound design tailored to your musical needs.",
  openGraph: {
    title: "Order Custom Patch | NX Rig - Professional NUX Mighty Presets",
    description:
      "Order a custom patch for your NUX Mighty Plug Pro or Mighty Space. Professional sound design tailored to your musical needs.",
    images: ["/images/og-image.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Order Custom Patch | NX Rig - Professional NUX Mighty Presets",
    description:
      "Order a custom patch for your NUX Mighty Plug Pro or Mighty Space. Professional sound design tailored to your musical needs.",
    images: ["/images/og-image.svg"],
  },
};

export default function OrderPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-center">
            Request Custom Patch
          </h1>
          <p className="text-center text-gray-400 mb-6">
            Can&apos;t find the tone you need? Request a custom patch and
            we&apos;ll add it in a few days and email you when it&apos;s ready.
          </p>

          <div className="bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-lg p-6">
            <div className="flex justify-center">
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSc8ZgBnqlpY0sNjtKm1ThHrmlaUp5vs78DXAZexy8A1OUxWmg/viewform?embedded=true"
                width="100%"
                height="1600"
                style={{ border: 0, margin: 0 }}
                className="rounded-lg max-w-2xl"
                title="Custom Patch Order Form"
              >
                Loading form...
              </iframe>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
