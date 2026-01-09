import Link from 'next/link'
import { Section, SectionHeader } from '@/components/layout/Section'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

interface Service {
  name: string
  description: string
  features: string[]
  href: string
  badge?: string
}

const services: Service[] = [
  {
    name: 'ARS-PG 결제',
    description: '전화 한 통으로 안전하게 결제를 완료하세요. 카드사 직접 연동으로 빠르고 안전한 전화결제 서비스를 제공합니다.',
    features: [
      '카드사 직접 연동',
      'PCI-DSS 보안 인증',
      '실시간 결제 알림',
      '정기결제 지원',
    ],
    href: '/services/ars-pg',
    badge: '인기',
  },
  {
    name: 'IVR 시스템',
    description: '고객 응대를 자동화하여 운영 효율을 높이세요. 맞춤형 시나리오로 고객 만족도를 향상시킵니다.',
    features: [
      '맞춤형 시나리오 설계',
      'TTS/음원 제작',
      '통계 및 리포트',
      'CRM 연동',
    ],
    href: '/services/ivr',
  },
  {
    name: 'VMS 서비스',
    description: '대량 음성 메시지를 효율적으로 전달하세요. 마케팅, 공지, 알림 등 다양한 용도로 활용 가능합니다.',
    features: [
      '대량 발송 지원',
      '예약 발송',
      '발송 결과 리포트',
      '수신 확인 기능',
    ],
    href: '/services/vms',
  },
]

export function Services() {
  return (
    <Section>
      <SectionHeader
        title="서비스 소개"
        subtitle="비즈니스 성장을 위한 다양한 ARS 솔루션을 만나보세요"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <Card key={service.name} hover glow className="flex flex-col h-full">
            <CardContent className="flex flex-col h-full">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold text-foreground">
                  {service.name}
                </h3>
                {service.badge && (
                  <Badge variant="accent" size="sm">
                    {service.badge}
                  </Badge>
                )}
              </div>

              <p className="text-foreground-secondary text-sm leading-relaxed mb-6">
                {service.description}
              </p>

              <ul className="space-y-3 mb-6 flex-1">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm">
                    <svg
                      className="w-5 h-5 text-accent flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-foreground-secondary">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button variant="secondary" className="w-full mt-auto" asChild>
                <Link href={service.href}>
                  자세히 알아보기
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  )
}
