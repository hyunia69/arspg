import { Metadata } from 'next'
import Link from 'next/link'
import { Section, SectionHeader } from '@/components/layout/Section'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: '서비스 소개',
  description: 'ARSPG의 ARS-PG 결제, IVR 시스템, VMS 서비스를 소개합니다. 비즈니스에 최적화된 전화결제 솔루션을 제공합니다.',
}

const services = [
  {
    id: 'ars-pg',
    name: 'ARS-PG 결제',
    description: '전화 한 통으로 완료되는 안전하고 편리한 카드 결제 시스템',
    features: ['실시간 카드 결제', '정기결제 지원', 'PCI-DSS 보안', '카드사 직접 연동'],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
    href: '/services/ars-pg',
    badge: 'Best Seller',
  },
  {
    id: 'ivr',
    name: 'IVR 시스템',
    description: '고객 응대 자동화를 위한 맞춤형 음성 안내 시스템',
    features: ['맞춤형 시나리오', '음성인식(STT)', '24시간 자동 응대', '콜센터 연동'],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    ),
    href: '/services/ivr',
    badge: null,
  },
  {
    id: 'vms',
    name: 'VMS 서비스',
    description: '대량 음성 메시지 발송을 위한 자동 발신 시스템',
    features: ['대량 발송', 'TTS 지원', '발송 예약', '결과 리포트'],
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
      </svg>
    ),
    href: '/services/vms',
    badge: null,
  },
]

const benefits = [
  {
    title: '비용 절감',
    description: '인건비 절감 및 운영 효율화로 평균 40% 이상의 비용 절감 효과',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: '24시간 운영',
    description: '365일 24시간 중단 없는 서비스로 고객 접점 확대',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: '보안 인증',
    description: 'PCI-DSS, ISMS 등 국제 보안 표준 인증 획득',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: '전문 지원',
    description: '전담 기술 지원팀의 신속한 장애 대응 및 기술 지원',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
]

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <Section className="pt-20 pb-12">
        <div className="max-w-3xl mx-auto text-center">
          <Badge variant="accent" className="mb-4">Services</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            비즈니스를 위한 <span className="text-accent">최적의 솔루션</span>
          </h1>
          <p className="text-lg text-foreground-secondary leading-relaxed">
            ARS-PG 결제, IVR 시스템, VMS 서비스까지
            고객님의 비즈니스에 필요한 모든 전화 솔루션을 제공합니다.
          </p>
        </div>
      </Section>

      {/* Services Grid */}
      <Section background="secondary">
        <SectionHeader
          title="서비스 라인업"
          subtitle="목적에 맞는 서비스를 선택하세요"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {services.map((service) => (
            <Card key={service.id} className="group relative overflow-hidden hover:border-accent/50 transition-colors">
              {service.badge && (
                <div className="absolute top-4 right-4">
                  <Badge variant="accent">{service.badge}</Badge>
                </div>
              )}
              <CardContent className="pt-8">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {service.name}
                </h3>
                <p className="text-foreground-secondary text-sm mb-6">
                  {service.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <svg className="w-4 h-4 text-success flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-foreground-secondary">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full" asChild>
                  <Link href={service.href}>
                    자세히 보기
                    <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Benefits Section */}
      <Section>
        <SectionHeader
          title="도입 효과"
          subtitle="ARSPG 솔루션 도입으로 얻을 수 있는 이점"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="text-center">
              <div className="w-12 h-12 mx-auto rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-4">
                {benefit.icon}
              </div>
              <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
              <p className="text-sm text-foreground-secondary">{benefit.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section background="secondary">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            어떤 서비스가 적합할지 모르시겠나요?
          </h2>
          <p className="text-foreground-secondary mb-8">
            전문 상담사가 비즈니스 상황에 맞는 최적의 솔루션을 추천해 드립니다.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" asChild>
              <Link href="/contact">무료 상담 신청</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/pricing">요금제 보기</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}
