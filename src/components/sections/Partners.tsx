import { Section, SectionHeader } from '@/components/layout/Section'

const partnerLogos = [
  { name: 'SK텔레콤', initial: 'SK' },
  { name: 'KT', initial: 'KT' },
  { name: 'LG유플러스', initial: 'LG' },
  { name: '신한카드', initial: '신한' },
  { name: '삼성카드', initial: '삼성' },
  { name: 'KB국민카드', initial: 'KB' },
  { name: '현대카드', initial: '현대' },
  { name: 'BC카드', initial: 'BC' },
]

export function Partners() {
  return (
    <Section background="secondary">
      <SectionHeader
        title="신뢰할 수 있는 파트너사"
        subtitle="대한민국 대표 통신사 및 카드사와 함께합니다"
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
        {partnerLogos.map((partner) => (
          <div
            key={partner.name}
            className="flex items-center justify-center h-20 rounded-lg border border-border bg-background-secondary hover:bg-background-elevated hover:border-border-secondary transition-colors group"
          >
            <div className="text-lg font-bold text-foreground-tertiary group-hover:text-foreground-secondary transition-colors">
              {partner.initial}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-foreground-tertiary">
        그 외 다수의 기업과 함께 성장하고 있습니다
      </p>
    </Section>
  )
}
