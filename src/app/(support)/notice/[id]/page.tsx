import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Section } from '@/components/layout/Section'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { createClient } from '@/lib/supabase/server'
import { Notice } from '@/lib/supabase/types'

interface PageProps {
  params: Promise<{ id: string }>
}

// SSR - 실시간 데이터
export const dynamic = 'force-dynamic'

async function getNotice(id: string): Promise<Notice | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('arspg_notices')
    .select('*')
    .eq('id', id)
    .eq('is_published', true)
    .single()

  if (error || !data) {
    return null
  }

  return data
}

async function getAdjacentNotices(currentId: string, createdAt: string): Promise<{
  prev: Notice | null
  next: Notice | null
}> {
  const supabase = await createClient()

  // 이전 글 (더 최신)
  const { data: prevData } = await supabase
    .from('arspg_notices')
    .select('*')
    .eq('is_published', true)
    .gt('created_at', createdAt)
    .order('created_at', { ascending: true })
    .limit(1)
    .single()

  // 다음 글 (더 오래된)
  const { data: nextData } = await supabase
    .from('arspg_notices')
    .select('*')
    .eq('is_published', true)
    .lt('created_at', createdAt)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  return {
    prev: prevData || null,
    next: nextData || null,
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const notice = await getNotice(id)

  if (!notice) {
    return {
      title: '공지사항을 찾을 수 없습니다',
    }
  }

  return {
    title: notice.title,
    description: notice.content.replace(/<[^>]*>/g, '').substring(0, 160),
  }
}

function formatDate(dateString: string | null): string {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default async function NoticeDetailPage({ params }: PageProps) {
  const { id } = await params
  const notice = await getNotice(id)

  if (!notice) {
    notFound()
  }

  const { prev, next } = await getAdjacentNotices(id, notice.created_at || '')

  return (
    <>
      {/* Header */}
      <Section className="pt-20 pb-8">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/notice"
            className="inline-flex items-center gap-2 text-foreground-secondary hover:text-accent transition-colors mb-6"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            공지사항 목록
          </Link>
          <Badge variant="accent" className="mb-4">Notice</Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {notice.title}
          </h1>
          <p className="text-foreground-tertiary text-sm">
            {formatDate(notice.created_at)}
          </p>
        </div>
      </Section>

      {/* Content */}
      <Section background="secondary">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardContent className="prose prose-invert max-w-none">
              <div
                className="text-foreground-secondary leading-relaxed whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: notice.content }}
              />
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Navigation */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {prev ? (
              <Link href={`/notice/${prev.id}`}>
                <Card className="hover:border-accent/50 transition-colors h-full">
                  <CardContent className="py-4">
                    <span className="text-xs text-foreground-tertiary">이전 글</span>
                    <p className="text-foreground font-medium truncate mt-1">{prev.title}</p>
                  </CardContent>
                </Card>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link href={`/notice/${next.id}`}>
                <Card className="hover:border-accent/50 transition-colors h-full text-right">
                  <CardContent className="py-4">
                    <span className="text-xs text-foreground-tertiary">다음 글</span>
                    <p className="text-foreground font-medium truncate mt-1">{next.title}</p>
                  </CardContent>
                </Card>
              </Link>
            ) : (
              <div />
            )}
          </div>

          <div className="mt-8 text-center">
            <Button variant="outline" asChild>
              <Link href="/notice">목록으로 돌아가기</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}
