/** @type {import('next').NextConfig} */

const isProduction = process.env.NODE_ENV === "production";

const nextConfig = {
  // output: "export",
  ...(isProduction && {
    output: "export",
  }),
  assetPrefix: "",
  basePath: "",
  images: { unoptimized: true },
  trailingSlash: true,
  swcMinify: true,
  experimental: {
    optimizePackageImports: ["lodash"],
  },
  compiler: {
    removeConsole: isProduction,
  },
};

export default nextConfig;
