/** @type {import('next').NextConfig} */

const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin();
const nextConfig = {
  env: {
    BASE_URL: process.env.BASE_URL,
    COOKIE_NAME: process.env.COOKIE_NAME,
    MODE: process.env.MODE,
    ENCRYPT_KEY: process.env.ENCRYPT_KEY,
    API_KEY_AUTHORIZE: process.env.API_KEY_AUTHORIZE,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
      {
        protocol: "http",
        hostname: "*",
      },
    ],
  },
  webpack: config => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
};

module.exports = withNextIntl(nextConfig);
