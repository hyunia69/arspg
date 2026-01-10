export const SITE_CONFIG = {
  name: 'ARSPG',
  description: 'ARS 전화결제, ARS 호스팅, IVR/VMS 시스템 전문업체',
  url: 'https://www.arspg.co.kr',
  ogImage: '/og-image.png',
  links: {
    company: '다삼솔루션',
  },
}

interface NavChild {
  title: string
  href: string
}

interface NavItem {
  title: string
  href: string
  children?: NavChild[]
}

export const NAV_ITEMS: NavItem[] = [
  {
    title: '회사소개',
    href: '/about',
    children: [
      { title: '회사 소개', href: '/about' },
      { title: '연혁', href: '/about/history' },
      { title: '오시는 길', href: '/about/location' },
    ],
  },
  {
    title: '서비스',
    href: '/services',
    children: [
      { title: '서비스 개요', href: '/services' },
      { title: 'ARS-PG 결제', href: '/services/ars-pg' },
      { title: 'IVR 시스템', href: '/services/ivr' },
      { title: 'VMS 서비스', href: '/services/vms' },
    ],
  },
  {
    title: '요금제',
    href: '/pricing',
  },
  {
    title: '고객지원',
    href: '/support',
    children: [
      { title: 'FAQ', href: '/faq' },
      { title: '공지사항', href: '/notice' },
      { title: '가입 안내', href: '/guide' },
    ],
  },
  {
    title: '문의하기',
    href: '/contact',
  },
]

export const CONTACT_INFO = {
  phone: '031-777-1087',
  email: 'hyunia69@arspg.com',
  address: '경기도 성남시 중원구 둔촌대로 474 선텍시티 1차 103호',
  businessHours: '평일 09:00 - 18:00',
}

export const INQUIRY_TYPES = [
  { value: 'service', label: '서비스 문의' },
  { value: 'partner', label: '파트너 제휴' },
  { value: 'apply', label: '서비스 신청' },
  { value: 'cost', label: '요금 문의' },
  { value: 'demo', label: '데모 요청' },
  { value: 'other', label: '기타 문의' },
] as const
