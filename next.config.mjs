/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    env: {
      DATABASE_URL: process.env.DATABASE_URL,
      DIRECT_URL: process.env.DIRECT_URL,
      UPLOADTHING_TOKEN: process.env.UPLOADTHING_TOKEN,
    },
    serverActions: {
      mode: "default", // Exemple, ajustez selon vos besoins
    },
  },

  images: {
    remotePatterns: [
      { hostname: "img.clerk.com" },
      { hostname: "utfs.io", protocol: "https", port: "" },
      { hostname: "via.placeholder.com" },
    ],
  },
};

export default nextConfig;
