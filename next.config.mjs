// eslint-disable-next-line import/no-anonymous-default-export
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
  webpackDevMiddleware: (config) => {
    if (process.env.NODE_ENV === "production") {
      config.watchOptions = {
        ignored: "**/*",
      };
    }
    return config;
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = { fs: false };
    }
    return config;
  },
};
