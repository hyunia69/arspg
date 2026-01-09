import { Metadata } from 'next'
import { Section, SectionHeader } from '@/components/layout/Section'
import { Badge } from '@/components/ui/Badge'
import { createClient } from '@/lib/supabase/server'
import { CompanyHistory } from '@/lib/supabase/types'

export const metadata: Metadata = {
  title: '연혁',
  description: '다삼솔루션의 발자취를 확인하세요. 2009년 설립 이후 ARS 전화결제 분야에서 꾸준히 성장해 왔습니다.',
}

// ISR - 1시간마다 재검증
export const revalidate = 3600

async function getHistory(): Promise<CompanyHistory[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('arspg_company_history')
    .select('*')
    .order('year', { ascending: false })
    .order('month', { ascending: false })

  if (error) {
    console.error('Error fetching history:', error)
    return []
  }

  return data || []
}

// 연도별로 그룹화
function groupByYear(history: CompanyHistory[]): Map<number, CompanyHistory[]> {
  const grouped = new Map<number, CompanyHistory[]>()

  history.forEach((item) => {
    const yearItems = grouped.get(item.year) || []
    yearItems.push(item)
    grouped.set(item.year, yearItems)
  })

  return grouped
}

export default async function HistoryPage() {
  const history = await getHistory()
  const groupedHistory = groupByYear(history)
  const years = Array.from(groupedHistory.keys()).sort((a, b) => b - a)

  return (
    <>
      {/* Hero Section */}
      <Section className="pt-20 pb-12">
        <div className="max-w-3xl mx-auto text-center">
          <Badge variant="accent" className="mb-4">History</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            다삼솔루션의 <span className="text-accent">발자취</span>
          </h1>
          <p className="text-lg text-foreground-secondary">
            2009년 설립 이후, 끊임없는 혁신과 도전으로
            ARS 전화결제 시장을 선도해 왔습니다.
          </p>
        </div>
      </Section>

      {/* Timeline Section */}
      <Section background="secondary">
        <div className="max-w-4xl mx-auto">
          {years.length > 0 ? (
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

              {years.map((year, yearIndex) => {
                const yearItems = groupedHistory.get(year) || []
                const isLeft = yearIndex % 2 === 0

                return (
                  <div key={year} className="relative mb-12 last:mb-0">
                    {/* Year marker */}
                    <div className="flex items-center mb-6">
                      <div className={`
                        relative z-10 flex items-center justify-center
                        md:absolute md:left-1/2 md:-translate-x-1/2
                      `}>
                        <div className="w-16 h-16 rounded-full bg-accent/10 border-2 border-accent flex items-center justify-center">
                          <span className="text-lg font-bold text-accent">{year}</span>
                        </div>
                      </div>
                    </div>

                    {/* Year events */}
                    <div className="space-y-4 pl-10 md:pl-0">
                      {yearItems.map((item, index) => (
                        <div
                          key={item.id}
                          className={`
                            relative md:w-1/2
                            ${isLeft ? 'md:pr-12' : 'md:pl-12 md:ml-auto'}
                          `}
                        >
                          {/* Connector dot */}
                          <div className={`
                            absolute top-3 w-3 h-3 rounded-full bg-border
                            -left-10 md:left-auto
                            ${isLeft ? 'md:-right-1.5' : 'md:-left-1.5'}
                          `} />

                          <div className="bg-background-secondary rounded-lg p-4 border border-border hover:border-accent/30 transition-colors">
                            {item.month && (
                              <span className="text-xs text-accent font-medium">
                                {item.month}월
                              </span>
                            )}
                            <h3 className="font-semibold text-foreground mt-1">
                              {item.title}
                            </h3>
                            {item.description && (
                              <p className="text-sm text-foreground-secondary mt-1">
                                {item.description}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-foreground-secondary">연혁 정보를 불러오는 중입니다...</p>
            </div>
          )}
        </div>
      </Section>

      {/* Future Vision */}
      <Section>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            앞으로의 여정
          </h2>
          <p className="text-foreground-secondary">
            다삼솔루션은 AI 기반 음성인식, 클라우드 인프라 확장,
            글로벌 시장 진출을 통해 더 큰 도약을 준비하고 있습니다.
          </p>
        </div>
      </Section>
    </>
  )
}
