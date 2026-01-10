import { Metadata } from 'next'
import Link from 'next/link'
import { Section, SectionHeader } from '@/components/layout/Section'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: '요금제',
  description: 'ARSPG 서비스 요금제 안내. 비즈니스 규모에 맞는 최적의 플랜을 선택하세요.',
}

const plans = [
  {
    name: 'Basic',
    price: '50,000',
    period: '월',
    description: '소규모 비즈니스를 위한 기본 플랜',
    features: [
      { text: '월 1,000건 결제 처리', included: true },
      { text: '기본 IVR 시나리오', included: true },
      { text: '이메일 지원', included: true },
      { text: '기본 통계 리포트', included: true },
      { text: '맞춤형 시나리오', included: false },
      { text: 'API 연동', included: false },
      { text: '정기결제 기능', included: false },
      { text: '전담 매니저', included: false },
    ],
    cta: { text: '시작하기', href: '/contact?plan=basic' },
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '150,000',
    period: '월',
    description: '성장하는 비즈니스를 위한 프로 플랜',
    features: [
      { text: '월 10,000건 결제 처리', included: true },
      { text: '기본 IVR 시나리오', included: true },
      { text: '전화 + 이메일 지원', included: true },
      { text: '고급 통계 및 분석', included: true },
      { text: '맞춤형 시나리오', included: true },
      { text: 'API 연동 지원', included: true },
      { text: '정기결제 기능', included: true },
      { text: '전담 매니저', included: false },
    ],
    cta: { text: '시작하기', href: '/contact?plan=pro' },
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: '별도 협의',
    period: null,
    description: '대규모 기업을 위한 맞춤형 플랜',
    features: [
      { text: '무제한 결제 처리', included: true },
      { text: '전용 회선 제공', included: true },
      { text: '24/7 전담 지원', included: true },
      { text: '맞춤형 리포트', included: true },
      { text: '맞춤형 개발 지원', included: true },
      { text: 'API 연동 지원', included: true },
      { text: 'SLA 보장', included: true },
      { text: '온프레미스 옵션', included: true },
    ],
    cta: { text: '문의하기', href: '/contact?plan=enterprise' },
    highlighted: false,
  },
]

const additionalServices = [
  {
    name: 'VMS 발송',
    description: '대량 음성 메시지 발송 서비스',
    price: '25원~/건',
  },
  {
    name: 'TTS 변환',
    description: '텍스트를 음성으로 변환',
    price: '10원~/건',
  },
  {
    name: '추가 회선',
    description: '동시 통화 회선 추가',
    price: '30,000원/회선',
  },
  {
    name: '맞춤 개발',
    description: '특수 기능 개발 및 연동',
    price: '별도 협의',
  },
]

const faqs = [
  {
    question: '플랜 변경은 어떻게 하나요?',
    answer: '언제든지 상위 플랜으로 업그레이드가 가능합니다. 다운그레이드는 결제일 기준으로 다음 달부터 적용됩니다.',
  },
  {
    question: '결제 처리 건수를 초과하면 어떻게 되나요?',
    answer: '기본 제공량 초과 시 건당 추가 요금이 발생합니다. 지속적으로 초과되는 경우 상위 플랜으로 변경을 권장합니다.',
  },
  {
    question: '연간 결제 시 할인이 있나요?',
    answer: '네, 연간 결제 시 2개월 무료 혜택(약 17% 할인)을 제공합니다.',
  },
]

export default function PricingPage() {
  return (
    <>
      {/* Hero Section */}
      <Section className="pt-20 pb-12">
        <div className="max-w-3xl mx-auto text-center">
          <Badge variant="accent" className="mb-4">Pricing</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            비즈니스에 맞는 <span className="text-accent">최적의 플랜</span>
          </h1>
          <p className="text-lg text-foreground-secondary">
            규모에 따라 유연하게 선택할 수 있는 요금제를 제공합니다.
            모든 플랜은 VAT 별도이며, 연간 결제 시 추가 할인이 적용됩니다.
          </p>
        </div>
      </Section>

      {/* Pricing Cards */}
      <Section background="secondary">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={cn(
                'relative flex flex-col',
                plan.highlighted && 'border-accent shadow-glow scale-105 z-10'
              )}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge variant="accent">추천</Badge>
                </div>
              )}

              <CardContent className="flex flex-col h-full pt-8">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline justify-center gap-1">
                    {plan.price !== '별도 협의' && (
                      <span className="text-foreground-tertiary">₩</span>
                    )}
                    <span className="text-4xl font-bold text-foreground">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-foreground-tertiary">/{plan.period}</span>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-foreground-secondary">
                    {plan.description}
                  </p>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature.text} className="flex items-start gap-3 text-sm">
                      {feature.included ? (
                        <svg
                          className="w-5 h-5 text-success flex-shrink-0 mt-0.5"
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
                      ) : (
                        <svg
                          className="w-5 h-5 text-foreground-tertiary flex-shrink-0 mt-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      )}
                      <span className={cn(
                        feature.included ? 'text-foreground-secondary' : 'text-foreground-tertiary'
                      )}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={plan.highlighted ? 'primary' : 'secondary'}
                  className="w-full mt-auto"
                  asChild
                >
                  <Link href={plan.cta.href}>{plan.cta.text}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Additional Services */}
      <Section>
        <SectionHeader
          title="부가 서비스"
          subtitle="필요에 따라 추가할 수 있는 서비스"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {additionalServices.map((service) => (
            <Card key={service.name}>
              <CardContent className="text-center">
                <h3 className="font-semibold text-foreground mb-1">{service.name}</h3>
                <p className="text-xs text-foreground-secondary mb-3">{service.description}</p>
                <p className="text-lg font-bold text-accent">{service.price}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* FAQ Section */}
      <Section background="secondary">
        <SectionHeader
          title="자주 묻는 질문"
          subtitle="요금제 관련 궁금한 점을 확인하세요"
        />
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq) => (
            <Card key={faq.question}>
              <CardContent>
                <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                <p className="text-sm text-foreground-secondary">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            어떤 플랜이 적합할지 모르시겠나요?
          </h2>
          <p className="text-foreground-secondary mb-8">
            전문 상담사가 비즈니스 상황에 맞는 최적의 플랜을 추천해 드립니다.
            부담 없이 문의해 주세요.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" asChild>
              <Link href="/contact">무료 상담 신청</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/faq">FAQ 더 보기</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}
