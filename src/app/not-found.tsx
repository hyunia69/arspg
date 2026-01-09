import Link from 'next/link'
import { Section } from '@/components/layout/Section'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <Section className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-accent mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          페이지를 찾을 수 없습니다
        </h2>
        <p className="text-foreground-secondary mb-8 max-w-md mx-auto">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
          주소를 다시 확인해 주세요.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="primary" asChild>
            <Link href="/">홈으로 가기</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contact">문의하기</Link>
          </Button>
        </div>
      </div>
    </Section>
  )
}
