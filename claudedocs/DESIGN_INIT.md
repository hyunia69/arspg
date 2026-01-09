# ARSPG.CO.KR 웹사이트 리뉴얼 설계서

## 프로젝트 개요

| 항목 | 내용 |
|------|------|
| 프로젝트명 | ARSPG 웹사이트 리뉴얼 |
| 현재 URL | www.arspg.co.kr |
| 목표 | 레거시 ASP → Next.js 현대화 |
| 디자인 참조 | Linear.app 랜딩 페이지 스타일 |

### 기술 스택 변경

| 구분 | 기존 (AS-IS) | 변경 (TO-BE) |
|------|-------------|--------------|
| 프레임워크 | ASP/VBScript | Next.js 14+ (App Router) |
| 언어 | VBScript/JavaScript | TypeScript |
| 웹서버 | IIS | Vercel Edge |
| 데이터베이스 | MS SQL Server | Supabase (PostgreSQL) |
| 스타일 | CSS/Table 레이아웃 | Tailwind CSS |
| 테마 | 라이트 | 다크 (Linear 스타일) |

---

## Phase 1: 분석 및 기획

### 1.1 기존 사이트 분석

- [x] 기존 코드베이스 구조 파악 (`arspg_web_old/`)
- [x] 페이지 인벤토리 작성 (21개 서브페이지)
- [x] 콘텐츠 추출 및 정리
- [x] 이미지/자산 목록화
- [x] DB 테이블 구조 분석

> 📄 **분석 결과**: `claudedocs/PHASE1_ANALYSIS.md` 참조

**기존 페이지 구조:**
```
홈페이지 (main.htm)
├── 회사소개
│   ├── 회사 소개 (company_intro.htm)
│   ├── 연혁 (company_history.htm)
│   └── 오시는 길 (company_map.htm)
├── 사업분야
│   ├── 사업 영역 (business_area.htm)
│   ├── 파트너사 (business_partner.htm)
│   └── 실적 (business_record.htm)
├── 서비스소개
│   ├── 서비스 개요 (service_summary.htm)
│   ├── 서비스 영역 (service_area.htm)
│   ├── 시스템 구성 (service_system.htm)
│   └── 시나리오 (service_scenario.htm)
├── 고객센터
│   ├── FAQ (customer_faq.htm)
│   ├── 공지사항 (customer_notice.htm)
│   ├── 문의/신청 (customer_apply.htm)
│   └── 가입 안내 (customer_guide.htm)
└── 서비스 체험
    ├── 로그인 (service_login.htm)
    └── 데모 (service_demo.htm)
```

### 1.2 요구사항 정의

- [x] 기능 요구사항 문서화
- [x] 비기능 요구사항 정의 (성능, 보안, 접근성)
- [x] 우선순위 결정

> 📄 **요구사항 상세**: `claudedocs/PHASE1_ANALYSIS.md` 섹션 6, 7, 8 참조

**Sub-agent 활용:**
```bash
# Explore Agent로 기존 코드 분석
Task(subagent_type="Explore", prompt="Analyze arspg_web_old/ structure...")

# Requirements Analyst로 요구사항 정제
Task(subagent_type="requirements-analyst", prompt="Define functional requirements...")
```

---

## Phase 2: 데이터베이스 설계

### 2.1 Supabase 스키마

- [x] Supabase 프로젝트 연결 (ahn supabase - ap-northeast-2)
- [x] 테이블 스키마 설계 (arspg_* 접두사로 5개 테이블 생성)
- [x] RLS 정책 설정 (공개 읽기/삽입 정책 완료)
- [x] 초기 데이터 마이그레이션 (연혁 5건, FAQ 6건, 공지 2건, 파트너 5건)

**테이블 설계:**

```sql
-- 공지사항
CREATE TABLE notices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- FAQ
CREATE TABLE faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question VARCHAR(500) NOT NULL,
  answer TEXT NOT NULL,
  category VARCHAR(50),
  sort_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 문의/신청
CREATE TABLE inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type VARCHAR(50) NOT NULL CHECK (type IN ('service', 'partner', 'apply', 'cost', 'demo', 'other')),
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  email VARCHAR(255) NOT NULL,
  company VARCHAR(100),
  content TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 파트너사
CREATE TABLE partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  logo_url VARCHAR(500),
  website_url VARCHAR(500),
  description TEXT,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 회사 연혁
CREATE TABLE company_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  year INT NOT NULL,
  month INT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

**RLS 정책:**
```sql
-- notices: 공개 읽기
CREATE POLICY "Public read notices" ON notices FOR SELECT USING (is_published = true);

-- faqs: 공개 읽기
CREATE POLICY "Public read faqs" ON faqs FOR SELECT USING (is_published = true);

-- inquiries: 공개 삽입만
CREATE POLICY "Public insert inquiries" ON inquiries FOR INSERT WITH CHECK (true);

-- partners: 공개 읽기
CREATE POLICY "Public read partners" ON partners FOR SELECT USING (is_active = true);
```

**Sub-agent 활용:**
```bash
# Backend Architect로 스키마 검증
Task(subagent_type="backend-architect", prompt="Review and optimize DB schema...")

# Security Engineer로 RLS 정책 검토
Task(subagent_type="security-engineer", prompt="Audit RLS policies for security...")
```

---

## Phase 3: 컴포넌트 아키텍처

### 3.1 디렉토리 구조

- [x] Next.js 프로젝트 초기화
- [x] 컴포넌트 폴더 구조 설정
- [x] Tailwind 설정 (다크 테마)

```
src/
├── app/                        # App Router
│   ├── (marketing)/           # 마케팅 페이지 그룹
│   │   ├── page.tsx           # 홈페이지
│   │   ├── about/             # 회사 소개
│   │   ├── services/          # 서비스 소개
│   │   │   ├── page.tsx
│   │   │   ├── ars-pg/
│   │   │   ├── ivr/
│   │   │   └── vms/
│   │   ├── pricing/           # 요금제
│   │   └── contact/           # 문의하기
│   ├── (support)/             # 고객지원 그룹
│   │   ├── faq/
│   │   ├── notice/
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   └── guide/
│   ├── demo/                  # 데모
│   ├── api/                   # API Routes
│   ├── layout.tsx             # 루트 레이아웃
│   └── globals.css            # 글로벌 스타일
│
├── components/
│   ├── layout/                # 레이아웃 컴포넌트
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Navigation.tsx
│   │   └── Section.tsx
│   ├── ui/                    # 기본 UI 컴포넌트
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Input.tsx
│   │   ├── Textarea.tsx
│   │   ├── Select.tsx
│   │   ├── Accordion.tsx
│   │   └── Modal.tsx
│   ├── sections/              # 페이지 섹션
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── Services.tsx
│   │   ├── Partners.tsx
│   │   ├── Pricing.tsx
│   │   ├── FAQ.tsx
│   │   ├── Contact.tsx
│   │   └── CTA.tsx
│   └── forms/                 # 폼 컴포넌트
│       ├── ContactForm.tsx
│       └── DemoRequestForm.tsx
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts          # 클라이언트 인스턴스
│   │   ├── server.ts          # 서버 인스턴스
│   │   └── types.ts           # 타입 정의
│   ├── utils.ts               # 유틸리티 함수
│   └── constants.ts           # 상수
│
├── hooks/                     # 커스텀 훅
│   ├── useSupabase.ts
│   └── useMediaQuery.ts
│
└── types/                     # 타입 정의
    └── index.ts
```

### 3.2 컴포넌트 설계 (Linear 스타일)

- [x] 레이아웃 컴포넌트 구현
- [x] UI 컴포넌트 구현
- [x] 섹션 컴포넌트 구현

**Hero 컴포넌트 명세:**
```typescript
interface HeroProps {
  headline: string;
  subheadline: string;
  primaryCTA: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
  image?: string;
}
```

**Features 컴포넌트 명세:**
```typescript
interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface FeaturesProps {
  title: string;
  subtitle?: string;
  features: Feature[];
  layout?: 'grid' | 'list';
}
```

**Pricing 컴포넌트 명세:**
```typescript
interface PricingPlan {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  cta: {
    text: string;
    href: string;
  };
}

interface PricingProps {
  title: string;
  subtitle?: string;
  plans: PricingPlan[];
}
```

**Sub-agent 활용:**
```bash
# Frontend Architect로 컴포넌트 설계 검증
Task(subagent_type="frontend-architect", prompt="Design accessible React components...")

# Quality Engineer로 테스트 전략 수립
Task(subagent_type="quality-engineer", prompt="Define component testing strategy...")
```

---

## Phase 4: 페이지 구현

### 4.1 마케팅 페이지

- [x] 홈페이지 (Hero + Features + Partners + CTA)
- [x] 회사 소개 페이지 (/about, /about/history, /about/location)
- [x] 서비스 페이지 (/services, /services/ars-pg, /services/ivr, /services/vms)
- [x] 요금제 페이지 (/pricing)
- [x] 문의하기 페이지 (/contact)

### 4.2 고객지원 페이지

- [x] FAQ 페이지 (아코디언 UI + Supabase 연동)
- [x] 공지사항 목록/상세 (/notice, /notice/[id])
- [x] 가입 안내 페이지 (/guide)

### 4.3 데모 페이지

- [ ] 데모 로그인
- [ ] 데모 대시보드 (선택적)

### 4.4 데이터 페칭 전략

| 페이지 | 전략 | 재검증 주기 |
|--------|------|------------|
| 홈페이지 | ISR | 1시간 |
| 서비스 | Static | - |
| FAQ | ISR | 1시간 |
| 공지사항 | SSR | 실시간 |
| 문의하기 | CSR + Server Action | - |

**Sub-agent 활용:**
```bash
# Python Expert (또는 해당 언어 Expert)로 API 구현
Task(subagent_type="backend-architect", prompt="Implement Supabase data fetching...")

# Refactoring Expert로 코드 최적화
Task(subagent_type="refactoring-expert", prompt="Optimize Next.js data fetching patterns...")
```

---

## Phase 5: 최적화 및 배포

### 5.1 SEO 최적화

- [x] 메타데이터 설정 (title, description, og:*)
- [x] sitemap.xml 자동 생성
- [x] robots.txt 설정
- [x] 구조화 데이터 (JSON-LD)

```typescript
// app/layout.tsx
export const metadata: Metadata = {
  title: {
    default: 'ARSPG - ARS 전화결제 전문 솔루션',
    template: '%s | ARSPG'
  },
  description: 'ARS 전화결제, ARS 호스팅, IVR/VMS 시스템 전문업체 ARSPG',
  keywords: ['ARS', '전화결제', 'ARS호스팅', 'IVR', 'VMS', '다삼솔루션'],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://www.arspg.co.kr',
    siteName: 'ARSPG',
  },
};
```

### 5.2 성능 최적화

- [x] 이미지 최적화 (next/image)
- [x] 폰트 최적화 (next/font)
- [x] 코드 스플리팅
- [ ] Lighthouse 90+ 점수 달성

### 5.3 Vercel 배포

- [ ] Vercel 프로젝트 연결
- [x] 환경 변수 설정 (.env.local, vercel.json)
- [ ] 프로덕션 배포
- [ ] 도메인 연결 (www.arspg.co.kr)
- [ ] HTTPS 인증서 (자동)

> 📄 **배포 가이드**: `claudedocs/DEPLOYMENT_GUIDE.md` 참조

**환경 변수:**
```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

**Sub-agent 활용:**
```bash
# Performance Engineer로 성능 최적화
Task(subagent_type="performance-engineer", prompt="Optimize Next.js performance...")

# DevOps Architect로 배포 파이프라인 구성
Task(subagent_type="devops-architect", prompt="Setup Vercel deployment pipeline...")
```

---

## Phase 6: 테스트 및 검증

### 6.1 테스트 전략

- [ ] 단위 테스트 (Vitest)
- [ ] 컴포넌트 테스트 (Testing Library)
- [ ] E2E 테스트 (Playwright)
- [ ] 접근성 테스트 (axe-core)

### 6.2 검증 체크리스트

- [ ] 모든 기존 콘텐츠 마이그레이션 완료
- [ ] 모든 링크 정상 작동
- [ ] 반응형 디자인 검증 (모바일/태블릿/데스크톱)
- [ ] 크로스 브라우저 테스트 (Chrome, Safari, Firefox, Edge)
- [ ] 폼 제출 테스트
- [ ] 데이터베이스 연동 테스트
- [ ] SEO 메타데이터 검증
- [ ] 성능 메트릭 검증

**Sub-agent 활용:**
```bash
# Quality Engineer로 테스트 실행
Task(subagent_type="quality-engineer", prompt="Execute comprehensive test suite...")

# Security Engineer로 보안 감사
Task(subagent_type="security-engineer", prompt="Perform security audit...")
```

---

## 구현 타임라인 (체크박스)

### Sprint 1: 기반 구축
- [ ] Next.js 프로젝트 초기화
- [ ] TypeScript 설정
- [ ] Tailwind CSS 설정 (다크 테마)
- [ ] Supabase 연동
- [ ] 기본 레이아웃 컴포넌트

### Sprint 2: 랜딩 페이지
- [ ] Hero 섹션
- [ ] Features 섹션
- [ ] Services 섹션
- [ ] Partners 섹션
- [ ] CTA 섹션

### Sprint 3: 콘텐츠 페이지
- [ ] 회사 소개
- [ ] 서비스 상세 (ARS-PG, IVR, VMS)
- [ ] 요금제 페이지
- [ ] 문의하기 페이지

### Sprint 4: 동적 기능
- [ ] FAQ 페이지 + Supabase 연동
- [ ] 공지사항 목록/상세
- [ ] 문의 폼 Server Action
- [ ] 초기 데이터 시딩

### Sprint 5: 마무리
- [ ] SEO 최적화
- [ ] 성능 최적화
- [ ] 테스트 작성 및 실행
- [ ] Vercel 배포
- [ ] 도메인 연결

---

## Sub-agent 활용 요약

| 단계 | Agent | 용도 |
|------|-------|------|
| 분석 | `Explore` | 코드베이스 탐색 |
| 요구사항 | `requirements-analyst` | 요구사항 정제 |
| 설계 | `Plan` | 아키텍처 설계 |
| DB 설계 | `backend-architect` | 스키마 최적화 |
| 컴포넌트 | `frontend-architect` | UI 컴포넌트 설계 |
| 보안 | `security-engineer` | RLS/보안 검토 |
| 품질 | `quality-engineer` | 테스트 전략 |
| 성능 | `performance-engineer` | 성능 최적화 |
| 배포 | `devops-architect` | CI/CD 파이프라인 |
| 문서 | `technical-writer` | 문서화 |

---

## 참고 자료

- [Next.js App Router 문서](https://nextjs.org/docs/app)
- [Supabase 문서](https://supabase.com/docs)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
- [Linear.app](https://linear.app) - 디자인 참조
- [Vercel 배포 가이드](https://vercel.com/docs)

---

*최종 수정일: 2026-01-09*
*작성자: Claude AI Assistant*
