import { Metadata } from 'next'
import Link from 'next/link'
import { Section, SectionHeader } from '@/components/layout/Section'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'VMS 서비스',
  description: '대량 음성 메시지 발송을 위한 VMS(Voice Message Service) 자동 발신 시스템.',
}

const features = [
  {
    title: '대량 발송',
    description: '수만 건의 음성 메시지를 동시에 빠르게 발송할 수 있습니다.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
      </svg>
    ),
  },
  {
    title: 'TTS 지원',
    description: '텍스트를 자연스러운 음성으로 변환하여 개인화된 메시지 발송이 가능합니다.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
      </svg>
    ),
  },
  {
    title: '발송 예약',
    description: '원하는 날짜와 시간에 자동으로 발송되도록 예약할 수 있습니다.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: '결과 리포트',
    description: '발송 성공/실패, 수신확인 등 상세한 발송 결과를 확인할 수 있습니다.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: '녹음 파일 지원',
    description: '전문 성우 녹음 파일을 업로드하여 발송할 수 있습니다.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    ),
  },
  {
    title: 'API 연동',
    description: '자사 시스템과 연동하여 자동화된 발송이 가능합니다.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
]

const useCases = [
  {
    title: '마케팅',
    description: '신제품 출시, 프로모션 안내 등 마케팅 메시지 발송',
    icon: '📢',
  },
  {
    title: '고객 알림',
    description: '예약 확인, 배송 안내, 결제 알림 등 고객 안내',
    icon: '📲',
  },
  {
    title: '긴급 공지',
    description: '시스템 점검, 긴급 상황 안내 등 신속한 공지',
    icon: '🚨',
  },
  {
    title: '설문조사',
    description: '고객 만족도, 서비스 품질 등 전화 설문조사',
    icon: '📊',
  },
]

const pricing = [
  { range: '1,000건 미만', price: '30원/건' },
  { range: '1,000 ~ 10,000건', price: '25원/건' },
  { range: '10,000건 이상', price: '별도 협의' },
]

export default function VmsPage() {
  return (
    <>
      {/* Hero Section */}
      <Section className="pt-20 pb-12">
        <div className="max-w-3xl mx-auto text-center">
          <Badge variant="accent" className="mb-4">VMS Service</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            대량 음성 메시지를<br />
            <span className="text-accent">빠르고 정확하게</span>
          </h1>
          <p className="text-lg text-foreground-secondary leading-relaxed mb-8">
            VMS(Voice Message Service)로 수만 명의 고객에게
            음성 메시지를 동시에 전달하세요.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" asChild>
              <Link href="/contact?service=vms">도입 문의</Link>
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
          subtitle="VMS 서비스의 핵심 기능"
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
      <Section>
        <SectionHeader
          title="활용 분야"
          subtitle="다양한 목적으로 활용되는 VMS"
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

      {/* Pricing Preview */}
      <Section background="secondary">
        <SectionHeader
          title="요금 안내"
          subtitle="발송 건수에 따른 합리적인 요금"
        />
        <div className="max-w-md mx-auto">
          <Card>
            <CardContent className="divide-y divide-border">
              {pricing.map((item) => (
                <div key={item.range} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                  <span className="text-foreground-secondary">{item.range}</span>
                  <span className="font-semibold text-foreground">{item.price}</span>
                </div>
              ))}
            </CardContent>
          </Card>
          <p className="mt-4 text-center text-sm text-foreground-tertiary">
            * VAT 별도, TTS 이용 시 추가 요금 발생
          </p>
        </div>
      </Section>

      {/* How it Works */}
      <Section>
        <SectionHeader
          title="이용 방법"
          subtitle="간단한 3단계로 VMS 발송"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-accent/10 flex items-center justify-center text-accent text-2xl font-bold mb-4">
              1
            </div>
            <h3 className="font-semibold text-foreground mb-2">수신자 등록</h3>
            <p className="text-sm text-foreground-secondary">
              엑셀 파일 업로드 또는 직접 입력으로
              수신자 목록을 등록합니다.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-accent/10 flex items-center justify-center text-accent text-2xl font-bold mb-4">
              2
            </div>
            <h3 className="font-semibold text-foreground mb-2">메시지 작성</h3>
            <p className="text-sm text-foreground-secondary">
              TTS로 텍스트를 입력하거나
              녹음 파일을 업로드합니다.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-accent/10 flex items-center justify-center text-accent text-2xl font-bold mb-4">
              3
            </div>
            <h3 className="font-semibold text-foreground mb-2">발송</h3>
            <p className="text-sm text-foreground-secondary">
              즉시 발송 또는 예약 발송을 선택하고
              결과를 확인합니다.
            </p>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section background="secondary">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            VMS로 효과적인 메시지 전달을 시작하세요
          </h2>
          <p className="text-foreground-secondary mb-8">
            무료 테스트 발송으로 VMS의 효과를 직접 확인해 보세요.
          </p>
          <Button variant="primary" size="lg" asChild>
            <Link href="/contact?service=vms">무료 상담 신청</Link>
          </Button>
        </div>
      </Section>
    </>
  )
}
