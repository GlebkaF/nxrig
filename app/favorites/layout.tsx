import { Metadata } from "next";
import { createSeoMetadata } from "lib/seo";

export const metadata: Metadata = createSeoMetadata({
  title: "Your Favorite NUX Guitar Presets | NXRIG",
  description:
    "Your favorite presets for NUX Mighty Plug Pro and Mighty Space. Save and manage your favorite guitar tones.",
  path: "/favorites/",
  noIndex: true,
});

export default function FavoritesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
