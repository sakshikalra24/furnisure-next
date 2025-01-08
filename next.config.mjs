// next.config.mjs
export default {
  images: {
    domains: ['events.furnisure.me'], // Add the external domain here
  },
  eslint: {
    ignoreDuringBuilds: true, // Skip ESLint during the build process
  },
};
