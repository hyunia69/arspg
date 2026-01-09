# ARSPG 웹사이트 리뉴얼 프로젝트

## 프로젝트 요약

| 항목 | 내용 |
|------|------|
| 프로젝트 | ARSPG.CO.KR 웹사이트 현대화 |
| 목표 | ASP/IIS → Next.js/Vercel 마이그레이션 |
| 디자인 | Linear.app 스타일 다크 테마 |
| 상태 | 설계 완료, 구현 대기 |

## 기술 스택

```
Frontend:  Next.js 14+ (App Router) + TypeScript
Styling:   Tailwind CSS (다크 테마)
Database:  Supabase (PostgreSQL)
Hosting:   Vercel
```

## 디렉토리 구조

```
arspgweb_new/
├── arspg_web_old/        # 레거시 코드 (참조용)
├── claudedocs/
│   ├── reqirement.md     # 요구사항
│   └── DESIGN_INIT.md    # 상세 설계서 ⭐
├── src/                  # (구현 예정)
│   ├── app/             # Next.js App Router
│   ├── components/      # React 컴포넌트
│   └── lib/             # 유틸리티
└── CLAUDE.md            # 이 파일
```

## 핵심 문서

- **상세 설계서**: `claudedocs/DESIGN_INIT.md`
  - Phase별 체크박스로 진행 상황 추적
  - DB 스키마, 컴포넌트 명세 포함
  - Sub-agent 활용 가이드 포함

## 페이지 구조 (신규)

```
/ (홈)              → Hero + Features + CTA
/about              → 회사 소개
/services           → 서비스 개요
  /ars-pg           → ARS 결제
  /ivr              → IVR 시스템
  /vms              → VMS 서비스
/pricing            → 요금제
/contact            → 문의하기
/faq                → FAQ
/notice             → 공지사항
/guide              → 가입 안내
```

## 데이터베이스 테이블

| 테이블 | 용도 |
|--------|------|
| `notices` | 공지사항 |
| `faqs` | FAQ |
| `inquiries` | 문의/신청 |
| `partners` | 파트너사 |
| `company_history` | 회사 연혁 |

## 구현 우선순위

1. **Sprint 1**: Next.js 초기화 + Tailwind + Supabase 연동
2. **Sprint 2**: 랜딩 페이지 (Hero, Features, CTA)
3. **Sprint 3**: 콘텐츠 페이지 (회사, 서비스, 요금)
4. **Sprint 4**: 동적 기능 (FAQ, 공지, 문의폼)
5. **Sprint 5**: SEO + 배포

## Sub-agent 활용

```bash
# 코드베이스 분석
Task(subagent_type="Explore", prompt="...")

# DB 스키마 검토
Task(subagent_type="backend-architect", prompt="...")

# 컴포넌트 설계
Task(subagent_type="frontend-architect", prompt="...")

# 보안 검토
Task(subagent_type="security-engineer", prompt="...")

# 테스트 전략
Task(subagent_type="quality-engineer", prompt="...")
```

## 명령어 참조

```bash
# 프로젝트 초기화 (예정)
npx create-next-app@latest . --typescript --tailwind --app

# 개발 서버
npm run dev

# 빌드
npm run build

# Supabase 타입 생성
npx supabase gen types typescript --project-id <id> > src/lib/supabase/types.ts
```

## 참고

- 기존 사이트: https://www.arspg.co.kr
- 디자인 참조: https://linear.app
- 레거시 코드: `arspg_web_old/` 폴더
