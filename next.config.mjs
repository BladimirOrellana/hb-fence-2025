import withPWA from "next-pwa";

const nextConfig = withPWA({
  reactStrictMode: true,
  images: {
    domains: ["your-image-domain.com"], // Replace with actual image domain
  },
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
  i18n: {
    locales: ["es", "en"], // Spanish (default), English
    defaultLocale: "es",
  },
  experimental: {
    turbo: true, // Enable Turbopack
    appDir: true, // Ensures Next.js App Router is fully enabled
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.json$/,
      type: "json", // Fix JSON import errors
    });
    return config;
  },
});

export default nextConfig;
