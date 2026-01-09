import Link from 'next/link'
import { Button } from '@/components/ui/Button'

interface CTAProps {
  title?: string
  description?: string
  primaryCTA?: {
    text: string
    href: string
  }
  secondaryCTA?: {
    text: string
    href: string
  }
}

export function CTA({
  title = '지금 바로 시작하세요',
  description = '무료 상담을 통해 비즈니스에 최적화된 ARS 솔루션을 만나보세요. 전문 컨설턴트가 1:1로 상담해 드립니다.',
  primaryCTA = { text: '무료 상담 신청', href: '/contact' },
  secondaryCTA = { text: '요금제 확인', href: '/pricing' },
}: CTAProps) {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-background to-background" />

      {/* Glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight text-balance">
            {title}
          </h2>
          <p className="mt-4 text-lg text-foreground-secondary max-w-xl mx-auto text-balance">
            {description}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" size="lg" asChild>
              <Link href={primaryCTA.href}>{primaryCTA.text}</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href={secondaryCTA.href}>{secondaryCTA.text}</Link>
            </Button>
          </div>

          {/* Trust badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
            <div className="flex items-center gap-2 text-foreground-tertiary">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-sm">PCI-DSS 인증</span>
            </div>
            <div className="flex items-center gap-2 text-foreground-tertiary">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm">24시간 기술 지원</span>
            </div>
            <div className="flex items-center gap-2 text-foreground-tertiary">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm">99.9% 가동률 보장</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
