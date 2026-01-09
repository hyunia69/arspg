import { Section, SectionHeader } from '@/components/layout/Section'
import { Card, CardContent } from '@/components/ui/Card'
import { ContactForm } from '@/components/forms/ContactForm'
import { CONTACT_INFO } from '@/lib/constants'

export function Contact() {
  return (
    <Section>
      <SectionHeader
        title="문의하기"
        subtitle="궁금한 점이 있으시면 언제든 연락해 주세요"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {/* Contact Info */}
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">
              연락처 정보
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-foreground-secondary">전화</p>
                  <a
                    href={`tel:${CONTACT_INFO.phone}`}
                    className="text-foreground hover:text-accent transition-colors"
                  >
                    {CONTACT_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-foreground-secondary">이메일</p>
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="text-foreground hover:text-accent transition-colors"
                  >
                    {CONTACT_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-foreground-secondary">주소</p>
                  <p className="text-foreground">{CONTACT_INFO.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-foreground-secondary">영업 시간</p>
                  <p className="text-foreground">{CONTACT_INFO.businessHours}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map placeholder */}
          <Card className="overflow-hidden">
            <div className="aspect-video bg-background-tertiary flex items-center justify-center">
              <p className="text-foreground-tertiary text-sm">지도 영역</p>
            </div>
          </Card>
        </div>

        {/* Contact Form */}
        <Card>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>
      </div>
    </Section>
  )
}
