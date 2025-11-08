/** @type {import('next').NextConfig} */
const nextConfig = {
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
  serverExternalPackages: ['mongodb'],
}

export default nextConfig