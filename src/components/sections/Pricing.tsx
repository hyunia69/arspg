import Link from 'next/link'
import { Section, SectionHeader } from '@/components/layout/Section'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface PricingPlan {
  name: string
  price: string
  period?: string
  description: string
  features: string[]
  highlighted?: boolean
  cta: {
    text: string
    href: string
  }
}

interface PricingProps {
  title?: string
  subtitle?: string
  plans?: PricingPlan[]
}

const defaultPlans: PricingPlan[] = [
  {
    name: 'Basic',
    price: '50,000',
    period: '월',
    description: '소규모 비즈니스를 위한 기본 플랜',
    features: [
      '월 1,000건 결제 처리',
      '기본 IVR 시나리오',
      '이메일 지원',
      '기본 통계 리포트',
    ],
    cta: { text: '시작하기', href: '/contact?plan=basic' },
  },
  {
    name: 'Pro',
    price: '150,000',
    period: '월',
    description: '성장하는 비즈니스를 위한 프로 플랜',
    features: [
      '월 10,000건 결제 처리',
      '맞춤형 IVR 시나리오',
      '전화 + 이메일 지원',
      '고급 통계 및 분석',
      'API 연동 지원',
      '정기결제 기능',
    ],
    highlighted: true,
    cta: { text: '시작하기', href: '/contact?plan=pro' },
  },
  {
    name: 'Enterprise',
    price: '별도 협의',
    description: '대규모 기업을 위한 맞춤형 플랜',
    features: [
      '무제한 결제 처리',
      '전용 회선 제공',
      '24/7 전담 지원',
      '맞춤형 개발 지원',
      'SLA 보장',
      '온프레미스 옵션',
    ],
    cta: { text: '문의하기', href: '/contact?plan=enterprise' },
  },
]

export function Pricing({
  title = '합리적인 요금제',
  subtitle = '비즈니스 규모에 맞는 최적의 플랜을 선택하세요',
  plans = defaultPlans,
}: PricingProps) {
  return (
    <Section>
      <SectionHeader title={title} subtitle={subtitle} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={cn(
              'relative flex flex-col h-full',
              plan.highlighted && 'border-accent shadow-glow'
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
                  <span className="text-3xl font-bold text-foreground">
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
                  <li key={feature} className="flex items-start gap-3 text-sm">
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
                    <span className="text-foreground-secondary">{feature}</span>
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

      <p className="mt-8 text-center text-sm text-foreground-tertiary">
        모든 요금제는 VAT 별도이며, 연간 결제 시 추가 할인이 적용됩니다.
      </p>
    </Section>
  )
}
