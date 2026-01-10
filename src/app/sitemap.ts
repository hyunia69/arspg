import { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'
import { SITE_CONFIG } from '@/lib/constants'

// sitemap은 cookies를 사용하지 않는 클라이언트로 데이터를 가져옴
export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.url

  // 정적 페이지 목록
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    // 회사소개
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about/history`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/about/location`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    // 서비스
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services/ars-pg`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/ivr`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/vms`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // 요금제
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // 고객지원
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/notice`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/guide`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    // 문의
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  // 동적 페이지: 공지사항 상세
  let noticePages: MetadataRoute.Sitemap = []

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase environment variables')
    }

    const supabase = createClient(supabaseUrl, supabaseKey)
    const { data: notices } = await supabase
      .from('arspg_notices')
      .select('id, updated_at')
      .eq('is_published', true)
      .order('created_at', { ascending: false })

    if (notices && notices.length > 0) {
      noticePages = notices.map((notice: { id: string; updated_at: string | null }) => ({
        url: `${baseUrl}/notice/${notice.id}`,
        lastModified: notice.updated_at ? new Date(notice.updated_at) : new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.5,
      }))
    }
  } catch (error) {
    // Supabase 연결 실패 시 정적 페이지만 반환
    console.error('Failed to fetch notices for sitemap:', error)
  }

  return [...staticPages, ...noticePages]
}
