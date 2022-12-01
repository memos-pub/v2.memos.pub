/** @type {import('next').NextConfig} */
const nextConfig = {
  // So relative links work easier
  trailingSlash: true,
  experimental: {
    appDir: true,
    allowMiddlewareResponseBody: true,
  },
};

module.exports = nextConfig;
