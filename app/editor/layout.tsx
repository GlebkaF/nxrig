import { Metadata } from "next";
import { createSeoMetadata } from "lib/seo";

export const metadata: Metadata = {
  ...createSeoMetadata({
    title: "Online NUX Mighty Patch Editor | NXRIG",
    description:
      "Create and edit NUX Mighty Plug Pro and Mighty Space guitar patches online. Adjust effects and export a QR code for the MightyAmp app.",
    path: "/editor/",
  }),
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

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
