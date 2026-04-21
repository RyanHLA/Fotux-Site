/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        // Domínio público padrão do Cloudflare R2
        protocol: "https",
        hostname: "*.r2.dev",
      },
      {
        // Domínio personalizado R2 (configurar quando tiver em produção)
        protocol: "https",
        hostname: "fotos.fotux.com.br",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
