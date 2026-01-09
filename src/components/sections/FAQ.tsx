import Link from 'next/link'
import { Section, SectionHeader } from '@/components/layout/Section'
import { Accordion } from '@/components/ui/Accordion'
import { Button } from '@/components/ui/Button'

interface FAQItem {
  id: string
  question: string
  answer: string
}

interface FAQProps {
  title?: string
  subtitle?: string
  items?: FAQItem[]
  showMoreLink?: boolean
}

const defaultFAQs: FAQItem[] = [
  {
    id: '1',
    question: 'ARS-PG 서비스 도입에 필요한 시간은 얼마나 걸리나요?',
    answer: '기본적인 설정과 연동은 1~2일 내에 완료됩니다. 맞춤형 시나리오나 추가 개발이 필요한 경우 일정이 더 소요될 수 있으며, 상담을 통해 정확한 일정을 안내해 드립니다.',
  },
  {
    id: '2',
    question: '어떤 카드사와 연동이 가능한가요?',
    answer: '국내 주요 카드사(신한, 삼성, KB국민, 현대, BC, 롯데, NH농협, 하나 등)와 모두 연동이 가능합니다. 해외 카드의 경우 별도 문의해 주시기 바랍니다.',
  },
  {
    id: '3',
    question: '정기결제 기능을 사용할 수 있나요?',
    answer: '네, Pro 플랜 이상에서 정기결제 기능을 제공합니다. 월정액 서비스, 구독 서비스 등 다양한 비즈니스 모델에 적용하실 수 있습니다.',
  },
  {
    id: '4',
    question: '보안은 어떻게 보장되나요?',
    answer: 'PCI-DSS 보안 인증을 획득한 시스템으로 운영되며, 카드 정보는 암호화되어 처리됩니다. 또한 실시간 이상 거래 탐지 시스템을 통해 부정 결제를 방지합니다.',
  },
  {
    id: '5',
    question: '기술 지원은 어떻게 받을 수 있나요?',
    answer: 'Basic 플랜은 이메일 지원, Pro 플랜은 전화 및 이메일 지원, Enterprise 플랜은 24/7 전담 지원을 제공합니다. 긴급 상황 발생 시 모든 플랜에서 핫라인을 통한 지원이 가능합니다.',
  },
]

export function FAQ({
  title = '자주 묻는 질문',
  subtitle = '궁금한 점이 있으시다면 FAQ를 확인해 보세요',
  items = defaultFAQs,
  showMoreLink = true,
}: FAQProps) {
  const accordionItems = items.map((item) => ({
    id: item.id,
    title: item.question,
    content: item.answer,
  }))

  return (
    <Section background="secondary">
      <SectionHeader title={title} subtitle={subtitle} />

      <div className="max-w-3xl mx-auto">
        <Accordion items={accordionItems} />

        {showMoreLink && (
          <div className="mt-8 text-center">
            <Button variant="ghost" asChild>
              <Link href="/faq">
                더 많은 FAQ 보기
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
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </Button>
          </div>
        )}
      </div>
    </Section>
  )
}
