import { Metadata } from "next";
import Header from "components/Header";
import Footer from "components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy & Terms of Use | NXRig",
  description:
    "Read NXRig's privacy policy and terms of use covering data collection, cookies, and contact information.",
  alternates: {
    canonical: "https://nxrig.com/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy & Terms of Use | NXRig",
    description:
      "Read NXRig's privacy policy and terms of use covering data collection, cookies, and contact information.",
    url: "https://nxrig.com/privacy-policy",
    type: "website",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy & Terms</h1>
        <div className="prose prose-invert max-w-none">
          <p>
            This page is a placeholder policy to be expanded by the content
            manager. It covers how NXRig collects, stores, and uses information
            submitted through the site (such as email requests and contact
            messages).
          </p>
          <h2>Data we collect</h2>
          <ul>
            <li>Email addresses and names submitted via forms.</li>
            <li>Anonymous analytics (page views, device type).</li>
          </ul>
          <h2>How we use data</h2>
          <ul>
            <li>Respond to requests and support inquiries.</li>
            <li>Improve preset recommendations and content.</li>
            <li>Protect the site from spam and abuse.</li>
          </ul>
          <h2>Contact</h2>
          <p>
            For any privacy-related questions, contact us at{" "}
            <a href="mailto:request@nxrig.com">request@nxrig.com</a>.
          </p>
        </div>
      </main>
      <Footer>
        <div className="container mx-auto px-4">
          <p className="text-gray-300 text-center">
            Your privacy matters. We only use your data to improve the NXRig
            experience.
          </p>
        </div>
      </Footer>
    </div>
  );
}
