'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { INQUIRY_TYPES } from '@/lib/constants'

interface FormData {
  type: string
  name: string
  email: string
  phone: string
  company: string
  content: string
}

interface FormErrors {
  [key: string]: string
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    type: '',
    name: '',
    email: '',
    phone: '',
    company: '',
    content: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.type) {
      newErrors.type = '문의 유형을 선택해 주세요.'
    }
    if (!formData.name.trim()) {
      newErrors.name = '이름을 입력해 주세요.'
    }
    if (!formData.email.trim()) {
      newErrors.email = '이메일을 입력해 주세요.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식을 입력해 주세요.'
    }
    if (!formData.content.trim()) {
      newErrors.content = '문의 내용을 입력해 주세요.'
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
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSuccess(true)
        setFormData({
          type: '',
          name: '',
          email: '',
          phone: '',
          company: '',
          content: '',
        })
      } else {
        throw new Error('Failed to submit')
      }
    } catch {
      setErrors({ submit: '문의 등록에 실패했습니다. 잠시 후 다시 시도해 주세요.' })
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
          문의가 접수되었습니다
        </h3>
        <p className="text-foreground-secondary text-sm mb-6">
          빠른 시일 내에 담당자가 연락드리겠습니다.
        </p>
        <Button variant="secondary" onClick={() => setIsSuccess(false)}>
          새 문의 작성
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Select
        name="type"
        label="문의 유형"
        options={INQUIRY_TYPES.map((type) => ({
          value: type.value,
          label: type.label,
        }))}
        placeholder="선택해 주세요"
        value={formData.type}
        onChange={handleChange}
        error={errors.type}
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          name="phone"
          type="tel"
          label="연락처"
          placeholder="010-1234-5678"
          value={formData.phone}
          onChange={handleChange}
        />
        <Input
          name="company"
          label="회사명"
          placeholder="(주)회사명"
          value={formData.company}
          onChange={handleChange}
        />
      </div>

      <Textarea
        name="content"
        label="문의 내용"
        placeholder="문의하실 내용을 자세히 적어주세요."
        value={formData.content}
        onChange={handleChange}
        error={errors.content}
        required
        rows={5}
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
        {isSubmitting ? '전송 중...' : '문의하기'}
      </Button>

      <p className="text-xs text-foreground-tertiary text-center">
        제출하시면{' '}
        <a href="/privacy" className="underline hover:text-foreground-secondary">
          개인정보처리방침
        </a>
        에 동의하는 것으로 간주됩니다.
      </p>
    </form>
  )
}
