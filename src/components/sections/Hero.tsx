import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export interface HeroProps {
  headline?: string
  subheadline?: string
  primaryCTA?: {
    text: string
    href: string
  }
  secondaryCTA?: {
    text: string
    href: string
  }
}

export function Hero({
  headline = 'ARS 전화결제의 새로운 기준',
  subheadline = '15년 이상의 ARS/IVR 전문 노하우로 안정적이고 편리한 전화결제 솔루션을 제공합니다. 카드사 직접 연동부터 VMS까지, 당신의 비즈니스에 맞는 최적의 솔루션을 만나보세요.',
  primaryCTA = { text: '무료 상담 신청', href: '/contact' },
  secondaryCTA = { text: '서비스 알아보기', href: '/services' },
}: HeroProps) {
  return (
    <section className="relative min-h-[calc(100vh-64px)] flex items-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }}
      />

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-stagger">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            <span className="text-sm text-accent font-medium">
              신규 고객 첫 달 무료
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight leading-[1.1]">
            {headline.split(' ').map((word, i) => (
              <span key={i}>
                {word === '새로운' || word === '기준' ? (
                  <span className="text-accent">{word}</span>
                ) : (
                  word
                )}
                {i < headline.split(' ').length - 1 && ' '}
              </span>
            ))}
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-lg md:text-xl text-foreground-secondary max-w-2xl mx-auto leading-relaxed text-balance">
            {subheadline}
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" size="lg" asChild>
              <Link href={primaryCTA.href}>{primaryCTA.text}</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href={secondaryCTA.href}>
                {secondaryCTA.text}
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            {[
              { value: '15+', label: '서비스 운영 연수' },
              { value: '500+', label: '누적 고객사' },
              { value: '99.9%', label: '서비스 가동률' },
              { value: '24/7', label: '기술 지원' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-foreground-tertiary">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-foreground-tertiary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  )
}
