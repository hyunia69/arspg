import { Metadata } from 'next'
import { Section, SectionHeader } from '@/components/layout/Section'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: '회사 소개',
  description: '다삼솔루션은 15년 이상의 ARS 전문 노하우를 보유한 전화결제 솔루션 전문 기업입니다.',
}

const values = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: '신뢰성',
    description: '15년 이상의 안정적인 서비스 운영 노하우와 99.9%의 가동률로 고객의 비즈니스를 지원합니다.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: '혁신',
    description: '최신 기술 트렌드를 반영한 솔루션으로 끊임없이 서비스를 개선하고 발전시킵니다.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: '고객 중심',
    description: '고객의 요구사항을 최우선으로 생각하며, 맞춤형 솔루션을 제공합니다.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    title: '전문성',
    description: 'ARS, IVR, VMS 분야의 전문 인력이 최고의 서비스 품질을 보장합니다.',
  },
]

const stats = [
  { value: '2009', label: '설립연도' },
  { value: '500+', label: '누적 고객사' },
  { value: '99.9%', label: '서비스 가동률' },
  { value: '50+', label: '전문 인력' },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <Section className="pt-20 pb-12">
        <div className="max-w-3xl mx-auto text-center">
          <Badge variant="accent" className="mb-4">About Us</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            ARS 전화결제의 <span className="text-accent">미래</span>를 열어갑니다
          </h1>
          <p className="text-lg text-foreground-secondary leading-relaxed">
            다삼솔루션은 2009년 설립 이후, 대한민국 ARS 전화결제 시장을 선도해 온
            전문 기업입니다. 축적된 기술력과 노하우를 바탕으로 고객의 비즈니스 성장을
            함께 만들어 갑니다.
          </p>
        </div>
      </Section>

      {/* Stats Section */}
      <Section background="secondary" className="py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-foreground-secondary">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Vision Section */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div>
            <Badge variant="default" className="mb-4">Our Vision</Badge>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              비전 & 미션
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">비전</h3>
                <p className="text-foreground-secondary">
                  대한민국 No.1 ARS 전화결제 솔루션 기업으로서, 기술 혁신을 통해
                  더 나은 결제 경험을 제공합니다.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">미션</h3>
                <p className="text-foreground-secondary">
                  안전하고 편리한 전화결제 시스템을 통해 고객의 비즈니스 가치를
                  극대화하고, 최고의 서비스 품질로 신뢰받는 파트너가 됩니다.
                </p>
              </div>
            </div>
          </div>
          <Card className="p-8">
            <div className="aspect-video bg-background-tertiary rounded-lg flex items-center justify-center">
              <svg className="w-16 h-16 text-foreground-tertiary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </Card>
        </div>
      </Section>

      {/* Core Values Section */}
      <Section background="secondary">
        <SectionHeader
          title="핵심 가치"
          subtitle="다삼솔루션이 추구하는 가치입니다"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {values.map((value) => (
            <Card key={value.title} className="text-center p-6">
              <CardContent className="pt-0">
                <div className="w-12 h-12 mx-auto rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-4">
                  {value.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-foreground-secondary">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            더 알아보기
          </h2>
          <p className="text-foreground-secondary mb-8">
            다삼솔루션의 연혁과 오시는 길을 확인해 보세요.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" asChild>
              <Link href="/about/history">연혁 보기</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/about/location">오시는 길</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}
