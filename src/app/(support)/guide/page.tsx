import { Metadata } from 'next'
import Link from 'next/link'
import { Section, SectionHeader } from '@/components/layout/Section'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: '가입 안내',
  description: 'ARSPG 서비스 가입 절차 및 필요 서류 안내',
}

const steps = [
  {
    step: 1,
    title: '상담 신청',
    description: '홈페이지 또는 전화를 통해 상담을 신청합니다.',
    details: [
      '온라인 문의 양식 작성',
      '전화 상담 (031-777-1087)',
      '비즈니스 요구사항 파악',
    ],
    duration: '당일',
  },
  {
    step: 2,
    title: '요건 분석',
    description: '전문 상담사가 비즈니스에 맞는 솔루션을 제안합니다.',
    details: [
      '서비스 유형 결정 (ARS-PG/IVR/VMS)',
      '예상 이용량 산정',
      '맞춤형 요금 제안',
    ],
    duration: '1~2일',
  },
  {
    step: 3,
    title: '서류 제출',
    description: '서비스 이용에 필요한 서류를 제출합니다.',
    details: [
      '사업자등록증 사본',
      '통장 사본',
      '대표자 신분증 사본',
      '서비스 이용 계약서',
    ],
    duration: '고객 진행',
  },
  {
    step: 4,
    title: '심사 및 계약',
    description: '제출 서류 심사 후 계약을 진행합니다.',
    details: [
      '서류 적격 심사',
      '계약서 작성 및 날인',
      '초기 설정 비용 안내',
    ],
    duration: '1~3일',
  },
  {
    step: 5,
    title: '시스템 구축',
    description: '전용 시스템 및 회선을 구축합니다.',
    details: [
      '전용 번호 할당',
      'IVR 시나리오 구성',
      '결제 시스템 연동',
      '테스트 진행',
    ],
    duration: '3~5일',
  },
  {
    step: 6,
    title: '서비스 오픈',
    description: '모든 준비가 완료되면 서비스를 시작합니다.',
    details: [
      '최종 테스트 확인',
      '서비스 오픈',
      '운영 교육 제공',
      '전담 매니저 배정',
    ],
    duration: '당일',
  },
]

const documents = [
  {
    category: '기본 서류',
    required: true,
    items: [
      '사업자등록증 사본',
      '대표자 신분증 사본',
      '통장 사본 (정산용)',
      '서비스 이용 계약서',
    ],
  },
  {
    category: '추가 서류 (해당 시)',
    required: false,
    items: [
      '위임장 및 위임자 신분증 (대리인 진행 시)',
      '통신판매업 신고증 (쇼핑몰 등)',
      '의료기관 개설 허가증 (의료기관)',
      '기타 업종별 인허가 서류',
    ],
  },
]

const faqs = [
  {
    question: '개인사업자도 가입 가능한가요?',
    answer: '네, 개인사업자도 사업자등록증이 있으면 가입 가능합니다.',
  },
  {
    question: '해외에서도 서비스 이용이 가능한가요?',
    answer: '기본적으로 국내 서비스이나, 해외 결제 연동이 필요한 경우 별도 상담이 필요합니다.',
  },
  {
    question: '계약 기간은 어떻게 되나요?',
    answer: '기본 계약 기간은 1년이며, 자동 갱신됩니다. 월 단위 계약도 가능합니다.',
  },
]

export default function GuidePage() {
  return (
    <>
      {/* Hero Section */}
      <Section className="pt-20 pb-12">
        <div className="max-w-3xl mx-auto text-center">
          <Badge variant="accent" className="mb-4">Guide</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            <span className="text-accent">가입</span> 안내
          </h1>
          <p className="text-lg text-foreground-secondary">
            ARSPG 서비스 가입 절차와 필요 서류를 안내해 드립니다.
            간단한 절차로 빠르게 서비스를 시작하세요.
          </p>
        </div>
      </Section>

      {/* Process Steps */}
      <Section background="secondary">
        <SectionHeader
          title="가입 절차"
          subtitle="6단계로 완료되는 간편한 가입"
        />
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step) => (
              <Card key={step.step} className="relative">
                <CardContent className="pt-8">
                  <div className="absolute -top-3 left-6">
                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-sm font-bold text-background">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-foreground-secondary mb-4">{step.description}</p>
                  <ul className="space-y-1 text-xs text-foreground-tertiary mb-4">
                    {step.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-2">
                        <span className="text-accent mt-0.5">•</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-3 border-t border-border">
                    <span className="text-xs text-foreground-tertiary">
                      소요기간: <span className="text-accent font-medium">{step.duration}</span>
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* Required Documents */}
      <Section>
        <SectionHeader
          title="필요 서류"
          subtitle="서비스 신청에 필요한 서류 목록"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {documents.map((doc) => (
            <Card key={doc.category}>
              <CardContent>
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="font-semibold text-foreground">{doc.category}</h3>
                  {doc.required && (
                    <Badge variant="accent" className="text-xs">필수</Badge>
                  )}
                </div>
                <ul className="space-y-2">
                  {doc.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm">
                      <svg
                        className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                          doc.required ? 'text-success' : 'text-foreground-tertiary'
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-foreground-secondary">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* FAQ Section */}
      <Section background="secondary">
        <SectionHeader
          title="자주 묻는 질문"
          subtitle="가입 관련 궁금한 점"
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
        <div className="text-center mt-8">
          <Button variant="ghost" asChild>
            <Link href="/faq">
              더 많은 FAQ 보기
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </Button>
        </div>
      </Section>

      {/* CTA Section */}
      <Section>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            지금 바로 시작하세요
          </h2>
          <p className="text-foreground-secondary mb-8">
            무료 상담을 신청하시면 전문 상담사가 맞춤형 솔루션을 안내해 드립니다.
            평균 1~2주 내에 서비스 오픈이 가능합니다.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" size="lg" asChild>
              <Link href="/contact">무료 상담 신청</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/pricing">요금제 보기</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}
