import "../styles/globals.css";
import { Metadata } from "next";
import YandexMetrika from "../components/YandexMetrika";
import { GoogleTagManager } from "../components/GoogleTagManager";

export const metadata: Metadata = {
  title: "NXRIG",
  description: "Free guitar presets for NUX Mighty Plug Pro",
  metadataBase: new URL("https://nxrig.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Schema.org разметка для Website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "NXRIG",
              description: "Free guitar presets for NUX Mighty Plug Pro",
              url: "https://nxrig.com",
            }),
          }}
        />

        {/* Schema.org разметка для Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "NXRIG",
              url: "https://nxrig.com",
              logo: "https://nxrig.com/images/og-image.svg",
              sameAs: [
                // Можно добавить ссылки на социальные сети, если они есть
              ],
            }),
          }}
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body>
        <GoogleTagManager />
        <YandexMetrika />
        {children}
      </body>
    </html>
  );
}
