'use client'

import Link from 'next/link'
import { useEffect, useRef, useState, useCallback } from 'react'

export interface HeroProps {
  headline?: string
  subheadline?: string
  primaryCTA?: {
    text: string
    href: string
  }
  secondaryCTA?: {
    text: string
    href: string
  }
}

// Linear 스타일 다중 창 목업 - 3D 겹침 효과 + Parallax + 마우스 반응
function MultiWindowMockup() {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const mockupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  // 스크롤 기반 parallax
  useEffect(() => {
    const handleScroll = () => {
      if (mockupRef.current) {
        const rect = mockupRef.current.getBoundingClientRect()
        const scrollProgress = Math.max(0, Math.min(1, 1 - rect.bottom / (window.innerHeight + rect.height)))
        setScrollY(scrollProgress)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 마우스 반응 3D 효과
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!mockupRef.current) return
    const rect = mockupRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height
    setMousePos({ x: x * 10, y: y * 10 })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setMousePos({ x: 0, y: 0 })
  }, [])

  // 사이드바 창 컴포넌트 - parallax: 느리게 움직임
  const SidebarWindow = ({ delay }: { delay: number }) => (
    <div
      className={`absolute left-0 top-[10%] w-[220px] h-[450px] rounded-xl overflow-hidden border border-white/[0.08] bg-[#0a0a0a] shadow-2xl transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        transform: isVisible
          ? `perspective(2000px) rotateY(${15 + mousePos.x * 0.5}deg) rotateX(${5 - mousePos.y * 0.3}deg) translateY(${scrollY * 30}px) translateX(${mousePos.x * 2}px)`
          : 'perspective(2000px) rotateY(15deg) rotateX(5deg) translateX(-40px)',
        transformOrigin: 'center center',
        transitionDelay: `${delay}ms`,
        zIndex: 10,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)'
      }}
    >
      {/* Window header */}
      <div className="flex items-center gap-2 px-3 py-2.5 border-b border-white/[0.06] bg-[#0f0f0f]">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
      </div>

      {/* Sidebar content */}
      <div className="p-3 space-y-1">
        <div className="flex items-center gap-2 px-2 py-1.5 text-white/80 text-xs font-medium">
          <div className="w-5 h-5 rounded bg-white/10 flex items-center justify-center text-[10px]">A</div>
          <span>ARSPG</span>
        </div>
        <div className="h-px bg-white/[0.06] my-2" />
        <div className="flex items-center gap-2 px-2 py-1.5 rounded bg-white/[0.06] text-white text-xs">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6z" />
          </svg>
          <span>대시보드</span>
        </div>
        {['결제내역', '통계', '고객관리', '설정'].map((item) => (
          <div key={item} className="flex items-center gap-2 px-2 py-1.5 text-white/40 text-xs">
            <div className="w-3.5 h-3.5 rounded bg-white/[0.04]" />
            <span>{item}</span>
          </div>
        ))}
        <div className="h-px bg-white/[0.06] my-2" />
        <div className="px-2 text-[10px] text-white/30 uppercase tracking-wider">최근 결제</div>
        {['PG-2847', 'PG-2846', 'PG-2845'].map((id) => (
          <div key={id} className="flex items-center gap-2 px-2 py-1 text-white/50 text-xs">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/60" />
            <span>{id}</span>
          </div>
        ))}
      </div>
    </div>
  )

  // 메인 대시보드 창 - parallax: 중간 속도
  const MainDashboard = ({ delay }: { delay: number }) => (
    <div
      className={`absolute left-[100px] top-[5%] w-[400px] h-[480px] rounded-xl overflow-hidden border border-white/[0.08] bg-[#0a0a0a] shadow-2xl transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        transform: isVisible
          ? `perspective(2000px) rotateY(${8 + mousePos.x * 0.3}deg) rotateX(${3 - mousePos.y * 0.2}deg) translateY(${scrollY * 50}px) translateX(${mousePos.x * 3}px)`
          : 'perspective(2000px) rotateY(8deg) rotateX(3deg) translateY(40px)',
        transformOrigin: 'center center',
        transitionDelay: `${delay}ms`,
        zIndex: 20,
        boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.05)'
      }}
    >
      {/* Window header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06] bg-[#0f0f0f]">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="text-[10px] text-white/40">대시보드</span>
        <div className="w-10" />
      </div>

      {/* Dashboard content */}
      <div className="p-4 space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06]">
            <div className="text-[10px] text-white/40 mb-1">오늘 결제</div>
            <div className="text-lg font-semibold text-white">₩2,847,000</div>
            <div className="text-[10px] text-emerald-400/80 mt-0.5">+12.5%</div>
          </div>
          <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06]">
            <div className="text-[10px] text-white/40 mb-1">결제 건수</div>
            <div className="text-lg font-semibold text-white">156건</div>
            <div className="text-[10px] text-emerald-400/80 mt-0.5">+8.3%</div>
          </div>
        </div>

        {/* Chart */}
        <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06]">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs text-white">실시간 결제</span>
            <span className="text-[10px] text-white/40">24h</span>
          </div>
          <div className="h-24 flex items-end gap-[2px]">
            {[30, 50, 35, 65, 45, 80, 60, 75, 50, 65, 85, 70, 60, 75, 80, 65, 55, 70, 60, 75].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-gradient-to-t from-white/15 to-white/35 rounded-sm"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>

        {/* Recent list */}
        <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06]">
          <div className="text-xs text-white mb-2">최근 결제</div>
          {[
            { id: 'PG-2847', amount: '₩89,000', time: '방금' },
            { id: 'PG-2846', amount: '₩156,000', time: '2분 전' },
          ].map((tx) => (
            <div key={tx.id} className="flex justify-between items-center py-1.5 border-b border-white/[0.04] last:border-0">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-emerald-400/10 flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-xs text-white">{tx.id}</span>
              </div>
              <span className="text-xs text-white/60">{tx.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  // 상세 화면 창 - parallax: 빠르게 움직임 (전면)
  const DetailWindow = ({ delay }: { delay: number }) => (
    <div
      className={`absolute right-0 top-0 w-[380px] h-[500px] rounded-xl overflow-hidden border border-white/[0.08] bg-[#0a0a0a] shadow-2xl transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        transform: isVisible
          ? `perspective(2000px) rotateY(${-5 + mousePos.x * 0.2}deg) rotateX(${2 - mousePos.y * 0.15}deg) translateY(${scrollY * 70}px) translateX(${mousePos.x * 4}px)`
          : 'perspective(2000px) rotateY(-5deg) rotateX(2deg) translateX(40px)',
        transformOrigin: 'center center',
        transitionDelay: `${delay}ms`,
        zIndex: 30,
        boxShadow: '0 35px 70px -18px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.05), 0 0 80px -20px rgba(255, 255, 255, 0.03)'
      }}
    >
      {/* Window header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06] bg-[#0f0f0f]">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="text-[10px] text-white/40">결제 상세</span>
        <div className="w-10" />
      </div>

      {/* Detail content */}
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-400/10 flex items-center justify-center">
            <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <div className="text-white font-medium">PG-2847</div>
            <div className="text-xs text-white/40">2024-01-10 14:32:15</div>
          </div>
          <div className="ml-auto px-2 py-1 rounded bg-emerald-400/10 text-emerald-400 text-[10px]">완료</div>
        </div>

        {/* Amount */}
        <div className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.06] text-center">
          <div className="text-[10px] text-white/40 mb-1">결제 금액</div>
          <div className="text-2xl font-bold text-white">₩89,000</div>
        </div>

        {/* Details */}
        <div className="space-y-2">
          {[
            { label: '카드사', value: '신한카드' },
            { label: '카드번호', value: '**** **** **** 1234' },
            { label: '할부', value: '일시불' },
            { label: '승인번호', value: '12345678' },
          ].map((item) => (
            <div key={item.label} className="flex justify-between py-2 border-b border-white/[0.04]">
              <span className="text-xs text-white/40">{item.label}</span>
              <span className="text-xs text-white">{item.value}</span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <button className="flex-1 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs text-white/60">
            영수증 출력
          </button>
          <button className="flex-1 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs text-white/60">
            취소 요청
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div
      ref={mockupRef}
      className="relative mt-16 md:mt-24 h-[500px] md:h-[550px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Linear 스타일 글로우 효과 + 컬러 악센트 */}
      <div className="absolute inset-0 bg-gradient-radial from-white/[0.03] via-transparent to-transparent blur-3xl" />
      {/* 에메랄드/틸 글로우 - 왼쪽 */}
      <div
        className="absolute top-[20%] left-[10%] w-[600px] h-[500px] rounded-full opacity-[0.35] blur-[80px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(20, 184, 166, 1) 0%, rgba(52, 211, 153, 0.5) 40%, transparent 70%)',
          transform: `translateX(${mousePos.x * 3}px) translateY(${mousePos.y * 3}px)`
        }}
      />
      {/* 인디고/퍼플 글로우 - 오른쪽 */}
      <div
        className="absolute top-[30%] right-[5%] w-[550px] h-[450px] rounded-full opacity-[0.30] blur-[80px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(99, 102, 241, 1) 0%, rgba(139, 92, 246, 0.5) 40%, transparent 70%)',
          transform: `translateX(${mousePos.x * -2}px) translateY(${mousePos.y * 4}px)`
        }}
      />
      {/* 중앙 화이트 글로우 */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full opacity-25 blur-[100px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(255,255,255,0.2) 0%, transparent 70%)',
          transform: `translate(-50%, -50%) translateX(${mousePos.x * 5}px) translateY(${mousePos.y * 5}px)`
        }}
      />

      {/* Container with perspective */}
      <div className="relative mx-auto max-w-6xl h-full px-4" style={{ perspective: '2000px', transformStyle: 'preserve-3d' }}>
        {/* Three windows with staggered animation and parallax */}
        <div className="relative h-full hidden md:block" style={{ transformStyle: 'preserve-3d' }}>
          <SidebarWindow delay={400} />
          <MainDashboard delay={600} />
          <DetailWindow delay={800} />
        </div>

        {/* Mobile: Single window */}
        <div className="relative h-full md:hidden flex justify-center">
          <div
            className={`w-full max-w-[350px] h-[450px] rounded-xl overflow-hidden border border-white/[0.08] bg-[#0a0a0a] shadow-2xl transition-all duration-1000 ease-smooth ${
              isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
            }`}
            style={{
              transform: isVisible ? 'perspective(1000px) rotateX(5deg)' : 'perspective(1000px) rotateX(5deg) translateY(40px)',
              transformOrigin: 'center top',
              transitionDelay: '500ms'
            }}
          >
            {/* Mobile dashboard content */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06] bg-[#0f0f0f]">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              </div>
              <span className="text-[10px] text-white/40">ARSPG Dashboard</span>
              <div className="w-10" />
            </div>
            <div className="p-4 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                  <div className="text-[10px] text-white/40">오늘 결제</div>
                  <div className="text-base font-semibold text-white mt-1">₩2.8M</div>
                </div>
                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                  <div className="text-[10px] text-white/40">결제 건수</div>
                  <div className="text-base font-semibold text-white mt-1">156건</div>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                <div className="h-20 flex items-end gap-[2px]">
                  {[30, 50, 35, 65, 45, 80, 60, 75, 50, 65, 85, 70, 60, 75, 80].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-white/15 to-white/35 rounded-sm"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient fade */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black via-black/90 to-transparent pointer-events-none" />
    </div>
  )
}

export function Hero({
  headline = 'ARS 전화결제의 새로운 기준',
  subheadline = '15년 이상의 ARS/IVR 전문 노하우로 안정적이고 편리한 전화결제 솔루션을 제공합니다. 카드사 직접 연동부터 VMS까지, 당신의 비즈니스에 맞는 최적의 솔루션을 만나보세요.',
  primaryCTA = { text: '무료 상담 신청', href: '/contact' },
  secondaryCTA = { text: '서비스 알아보기', href: '/services' },
}: HeroProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] via-transparent to-transparent" />

      {/* 컬러 글로우 효과 - Hero 전체 배경 */}
      <div
        className="absolute top-[15%] left-[5%] w-[700px] h-[600px] rounded-full opacity-[0.25] blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(20, 184, 166, 1) 0%, rgba(52, 211, 153, 0.4) 50%, transparent 75%)' }}
      />
      <div
        className="absolute top-[25%] right-[0%] w-[650px] h-[550px] rounded-full opacity-[0.22] blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(99, 102, 241, 1) 0%, rgba(139, 92, 246, 0.4) 50%, transparent 75%)' }}
      />

      {/* Very subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
        }}
      />

      <div className="container-custom relative z-10 pt-20 md:pt-28">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge - Minimal style */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/[0.08] mb-8 transition-all duration-1000 ease-smooth ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
            </span>
            <span className="text-sm text-white/70 font-medium">
              신규 고객 첫 달 무료
            </span>
          </div>

          {/* Headline - Large, bold, clean */}
          <h1
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] transition-all duration-1000 ease-smooth delay-100 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {headline}
          </h1>

          {/* Subheadline */}
          <p
            className={`mt-6 text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 ease-smooth delay-200 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {subheadline}
          </p>

          {/* CTAs - Clean, minimal */}
          <div
            className={`mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 ease-smooth delay-300 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Link
              href={primaryCTA.href}
              className="inline-flex items-center justify-center h-12 px-8 text-base font-medium text-black bg-white rounded-xl hover:bg-white/90 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              {primaryCTA.text}
            </Link>
            <Link
              href={secondaryCTA.href}
              className="group inline-flex items-center justify-center h-12 px-6 text-base font-medium text-white/70 hover:text-white transition-all duration-300"
            >
              {secondaryCTA.text}
              <svg
                className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Multi-Window Product Mockup - Linear Style */}
        <MultiWindowMockup />

        {/* Stats - Below mockup */}
        <div
          className={`mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-3xl mx-auto pb-16 transition-all duration-1000 ease-smooth delay-700 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {[
            { value: '15+', label: '서비스 운영 연수' },
            { value: '500+', label: '누적 고객사' },
            { value: '99.9%', label: '서비스 가동률' },
            { value: '24/7', label: '기술 지원' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                {stat.value}
              </div>
              <div className="mt-2 text-sm text-white/40">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
