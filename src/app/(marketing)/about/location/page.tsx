import { Metadata } from 'next'
import { Section } from '@/components/layout/Section'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { CONTACT_INFO } from '@/lib/constants'

export const metadata: Metadata = {
  title: '오시는 길',
  description: '다삼솔루션 본사 위치 및 교통 안내입니다.',
}

const transportInfo = [
  {
    type: '지하철',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h8m-8 4h8m-4 4v3m-4 0h8a2 2 0 002-2V6a2 2 0 00-2-2H8a2 2 0 00-2 2v10a2 2 0 002 2zm-2 0h12" />
      </svg>
    ),
    lines: [
      { name: '분당선', station: '야탑역 3번 출구', walk: '도보 10분' },
      { name: '8호선', station: '모란역 1번 출구', walk: '도보 15분' },
    ],
  },
  {
    type: '버스',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h8m-4 4v4m-4 2h8a2 2 0 002-2V7a2 2 0 00-2-2H8a2 2 0 00-2 2v8a2 2 0 002 2zM6 17v2m12-2v2" />
      </svg>
    ),
    lines: [
      { name: '일반버스', station: '55, 57, 320, 340', walk: '선텍시티 하차' },
      { name: '마을버스', station: '3, 3-1', walk: '선텍시티 하차' },
    ],
  },
  {
    type: '자가용',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
      </svg>
    ),
    lines: [
      { name: '주차', station: '건물 지하 주차장 이용 가능', walk: '30분 무료' },
    ],
  },
]

export default function LocationPage() {
  return (
    <>
      {/* Hero Section */}
      <Section className="pt-20 pb-12">
        <div className="max-w-3xl mx-auto text-center">
          <Badge variant="accent" className="mb-4">Location</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            <span className="text-accent">오시는</span> 길
          </h1>
          <p className="text-lg text-foreground-secondary">
            다삼솔루션 본사를 방문해 주세요.
          </p>
        </div>
      </Section>

      {/* Map & Info Section */}
      <Section background="secondary">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Map */}
          <Card className="overflow-hidden">
            <div className="aspect-square lg:aspect-auto lg:h-full min-h-[400px] bg-background-tertiary flex items-center justify-center">
              {/* 실제 구현 시 카카오맵 또는 네이버맵 API 연동 */}
              <div className="text-center">
                <svg className="w-16 h-16 text-foreground-tertiary mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-foreground-tertiary text-sm">지도 영역</p>
                <p className="text-foreground-tertiary text-xs mt-1">
                  (카카오맵/네이버맵 API 연동 예정)
                </p>
              </div>
            </div>
          </Card>

          {/* Info */}
          <div className="space-y-6">
            {/* Address Card */}
            <Card>
              <CardContent>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  주소 정보
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-foreground-secondary">도로명 주소</p>
                      <p className="text-foreground font-medium">{CONTACT_INFO.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-foreground-secondary">전화번호</p>
                      <a
                        href={`tel:${CONTACT_INFO.phone}`}
                        className="text-foreground font-medium hover:text-accent transition-colors"
                      >
                        {CONTACT_INFO.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-foreground-secondary">영업시간</p>
                      <p className="text-foreground font-medium">{CONTACT_INFO.businessHours}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Transport Info */}
            <Card>
              <CardContent>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  교통 안내
                </h3>
                <div className="space-y-6">
                  {transportInfo.map((transport) => (
                    <div key={transport.type}>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                          {transport.icon}
                        </div>
                        <span className="font-medium text-foreground">{transport.type}</span>
                      </div>
                      <div className="space-y-2 ml-10">
                        {transport.lines.map((line, index) => (
                          <div key={index} className="text-sm">
                            <span className="text-accent font-medium">{line.name}</span>
                            <span className="text-foreground-secondary"> - {line.station}</span>
                            <span className="text-foreground-tertiary"> ({line.walk})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>
    </>
  )
}
