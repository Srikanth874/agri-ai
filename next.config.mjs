/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',          // Enable static HTML export
  basePath: '/agri-ai',      // Must match your GitHub repo name
  assetPrefix: '/agri-ai/',  // Required for assets to load correctly on GitHub Pages
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true, // Required for static export (no server for image optimization)
  },
};

export default nextConfig;
