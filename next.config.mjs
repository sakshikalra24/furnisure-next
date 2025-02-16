export default {
  reactStrictMode: false,
  images: {
    domains: ["events.furnisure.me"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  compress: true,
  env: {
    NEXT_PUBLIC_API_URL:
      process.env.NODE_ENV === "production"
        ? "https://furnisure.me/api/woocommerce"
        : "http://localhost:3000/api/woocommerce",
  },
};
