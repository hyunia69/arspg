import { Metadata } from 'next'
import Link from 'next/link'
import { Section, SectionHeader } from '@/components/layout/Section'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'ARS-PG 결제',
  description: '전화 한 통으로 완료되는 안전하고 편리한 ARS 카드 결제 시스템. 카드사 직접 연동, PCI-DSS 보안 인증.',
}

const features = [
  {
    title: '실시간 카드 결제',
    description: '전화를 통해 카드 번호를 입력하면 실시간으로 결제가 처리됩니다. 승인 결과를 즉시 확인할 수 있습니다.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: '정기결제 지원',
    description: '월정액 서비스, 구독 서비스 등에 적합한 자동 정기결제 기능을 제공합니다.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  {
    title: 'PCI-DSS 보안',
    description: '국제 카드결제 보안 표준인 PCI-DSS 인증을 획득하여 카드 정보를 안전하게 처리합니다.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: '카드사 직접 연동',
    description: '국내 모든 카드사와 직접 연동되어 빠르고 안정적인 결제 처리가 가능합니다.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
  },
  {
    title: '다양한 결제 방식',
    description: '일시불, 할부 결제는 물론 복합 결제, 부분 취소 등 다양한 결제 방식을 지원합니다.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: '실시간 알림',
    description: '결제 완료, 취소, 환불 시 SMS/이메일을 통해 즉시 알림을 발송합니다.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
  },
]

const useCases = [
  {
    title: '통신판매',
    description: '쇼핑몰, 홈쇼핑 등 비대면 상거래에서의 안전한 결제 처리',
    icon: '🛒',
  },
  {
    title: '구독 서비스',
    description: '월간/연간 정기 결제가 필요한 구독 기반 서비스',
    icon: '📦',
  },
  {
    title: '유료 상담',
    description: '법률, 의료, 교육 등 유료 전화 상담 서비스',
    icon: '📞',
  },
  {
    title: '후불 결제',
    description: '서비스 이용 후 전화를 통한 간편 후불 결제',
    icon: '💳',
  },
]

const flow = [
  { step: '01', title: '고객 전화', description: '고객이 결제 전용 번호로 전화' },
  { step: '02', title: '안내 음성', description: '자동 음성 안내에 따라 진행' },
  { step: '03', title: '정보 입력', description: '카드 번호, 유효기간 등 입력' },
  { step: '04', title: '결제 승인', description: '실시간 결제 승인 처리' },
  { step: '05', title: '완료 안내', description: '결제 완료 안내 및 SMS 발송' },
]

export default function ArsPgPage() {
  return (
    <>
      {/* Hero Section */}
      <Section className="pt-20 pb-12">
        <div className="max-w-3xl mx-auto text-center">
          <Badge variant="accent" className="mb-4">ARS-PG</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            전화 한 통으로 완료되는<br />
            <span className="text-accent">안전한 카드 결제</span>
          </h1>
          <p className="text-lg text-foreground-secondary leading-relaxed mb-8">
            ARS를 통한 카드 결제 시스템으로, 고객은 전화만으로 간편하게 결제하고
            사업자는 안정적으로 매출을 관리할 수 있습니다.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" asChild>
              <Link href="/contact?service=ars-pg">도입 문의</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/pricing">요금제 보기</Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* Features Section */}
      <Section background="secondary">
        <SectionHeader
          title="주요 기능"
          subtitle="ARS-PG 결제 시스템의 핵심 기능"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardContent>
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-foreground-secondary">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Flow Section */}
      <Section>
        <SectionHeader
          title="결제 프로세스"
          subtitle="간단한 5단계로 완료되는 ARS 결제"
        />
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {flow.map((item, index) => (
              <div key={item.step} className="relative">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold mb-3">
                    {item.step}
                  </div>
                  <h4 className="font-semibold text-foreground text-sm mb-1">{item.title}</h4>
                  <p className="text-xs text-foreground-secondary">{item.description}</p>
                </div>
                {index < flow.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-full w-full h-px bg-border -translate-x-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Use Cases Section */}
      <Section background="secondary">
        <SectionHeader
          title="활용 분야"
          subtitle="다양한 비즈니스에서 활용되는 ARS-PG"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {useCases.map((useCase) => (
            <Card key={useCase.title} className="text-center">
              <CardContent className="pt-8">
                <span className="text-4xl mb-4 block">{useCase.icon}</span>
                <h3 className="font-semibold text-foreground mb-2">{useCase.title}</h3>
                <p className="text-sm text-foreground-secondary">{useCase.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            지금 바로 시작하세요
          </h2>
          <p className="text-foreground-secondary mb-8">
            무료 상담을 통해 비즈니스에 맞는 ARS-PG 솔루션을 안내받으세요.
            전문 상담사가 도입부터 운영까지 함께 합니다.
          </p>
          <Button variant="primary" size="lg" asChild>
            <Link href="/contact?service=ars-pg">무료 상담 신청</Link>
          </Button>
        </div>
      </Section>
    </>
  )
}
