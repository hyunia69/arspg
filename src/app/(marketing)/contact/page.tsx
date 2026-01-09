import { Metadata } from 'next'
import { Section } from '@/components/layout/Section'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { ContactForm } from '@/components/forms/ContactForm'
import { CONTACT_INFO } from '@/lib/constants'

export const metadata: Metadata = {
  title: '문의하기',
  description: 'ARSPG 서비스에 대해 궁금한 점이 있으시면 언제든 연락해 주세요. 전문 상담사가 빠르게 답변해 드립니다.',
}

const contactMethods = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    title: '전화 상담',
    description: '평일 09:00 - 18:00',
    value: CONTACT_INFO.phone,
    href: `tel:${CONTACT_INFO.phone}`,
    action: '전화하기',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: '이메일 문의',
    description: '24시간 접수 가능',
    value: CONTACT_INFO.email,
    href: `mailto:${CONTACT_INFO.email}`,
    action: '메일 보내기',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: '방문 상담',
    description: '사전 예약 필요',
    value: CONTACT_INFO.address,
    href: '/about/location',
    action: '오시는 길',
  },
]

const inquiryTypes = [
  { type: '서비스 문의', description: 'ARS-PG, IVR, VMS 서비스에 대한 일반적인 문의' },
  { type: '도입 상담', description: '서비스 도입 절차 및 기간에 대한 상담' },
  { type: '요금 문의', description: '요금제 및 비용에 대한 상세 문의' },
  { type: '기술 지원', description: '기존 고객의 기술적인 문의 및 지원 요청' },
  { type: '파트너 제휴', description: '비즈니스 제휴 및 파트너십 문의' },
  { type: '데모 요청', description: '서비스 데모 및 테스트 요청' },
]

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <Section className="pt-20 pb-12">
        <div className="max-w-3xl mx-auto text-center">
          <Badge variant="accent" className="mb-4">Contact</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            <span className="text-accent">궁금한 점</span>이 있으신가요?
          </h1>
          <p className="text-lg text-foreground-secondary">
            서비스에 대해 궁금한 점이 있으시면 언제든 연락해 주세요.
            전문 상담사가 빠르고 친절하게 답변해 드립니다.
          </p>
        </div>
      </Section>

      {/* Contact Methods */}
      <Section background="secondary" className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {contactMethods.map((method) => (
            <Card key={method.title} className="text-center hover:border-accent/50 transition-colors">
              <CardContent className="pt-8">
                <div className="w-14 h-14 mx-auto rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-4">
                  {method.icon}
                </div>
                <h3 className="font-semibold text-foreground mb-1">{method.title}</h3>
                <p className="text-xs text-foreground-tertiary mb-2">{method.description}</p>
                <p className="text-sm text-foreground-secondary mb-4">{method.value}</p>
                <a
                  href={method.href}
                  className="text-sm text-accent hover:text-accent/80 transition-colors font-medium"
                >
                  {method.action} →
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Contact Form Section */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Form */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">온라인 문의</h2>
            <p className="text-foreground-secondary mb-8">
              아래 양식을 작성해 주시면 담당자가 빠르게 연락드리겠습니다.
            </p>
            <Card>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </div>

          {/* Info */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">문의 유형 안내</h2>
            <p className="text-foreground-secondary mb-8">
              문의 유형에 따라 담당 부서에서 답변을 드립니다.
            </p>
            <div className="space-y-4">
              {inquiryTypes.map((item) => (
                <Card key={item.type}>
                  <CardContent className="py-4">
                    <h3 className="font-semibold text-foreground mb-1">{item.type}</h3>
                    <p className="text-sm text-foreground-secondary">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Response Info */}
      <Section background="secondary">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl font-bold text-foreground mb-4">빠른 응답을 약속드립니다</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl font-bold text-accent mb-2">1시간</div>
              <p className="text-sm text-foreground-secondary">평균 초기 응답 시간</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">24시간</div>
              <p className="text-sm text-foreground-secondary">문의 접수 운영</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">98%</div>
              <p className="text-sm text-foreground-secondary">당일 처리율</p>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
