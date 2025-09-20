import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Favorite Presets | NUX Mighty Plug Pro & Mighty Space | nxrig",
  description:
    "Your favorite presets for NUX Mighty Plug Pro and Mighty Space. Save and manage your favorite guitar tones.",
  alternates: {
    canonical: "https://nxrig.com/favorites",
  },
  openGraph: {
    title: "Favorite Presets | NUX Mighty Plug Pro & Mighty Space | nxrig",
    description:
      "Your favorite presets for NUX Mighty Plug Pro and Mighty Space. Save and manage your favorite guitar tones.",
    url: "https://nxrig.com/favorites",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function FavoritesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
