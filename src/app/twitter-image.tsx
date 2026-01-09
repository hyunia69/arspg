import { ImageResponse } from 'next/og'
import { SITE_CONFIG } from '@/lib/constants'

export const runtime = 'edge'

export const alt = SITE_CONFIG.name
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0a0a0b 0%, #18181b 50%, #0a0a0b 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        {/* 배경 그라데이션 효과 */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(80, 70, 229, 0.3) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />

        {/* 메인 콘텐츠 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
          }}
        >
          {/* 로고/브랜드명 */}
          <div
            style={{
              fontSize: 80,
              fontWeight: 800,
              color: '#fafafa',
              letterSpacing: '-0.02em',
              marginBottom: 20,
              display: 'flex',
            }}
          >
            ARSPG
          </div>

          {/* 태그라인 */}
          <div
            style={{
              fontSize: 32,
              color: '#a1a1aa',
              marginBottom: 40,
              display: 'flex',
            }}
          >
            ARS 전화결제 전문 솔루션
          </div>

          {/* 서비스 배지 */}
          <div
            style={{
              display: 'flex',
              gap: '16px',
            }}
          >
            {['ARS-PG', 'IVR', 'VMS'].map((service) => (
              <div
                key={service}
                style={{
                  background: 'rgba(80, 70, 229, 0.2)',
                  border: '1px solid rgba(80, 70, 229, 0.4)',
                  borderRadius: '9999px',
                  padding: '12px 24px',
                  color: '#a1a1aa',
                  fontSize: 20,
                  display: 'flex',
                }}
              >
                {service}
              </div>
            ))}
          </div>
        </div>

        {/* 하단 회사명 */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            color: '#52525b',
            fontSize: 18,
            display: 'flex',
          }}
        >
          다삼솔루션 | www.arspg.co.kr
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
