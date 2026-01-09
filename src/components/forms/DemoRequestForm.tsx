'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'

interface FormData {
  name: string
  email: string
  phone: string
  company: string
  message: string
}

interface FormErrors {
  [key: string]: string
}

export function DemoRequestForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = '이름을 입력해 주세요.'
    }
    if (!formData.email.trim()) {
      newErrors.email = '이메일을 입력해 주세요.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식을 입력해 주세요.'
    }
    if (!formData.phone.trim()) {
      newErrors.phone = '연락처를 입력해 주세요.'
    }
    if (!formData.company.trim()) {
      newErrors.company = '회사명을 입력해 주세요.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          type: 'demo',
          content: formData.message || '데모 신청합니다.',
        }),
      })

      if (response.ok) {
        setIsSuccess(true)
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          message: '',
        })
      } else {
        throw new Error('Failed to submit')
      }
    } catch {
      setErrors({ submit: '신청에 실패했습니다. 잠시 후 다시 시도해 주세요.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-success/20 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-success"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          데모 신청이 완료되었습니다
        </h3>
        <p className="text-foreground-secondary text-sm mb-6">
          담당자가 확인 후 연락드리겠습니다.
        </p>
        <Button variant="secondary" onClick={() => setIsSuccess(false)}>
          다시 신청하기
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        name="name"
        label="이름"
        placeholder="홍길동"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        required
      />

      <Input
        name="email"
        type="email"
        label="이메일"
        placeholder="example@company.com"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        required
      />

      <Input
        name="phone"
        type="tel"
        label="연락처"
        placeholder="010-1234-5678"
        value={formData.phone}
        onChange={handleChange}
        error={errors.phone}
        required
      />

      <Input
        name="company"
        label="회사명"
        placeholder="(주)회사명"
        value={formData.company}
        onChange={handleChange}
        error={errors.company}
        required
      />

      <Textarea
        name="message"
        label="추가 요청사항"
        placeholder="데모에서 확인하고 싶은 기능이나 요청사항이 있으시면 적어주세요. (선택)"
        value={formData.message}
        onChange={handleChange}
        rows={3}
      />

      {errors.submit && (
        <p className="text-sm text-error">{errors.submit}</p>
      )}

      <Button
        type="submit"
        variant="primary"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? '신청 중...' : '데모 신청하기'}
      </Button>

      <p className="text-xs text-foreground-tertiary text-center">
        신청하시면{' '}
        <a href="/privacy" className="underline hover:text-foreground-secondary">
          개인정보처리방침
        </a>
        에 동의하는 것으로 간주됩니다.
      </p>
    </form>
  )
}
