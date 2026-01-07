import { Metadata } from "next";

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

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
