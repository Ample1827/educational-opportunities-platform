/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bold-org.ghost.io',
      },
      {
        protocol: 'https',
        hostname: 'www.collegetransitions.com',
      },
    ],
  },
}

export default nextConfig