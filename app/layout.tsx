import "../styles/globals.css";
import { Metadata } from "next";
import YandexMetrika from "../components/YandexMetrika";
import { GoogleTagManager } from "../components/GoogleTagManager";
import { isProduction } from "../lib/env";

export const metadata: Metadata = {
  title: "NXRIG",
  description:
    "Free guitar presets for NUX Mighty Plug Pro and NUX Mighty Space - fully compatible with both devices",
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
        {/* Schema.org разметка для Website с основными разделами */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "NXRIG",
              alternateName: "NX Rig",
              description:
                "Free guitar presets for NUX Mighty Plug Pro and NUX Mighty Space - fully compatible with both devices. Download professional guitar tones inspired by Metallica, Nirvana, Red Hot Chili Peppers, and more legendary artists.",
              url: "https://nxrig.com",
              mainEntity: {
                "@type": "ItemList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    item: {
                      "@type": "WebPage",
                      name: "All Presets",
                      url: "https://nxrig.com/preset",
                    },
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    item: {
                      "@type": "WebPage",
                      name: "Metallica Presets",
                      url: "https://nxrig.com/preset/metallica",
                    },
                  },
                  {
                    "@type": "ListItem",
                    position: 3,
                    item: {
                      "@type": "WebPage",
                      name: "Nirvana Presets",
                      url: "https://nxrig.com/preset/nirvana",
                    },
                  },
                  {
                    "@type": "ListItem",
                    position: 4,
                    item: {
                      "@type": "WebPage",
                      name: "Red Hot Chili Peppers Presets",
                      url: "https://nxrig.com/preset/red-hot-chili-peppers",
                    },
                  },
                  {
                    "@type": "ListItem",
                    position: 5,
                    item: {
                      "@type": "WebPage",
                      name: "Led Zeppelin Presets",
                      url: "https://nxrig.com/preset/led-zeppelin",
                    },
                  },
                  {
                    "@type": "ListItem",
                    position: 6,
                    item: {
                      "@type": "WebPage",
                      name: "Request Patch",
                      url: "https://nxrig.com/order",
                    },
                  },
                ],
              },
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
              alternateName: "NX Rig",
              url: "https://nxrig.com",
              logo: "https://nxrig.com/images/og-image.svg",
              description:
                "Free guitar presets library for NUX Mighty Plug Pro and NUX Mighty Space devices",
              sameAs: [],
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

        {/* Preconnect для аналитики */}
        {isProduction && (
          <>
            <link rel="preconnect" href="https://www.googletagmanager.com" />
            <link
              rel="preconnect"
              href="https://mc.yandex.ru"
              crossOrigin="anonymous"
            />
            <link rel="dns-prefetch" href="https://mc.yandex.ru" />
          </>
        )}
      </head>
      <body>
        {isProduction && <GoogleTagManager />}
        {isProduction && <YandexMetrika />}
        {children}
      </body>
    </html>
  );
}
