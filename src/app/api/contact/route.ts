import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { InquiryInsert, InquiryType } from '@/lib/supabase/types'

const VALID_INQUIRY_TYPES: InquiryType[] = ['service', 'partner', 'apply', 'cost', 'demo', 'other']

interface ContactFormData {
  type: string
  name: string
  email: string
  phone?: string
  company?: string
  content: string
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function sanitizeInput(input: string): string {
  return input.trim().replace(/<[^>]*>/g, '')
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json()

    // 필수 필드 검증
    if (!body.type || !body.name || !body.email || !body.content) {
      return NextResponse.json(
        { error: '필수 항목을 모두 입력해 주세요.' },
        { status: 400 }
      )
    }

    // 문의 유형 검증
    if (!VALID_INQUIRY_TYPES.includes(body.type as InquiryType)) {
      return NextResponse.json(
        { error: '올바른 문의 유형을 선택해 주세요.' },
        { status: 400 }
      )
    }

    // 이메일 형식 검증
    if (!validateEmail(body.email)) {
      return NextResponse.json(
        { error: '올바른 이메일 형식을 입력해 주세요.' },
        { status: 400 }
      )
    }

    // 입력값 정제
    const inquiry: InquiryInsert = {
      type: body.type as InquiryType,
      name: sanitizeInput(body.name),
      email: sanitizeInput(body.email),
      phone: body.phone ? sanitizeInput(body.phone) : null,
      company: body.company ? sanitizeInput(body.company) : null,
      content: sanitizeInput(body.content),
      status: 'pending',
    }

    // Supabase에 저장
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from('arspg_inquiries')
      .insert(inquiry)
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: '문의 등록에 실패했습니다. 잠시 후 다시 시도해 주세요.' },
        { status: 500 }
      )
    }

    // TODO: 이메일 알림 발송 (선택적)
    // await sendNotificationEmail(inquiry)

    return NextResponse.json(
      {
        success: true,
        message: '문의가 성공적으로 접수되었습니다.',
        id: data.id,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.' },
      { status: 500 }
    )
  }
}
