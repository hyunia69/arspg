import { Metadata } from 'next'
import Link from 'next/link'
import { Section, SectionHeader } from '@/components/layout/Section'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'IVR 시스템',
  description: '고객 응대 자동화를 위한 맞춤형 IVR(Interactive Voice Response) 음성 안내 시스템.',
}

const features = [
  {
    title: '맞춤형 시나리오',
    description: '비즈니스 특성에 맞는 자유로운 음성 안내 시나리오를 구성할 수 있습니다.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  },
  {
    title: '음성인식(STT)',
    description: '고객의 음성을 인식하여 자연스러운 대화형 안내가 가능합니다.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    ),
  },
  {
    title: '24시간 자동 응대',
    description: '365일 24시간 중단 없는 고객 응대로 서비스 접근성을 높입니다.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: '콜센터 연동',
    description: '기존 콜센터 시스템과 원활하게 연동하여 효율적인 상담 라우팅이 가능합니다.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: 'TTS 음성 합성',
    description: '자연스러운 TTS 기술로 동적인 정보 안내가 가능합니다.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
      </svg>
    ),
  },
  {
    title: '통계 및 분석',
    description: '콜 통계, 응대 시간, 이용 패턴 등 상세한 분석 리포트를 제공합니다.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
]

const useCases = [
  {
    title: '고객센터',
    description: '제품 문의, AS 접수, 배송 조회 등 고객 상담 자동화',
    icon: '🎧',
  },
  {
    title: '예약 시스템',
    description: '병원, 미용실, 식당 등 전화 예약 접수 및 변경',
    icon: '📅',
  },
  {
    title: '정보 안내',
    description: '영업시간, 위치 안내, 이벤트 정보 등 자동 안내',
    icon: 'ℹ️',
  },
  {
    title: '인증/본인확인',
    description: '전화 인증, 본인확인 등 보안 절차 자동화',
    icon: '🔐',
  },
]

const benefits = [
  { value: '60%', label: '상담원 업무량 감소' },
  { value: '24/7', label: '무중단 서비스' },
  { value: '40%', label: '운영 비용 절감' },
  { value: '90%', label: '고객 만족도' },
]

export default function IvrPage() {
  return (
    <>
      {/* Hero Section */}
      <Section className="pt-20 pb-12">
        <div className="max-w-3xl mx-auto text-center">
          <Badge variant="accent" className="mb-4">IVR System</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            고객 응대를<br />
            <span className="text-accent">스마트하게 자동화</span>
          </h1>
          <p className="text-lg text-foreground-secondary leading-relaxed mb-8">
            IVR(Interactive Voice Response) 시스템으로 고객 응대를 자동화하고
            상담원은 더 중요한 업무에 집중할 수 있습니다.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" asChild>
              <Link href="/contact?service=ivr">도입 문의</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/pricing">요금제 보기</Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* Stats Section */}
      <Section background="secondary" className="py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {benefits.map((stat) => (
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

      {/* Features Section */}
      <Section>
        <SectionHeader
          title="주요 기능"
          subtitle="IVR 시스템의 핵심 기능"
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

      {/* Use Cases Section */}
      <Section background="secondary">
        <SectionHeader
          title="활용 분야"
          subtitle="다양한 산업에서 활용되는 IVR"
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

      {/* Scenario Example */}
      <Section>
        <SectionHeader
          title="시나리오 예시"
          subtitle="비즈니스에 맞게 구성하는 IVR 시나리오"
        />
        <div className="max-w-3xl mx-auto">
          <Card className="p-6">
            <div className="space-y-4 font-mono text-sm">
              <div className="text-foreground-secondary">
                <span className="text-accent">[안내]</span> &quot;안녕하세요, ○○○입니다.&quot;
              </div>
              <div className="text-foreground-secondary">
                <span className="text-accent">[안내]</span> &quot;제품 문의는 1번, AS 접수는 2번, 배송 조회는 3번을 눌러주세요.&quot;
              </div>
              <div className="pl-4 border-l-2 border-accent/30 space-y-2">
                <div className="text-foreground-secondary">
                  <span className="text-success">[1번]</span> → 제품 안내 시나리오로 이동
                </div>
                <div className="text-foreground-secondary">
                  <span className="text-success">[2번]</span> → AS 접수 시나리오로 이동
                </div>
                <div className="text-foreground-secondary">
                  <span className="text-success">[3번]</span> → 배송 조회 시나리오로 이동
                </div>
                <div className="text-foreground-secondary">
                  <span className="text-warning">[0번]</span> → 상담원 연결
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* CTA Section */}
      <Section background="secondary">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            맞춤형 IVR 시나리오를 구성해 드립니다
          </h2>
          <p className="text-foreground-secondary mb-8">
            비즈니스 특성에 맞는 최적의 IVR 시나리오를 설계해 드립니다.
            무료 상담으로 시작하세요.
          </p>
          <Button variant="primary" size="lg" asChild>
            <Link href="/contact?service=ivr">무료 상담 신청</Link>
          </Button>
        </div>
      </Section>
    </>
  )
}
