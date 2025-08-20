/** @type {import('next').NextConfig} */

// Определяем режим работы на основе переменной окружения
const isProduction = process.env.NODE_ENV === "production";
const isStaticExport = process.env.STATIC_EXPORT === "true";

const nextConfig = {
  // Используем static export только для production билда (GitHub Pages)
  ...(isStaticExport && { output: "export" }),
  images: { unoptimized: true },
  // basePath и assetPrefix только для production
  ...(isProduction && {
    assetPrefix: "",
    basePath: "",
  }),
  trailingSlash: true,
};

export default nextConfig;
