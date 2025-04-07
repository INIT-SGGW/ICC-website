/** @type {import('next').NextConfig} */
module.exports = {
  assetPrefix: "/admin",
  basePath: "/admin",
  reactStrictMode: true,
  output: "standalone",
  transpilePackages: ["@repo/ui"],
  experimental: {
    serverActions: {
      bodySizeLimit: "100mb",
    }
  }
};
