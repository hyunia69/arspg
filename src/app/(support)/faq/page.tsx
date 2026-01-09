import { Metadata } from 'next'
import Link from 'next/link'
import { Section, SectionHeader } from '@/components/layout/Section'
import { Accordion } from '@/components/ui/Accordion'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { createClient } from '@/lib/supabase/server'
import { FAQ } from '@/lib/supabase/types'

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'ARSPG 서비스에 대해 자주 묻는 질문과 답변을 확인하세요.',
}

// ISR - 1시간마다 재검증
export const revalidate = 3600

async function getFAQs(): Promise<FAQ[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('arspg_faqs')
    .select('*')
    .eq('is_published', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching FAQs:', error)
    return []
  }

  return data || []
}

// 카테고리별로 그룹화
function groupByCategory(faqs: FAQ[]): Map<string, FAQ[]> {
  const grouped = new Map<string, FAQ[]>()

  faqs.forEach((faq) => {
    const category = faq.category || 'general'
    const categoryFaqs = grouped.get(category) || []
    categoryFaqs.push(faq)
    grouped.set(category, categoryFaqs)
  })

  return grouped
}

const categoryLabels: Record<string, string> = {
  service: '서비스 이용',
  cost: '요금/결제',
  apply: '가입/신청',
  general: '일반 문의',
}

const categoryOrder = ['service', 'apply', 'cost', 'general']

export default async function FAQPage() {
  const faqs = await getFAQs()
  const groupedFAQs = groupByCategory(faqs)

  return (
    <>
      {/* Hero Section */}
      <Section className="pt-20 pb-12">
        <div className="max-w-3xl mx-auto text-center">
          <Badge variant="accent" className="mb-4">FAQ</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            자주 묻는 <span className="text-accent">질문</span>
          </h1>
          <p className="text-lg text-foreground-secondary">
            ARSPG 서비스에 대해 자주 묻는 질문들을 모았습니다.
            원하는 답변을 찾지 못하셨다면 문의해 주세요.
          </p>
        </div>
      </Section>

      {/* FAQ Content */}
      <Section background="secondary">
        <div className="max-w-3xl mx-auto">
          {faqs.length > 0 ? (
            <div className="space-y-10">
              {categoryOrder.map((category) => {
                const categoryFaqs = groupedFAQs.get(category)
                if (!categoryFaqs || categoryFaqs.length === 0) return null

                const accordionItems = categoryFaqs.map((faq) => ({
                  id: faq.id,
                  title: faq.question,
                  content: faq.answer,
                }))

                return (
                  <div key={category}>
                    <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-accent" />
                      {categoryLabels[category] || category}
                    </h2>
                    <Accordion items={accordionItems} />
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-foreground-secondary">FAQ를 불러오는 중입니다...</p>
            </div>
          )}
        </div>
      </Section>

      {/* CTA Section */}
      <Section>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            원하시는 답변을 찾지 못하셨나요?
          </h2>
          <p className="text-foreground-secondary mb-8">
            추가로 궁금한 점이 있으시면 문의해 주세요.
            전문 상담사가 빠르게 답변해 드립니다.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" asChild>
              <Link href="/contact">문의하기</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/guide">가입 안내 보기</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}
