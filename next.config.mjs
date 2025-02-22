// eslint-disable-next-line import/no-anonymous-default-export
export default {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "events.furnisure.me",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  compress: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};
