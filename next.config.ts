import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rukminim2.flixcart.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Performance optimizations
  experimental: {
    optimizePackageImports: ["lucide-react", "@radix-ui/react-icons"],
  },

  // Compression
  compress: true,

  // Generate standalone output for optimal deployment
  output: "standalone",

  // Headers for security and caching
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|jpeg|png|webp|avif|gif|ico)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Redirects for SEO - consolidate to single canonical domain
  async redirects() {
    return [
      // Redirect old URLs if any
      {
        source: "/puzzle/:game",
        destination: "/answers/:game/today",
        permanent: true,
      },
      // Redirect old blog paths without /blog prefix
      {
        source: "/best-strategies-for-linkedin-puzzles",
        destination: "/blog/best-strategies-for-linkedin-puzzles",
        permanent: true,
      },
      {
        source: "/linkedin-puzzle-guide",
        destination: "/blog/linkedin-puzzle-guide",
        permanent: true,
      },
      {
        source: "/linkedin-games-complete-guide",
        destination: "/blog/linkedin-games-complete-guide",
        permanent: true,
      },
      {
        source: "/how-to-solve-linkedin-zip",
        destination: "/blog/how-to-solve-linkedin-zip",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
