import { Metadata } from 'next'
import Link from 'next/link'
import { Section } from '@/components/layout/Section'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { createClient } from '@/lib/supabase/server'
import { Notice } from '@/lib/supabase/types'

export const metadata: Metadata = {
  title: '공지사항',
  description: 'ARSPG 서비스 관련 공지사항을 확인하세요.',
}

// SSR - 실시간 데이터
export const dynamic = 'force-dynamic'

async function getNotices(): Promise<Notice[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('arspg_notices')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching notices:', error)
    return []
  }

  return data || []
}

function formatDate(dateString: string | null): string {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function isNew(dateString: string | null): boolean {
  if (!dateString) return false
  const date = new Date(dateString)
  const now = new Date()
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
  return diffDays <= 7
}

export default async function NoticePage() {
  const notices = await getNotices()

  return (
    <>
      {/* Hero Section */}
      <Section className="pt-20 pb-12">
        <div className="max-w-3xl mx-auto text-center">
          <Badge variant="accent" className="mb-4">Notice</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            <span className="text-accent">공지</span>사항
          </h1>
          <p className="text-lg text-foreground-secondary">
            ARSPG 서비스의 중요한 소식과 업데이트를 확인하세요.
          </p>
        </div>
      </Section>

      {/* Notice List */}
      <Section background="secondary">
        <div className="max-w-3xl mx-auto">
          {notices.length > 0 ? (
            <div className="space-y-4">
              {notices.map((notice) => (
                <Link key={notice.id} href={`/notice/${notice.id}`}>
                  <Card className="hover:border-accent/50 transition-colors cursor-pointer">
                    <CardContent className="py-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            {isNew(notice.created_at) && (
                              <Badge variant="accent" className="text-xs">NEW</Badge>
                            )}
                            <h3 className="font-semibold text-foreground truncate">
                              {notice.title}
                            </h3>
                          </div>
                          <p className="text-sm text-foreground-secondary line-clamp-2">
                            {notice.content.replace(/<[^>]*>/g, '').substring(0, 100)}...
                          </p>
                        </div>
                        <div className="flex-shrink-0 text-right">
                          <span className="text-sm text-foreground-tertiary">
                            {formatDate(notice.created_at)}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-foreground-secondary">등록된 공지사항이 없습니다.</p>
            </div>
          )}
        </div>
      </Section>
    </>
  )
}
