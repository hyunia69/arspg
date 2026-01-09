/** @type {import('next').NextConfig} */
const nextConfig = {
  // 이미지 최적화
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1년
  },

  // 실험적 기능
  experimental: {
    optimizePackageImports: ['@supabase/supabase-js'],
  },

  // 압축 활성화
  compress: true,

  // 빌드 시 타입 체크
  typescript: {
    ignoreBuildErrors: false,
  },

  // ESLint 검사
  eslint: {
    ignoreDuringBuilds: false,
  },

  // 보안 헤더
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        // 정적 자산에 대한 캐싱 헤더
        source: '/(.*)\\.(ico|png|jpg|jpeg|gif|svg|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },

  // 리다이렉트
  async redirects() {
    return [
      // 레거시 URL 리다이렉트 (필요시 추가)
      {
        source: '/company_intro.htm',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/company_history.htm',
        destination: '/about/history',
        permanent: true,
      },
      {
        source: '/company_map.htm',
        destination: '/about/location',
        permanent: true,
      },
      {
        source: '/service_summary.htm',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/customer_faq.htm',
        destination: '/faq',
        permanent: true,
      },
      {
        source: '/customer_notice.htm',
        destination: '/notice',
        permanent: true,
      },
      {
        source: '/customer_apply.htm',
        destination: '/contact',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
