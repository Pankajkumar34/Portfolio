/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com", // Add this line
      },
    ],
  },
  experimental: {
    optimizeCss: true, // Keeping your previous optimization
  },
};

module.exports = nextConfig;