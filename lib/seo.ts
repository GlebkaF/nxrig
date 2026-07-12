import { Metadata } from "next";

export const SITE_URL = "https://nxrig.com";
export const SITE_NAME = "NXRIG";
export const DEFAULT_OG_IMAGE = "/images/og-image.svg";

const TITLE_LIMIT = 60;
const DESCRIPTION_LIMIT = 160;

export function truncateMetadataText(text: string, limit: number): string {
  const normalized = text.replace(/\s+/g, " ").trim();

  if (normalized.length <= limit) {
    return normalized;
  }

  const shortened = normalized.slice(0, limit - 1);
  const lastSpace = shortened.lastIndexOf(" ");
  const safeCut = lastSpace > limit * 0.7 ? lastSpace : shortened.length;

  return `${shortened.slice(0, safeCut).replace(/[\s,;:–-]+$/u, "")}…`;
}

function canonicalUrl(path: string): string {
  const normalizedPath =
    path === "/" ? "/" : `/${path.replace(/^\/+|\/+$/g, "")}/`;
  return new URL(normalizedPath, SITE_URL).toString();
}

interface SeoMetadataOptions {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  image?: string;
  noIndex?: boolean;
}

export function createSeoMetadata({
  title,
  description,
  path,
  type = "website",
  image = DEFAULT_OG_IMAGE,
  noIndex = false,
}: SeoMetadataOptions): Metadata {
  const finalTitle = truncateMetadataText(title, TITLE_LIMIT);
  const finalDescription = truncateMetadataText(description, DESCRIPTION_LIMIT);
  const url = canonicalUrl(path);
  const imageUrl = new URL(image, SITE_URL).toString();

  return {
    title: finalTitle,
    description: finalDescription,
    alternates: { canonical: url },
    openGraph: {
      type,
      title: finalTitle,
      description: finalDescription,
      url,
      siteName: SITE_NAME,
      images: [{ url: imageUrl, alt: `${SITE_NAME} guitar presets` }],
    },
    twitter: {
      card: "summary_large_image",
      title: finalTitle,
      description: finalDescription,
      images: [imageUrl],
    },
    ...(noIndex && {
      robots: { index: false, follow: true },
    }),
  };
}
