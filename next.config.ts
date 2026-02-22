import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for GitHub Pages to export as static HTML/CSS/JS
  output: 'export',
  // GitHub Pages does not support Next.js native Image Optimization API
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
