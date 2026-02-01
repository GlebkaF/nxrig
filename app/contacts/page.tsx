import { Metadata } from "next";
import Header from "components/Header";
import Footer from "components/Footer";
import { publicConfig } from "lib/public/config";

export const metadata: Metadata = {
  title: "Contacts | NXRig",
  description:
    "Get in touch with NXRig. Contact email, community links, and support details.",
  alternates: {
    canonical: "https://nxrig.com/contacts",
  },
  openGraph: {
    title: "Contacts | NXRig",
    description:
      "Get in touch with NXRig. Contact email, community links, and support details.",
    url: "https://nxrig.com/contacts",
    type: "website",
  },
};

export default function ContactsPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Contact NXRig</h1>
        <p className="text-gray-300 mb-8 max-w-2xl">
          Need help with a preset, want to request a new tone, or just have a
          question? Reach us using the channels below.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-800/60 rounded-lg p-6 border border-white/10">
            <h2 className="text-xl font-semibold mb-2">Email</h2>
            <p className="text-gray-300 mb-4">
              We respond within 1–2 business days.
            </p>
            <a
              href={`mailto:${publicConfig.contacts.email}`}
              className="text-pink-400 hover:text-pink-300"
            >
              {publicConfig.contacts.email}
            </a>
          </div>
          <div className="bg-gray-800/60 rounded-lg p-6 border border-white/10">
            <h2 className="text-xl font-semibold mb-2">Community</h2>
            <p className="text-gray-300 mb-4">
              Join our community and share feedback, requests, and tips.
            </p>
            <a
              href={publicConfig.contacts.telegram}
              className="text-pink-400 hover:text-pink-300"
            >
              Telegram community
            </a>
          </div>
        </div>
      </main>
      <Footer>
        <div className="container mx-auto px-4">
          <p className="text-gray-300 text-center">
            We&apos;re here to help you get the best tone from your NUX device.
          </p>
        </div>
      </Footer>
    </div>
  );
}
