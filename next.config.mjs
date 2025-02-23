import withPWA from "next-pwa";

const nextConfig = withPWA({
  reactStrictMode: true,
  images: {
    domains: ["your-image-domain.com"],
  },
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
  i18n: {
    locales: ["es", "en"],
    defaultLocale: "es",
  },
  // Remove experimental options temporarily
  // experimental: {
  //   turbo: true,
  //   appDir: true,
  // },
  webpack(config) {
    config.module.rules.push({
      test: /\.json$/,
      type: "json",
    });
    return config;
  },
});

export default nextConfig;
