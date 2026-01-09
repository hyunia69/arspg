# Phase 1: 분석 및 기획 결과

## 1. 기존 코드베이스 구조 분석

### 1.1 프로젝트 규모

| 항목 | 수량 | 크기 |
|------|------|------|
| 전체 파일 | 603개 | 17MB |
| ASP 파일 | 68개 | ~53,445줄 |
| HTML/HTM 파일 | 60개 | - |
| 이미지 자산 | 359개 | - |
| JS/CSS 파일 | 10개 | - |

### 1.2 디렉토리 구조

```
arspg_web_old/
├── aspnet_client/         # ASP.NET 클라이언트 라이브러리
├── ccxml/                  # TTS/CCXML 관련 (음성 처리)
├── demo/                   # 데모 및 결제 시스템
│   └── KICC_TEST/         # KICC 결제 게이트웨이
├── flash/                  # Flash 관련 자산
├── img/                    # 메인 이미지 자산 (~200개)
├── inc/                    # 공통 헤더/푸터/메뉴
├── sub/                    # 서브페이지 (회사, 서비스, 고객)
├── _ars/                   # ARS 시스템 관련
├── _common/               # 공통 라이브러리 및 에디터
│   ├── connect.asp        # DB 연결
│   ├── common.lib.asp     # 공통 함수
│   └── easy_editor/       # WYSIWYG 에디터
└── _web/                   # 웹 사이트 관리 영역
    └── sub/               # 관리자 페이지
```

### 1.3 기술 스택 (AS-IS)

| 구분 | 기술 |
|------|------|
| 언어 | Classic ASP (VBScript) |
| 데이터베이스 | MS SQL Server |
| 인코딩 | UTF-8 |
| 웹서버 | IIS |
| 프론트엔드 | HTML4, 인라인 CSS, 기본 JS |
| 결제 | KICC 연동 |

---

## 2. 페이지 인벤토리

### 2.1 메인 사이트 페이지 (21개)

| # | 파일명 | 경로 | 설명 | 유형 |
|---|--------|------|------|------|
| 1 | main.htm | / | 홈페이지 | 정적 |
| 2 | company_intro.htm | /sub/ | 회사 소개 | 정적 |
| 3 | company_history.htm | /sub/ | 회사 연혁 | 정적 |
| 4 | company_map.htm | /sub/ | 오시는 길 | 정적 |
| 5 | business_area.htm | /sub/ | 사업 영역 | 정적 |
| 6 | business_partner.htm | /sub/ | 파트너사 | 정적 |
| 7 | business_record.htm | /sub/ | 실적 | 정적 |
| 8 | service_summary.htm | /sub/ | 서비스 개요 | 정적 |
| 9 | service_area.htm | /sub/ | 서비스 영역 | 정적 |
| 10 | service_system.htm | /sub/ | 시스템 구성 | 정적 |
| 11 | service_scenario.htm | /sub/ | 시나리오 | 정적 |
| 12 | customer_faq.htm | /sub/ | FAQ | 동적 |
| 13 | customer_notice.htm | /sub/ | 공지사항 | 동적 |
| 14 | customer_apply.htm | /sub/ | 문의/신청 | 동적 |
| 15 | customer_guide.htm | /sub/ | 가입 안내 | 정적 |
| 16 | service_login.htm | /sub/ | 로그인 | 동적 |
| 17 | service_demo.htm | /sub/ | 데모 | 동적 |
| 18 | site_map.htm | /sub/ | 사이트맵 | 정적 |
| 19 | print_map.htm | /sub/ | 지도 인쇄 | 정적 |
| 20 | customer_apply_proc.htm | /sub/ | 신청 처리 | 동적 |
| 21 | customer_view.htm | /sub/ | 조회 | 동적 |

### 2.2 관리자 페이지 (13개)

| # | 파일명 | 설명 |
|---|--------|------|
| 1 | admin_notice.htm | 공지사항 관리 |
| 2 | admin_notice_form.htm | 공지사항 작성/수정 |
| 3 | admin_notice_proc.htm | 공지사항 처리 |
| 4 | admin_faq.htm | FAQ 관리 |
| 5 | admin_faq_proc.htm | FAQ 처리 |
| 6 | admin_customer.htm | 고객 관리 |
| 7 | admin_customer_view.htm | 고객 상세 |
| 8 | admin_customer_proc.htm | 고객 처리 |
| 9 | admin_demo.htm | 데모 관리 |

### 2.3 페이지 유형 분류

```
정적 페이지 (15개): 콘텐츠만 표시
├── 회사소개 (3): intro, history, map
├── 사업분야 (3): area, partner, record
├── 서비스소개 (4): summary, area, system, scenario
└── 기타 (5): guide, sitemap, print_map 등

동적 페이지 (6개): DB 연동
├── 고객센터 (3): faq, notice, apply
└── 서비스 (3): login, demo, view
```

---

## 3. 콘텐츠 추출 및 정리

### 3.1 회사 정보

| 항목 | 내용 |
|------|------|
| 회사명 | (주)다삼솔루션 / ARSPG |
| 사업 분야 | ARS 전화결제, IVR, VMS 솔루션 |
| 설립연도 | (확인 필요) |
| 주소 | (확인 필요) |
| 연락처 | (확인 필요) |

### 3.2 서비스 카테고리

1. **ARS-PG (전화결제)**
   - 자동응답시스템 기반 결제
   - 신용카드, 계좌이체 지원
   - KICC 연동

2. **IVR (대화형 음성응답)**
   - 자동 상담 시스템
   - TTS/CCXML 기술 활용

3. **VMS (음성 메시징)**
   - 자동 음성 안내
   - 콜백 서비스

### 3.3 문의 유형 분류

```javascript
// common.lib.asp의 getCumtomerType() 함수 기반
const inquiryTypes = {
  'service': '서비스 문의',
  'partner': '파트너사 문의',
  'apply': '서비스 신청',
  'cost': '비용 문의',
  'demo': '데모 신청',
  'other': '기타 문의'
};
```

---

## 4. 이미지/자산 목록

### 4.1 자산 분포

| 카테고리 | 개수 | 위치 | 설명 |
|---------|------|------|------|
| 메인 UI | 40+ | /img/ | 메뉴, 버튼, 배경 |
| 메뉴 아이콘 | 12+ | /img/m_*.gif | 네비게이션 버튼 |
| 서브페이지 | 150+ | /img/sub_*.gif/jpg | 페이지별 이미지 |
| 버튼/아이콘 | 30+ | /img/bu_*, icon* | UI 요소 |
| 파트너사 로고 | 6+ | /img/partners_*.gif | 파트너 로고 |
| 에디터 아이콘 | 80+ | /_common/easy_editor/img/ | WYSIWYG 에디터 |
| 관리자 UI | 30+ | /_web/images/ | 관리자 페이지 |
| 데모 | 10+ | /demo/img/ | 데모 페이지 |
| ARS | 30+ | /_ars/img/ | ARS 시스템 |

### 4.2 파일 형식

- **GIF**: 메뉴, 버튼, 아이콘 (80%)
- **JPG**: 배경 이미지, 사진 (20%)
- **PNG**: 미사용

### 4.3 마이그레이션 대상

**필수 이관**
- 파트너사 로고 (리브랜딩 필요)
- 회사 관련 이미지 (지도 등)

**재작업 필요**
- 메뉴/버튼 이미지 → Tailwind CSS로 대체
- 배경 이미지 → 다크 테마에 맞게 재작업
- 아이콘 → Lucide/Heroicons로 대체

---

## 5. 데이터베이스 구조 분석

### 5.1 기존 DB 연결 정보

```
Provider: SQLOLEDB.1 (SQL Server)
Server: 211.196.157.119
Database: arspg_web
```

### 5.2 추정 테이블 구조

**user_order (주문)**
| 필드 | 설명 |
|------|------|
| order_no | 주문번호 (PK) |
| user_id | 사용자 ID |
| user_name | 사용자명 |
| product_cd | 상품 코드 |
| product_nm | 상품명 |
| amt | 금액 |
| user_tel | 전화번호 |
| request_type | 요청 유형 (ARS/SMS) |
| approval_date | 승인일시 |
| pay_type | 결제 유형 |
| reply_cd | 응답 코드 |
| order_date | 주문일시 |

**em_smt_tran (SMS 발송)**
| 필드 | 설명 |
|------|------|
| (발신번호) | |
| (수신번호) | |
| (메시지 내용) | |
| (발송 상태) | |

### 5.3 신규 Supabase 테이블 매핑

| 기존 | 신규 Supabase |
|------|---------------|
| (공지사항) | notices |
| (FAQ) | faqs |
| (문의) | inquiries |
| (파트너) | partners |
| (연혁) | company_history |

---

## 6. 기능 요구사항 (Functional Requirements)

### 6.1 공개 사이트 기능

#### FR-001: 홈페이지
- Hero 섹션 (회사 소개 + CTA)
- 주요 서비스 소개
- 파트너사 로고 슬라이더
- 문의하기 CTA

#### FR-002: 회사 소개
- 회사 비전/미션
- 연혁 타임라인
- 오시는 길 (지도 API 연동)

#### FR-003: 서비스 소개
- 서비스 개요 (ARS-PG, IVR, VMS)
- 각 서비스별 상세 페이지
- 시스템 구성도
- 서비스 시나리오

#### FR-004: 요금제
- 요금 플랜 비교 테이블
- 맞춤 견적 문의 CTA

#### FR-005: FAQ
- 카테고리별 필터링
- 아코디언 UI
- 검색 기능 (선택)

#### FR-006: 공지사항
- 목록 (페이지네이션)
- 상세 보기
- 검색 기능 (선택)

#### FR-007: 문의하기
- 문의 유형 선택 (서비스, 파트너, 신청, 비용, 데모, 기타)
- 폼 필드: 이름, 회사명, 전화번호, 이메일, 내용
- 유효성 검증
- Server Action으로 Supabase 저장

#### FR-008: 데모
- 데모 로그인 (선택)
- 샘플 대시보드 (선택)

### 6.2 관리자 기능 (Phase 2 이후)

- 공지사항 CRUD
- FAQ CRUD
- 문의 관리
- 파트너사 관리

---

## 7. 비기능 요구사항 (Non-Functional Requirements)

### 7.1 성능 (Performance)

| 지표 | 목표값 |
|------|--------|
| LCP (Largest Contentful Paint) | < 2.5s |
| FID (First Input Delay) | < 100ms |
| CLS (Cumulative Layout Shift) | < 0.1 |
| Lighthouse Performance | ≥ 90 |
| TTI (Time to Interactive) | < 3.8s |

### 7.2 보안 (Security)

| 항목 | 요구사항 |
|------|----------|
| HTTPS | 필수 (Vercel 자동) |
| CSP | Content Security Policy 적용 |
| XSS | 입력값 Sanitization |
| CSRF | Server Action 토큰 |
| Rate Limiting | API 요청 제한 |
| RLS | Supabase Row Level Security |

### 7.3 접근성 (Accessibility)

| 항목 | 요구사항 |
|------|----------|
| WCAG | 2.1 AA 준수 |
| 키보드 네비게이션 | 전체 사이트 |
| 스크린 리더 | aria-label 적용 |
| 색상 대비 | 4.5:1 이상 |
| Focus 표시 | 명확한 아웃라인 |

### 7.4 반응형 (Responsive)

| 브레이크포인트 | 디바이스 |
|---------------|----------|
| < 640px | 모바일 |
| 640px - 1024px | 태블릿 |
| > 1024px | 데스크톱 |

### 7.5 SEO

| 항목 | 요구사항 |
|------|----------|
| Meta Tags | title, description, og:* |
| Sitemap | 자동 생성 |
| robots.txt | 크롤러 가이드 |
| 구조화 데이터 | JSON-LD (Organization, WebSite) |
| Canonical URL | 중복 방지 |

### 7.6 브라우저 지원

| 브라우저 | 최소 버전 |
|----------|----------|
| Chrome | 최신 2개 버전 |
| Firefox | 최신 2개 버전 |
| Safari | 최신 2개 버전 |
| Edge | 최신 2개 버전 |
| IE | 미지원 |

---

## 8. 우선순위 및 마이그레이션 계획

### 8.1 우선순위 매트릭스

| 우선순위 | 페이지/기능 | 비고 |
|---------|------------|------|
| P0 (필수) | 홈페이지, 회사소개, 서비스, 문의 | 마케팅 핵심 |
| P1 (높음) | FAQ, 공지사항, 요금제 | 고객지원 |
| P2 (중간) | 데모, 가이드 | 선택적 |
| P3 (낮음) | 관리자 페이지 | Phase 2 |

### 8.2 데이터 이관 계획

1. **Phase 1**: 정적 콘텐츠 마이그레이션
   - 회사 정보 텍스트
   - 서비스 설명 텍스트
   - 이미지 자산

2. **Phase 2**: 동적 데이터 마이그레이션
   - FAQ 데이터 → Supabase faqs
   - 공지사항 → Supabase notices
   - 파트너사 → Supabase partners

3. **Phase 3**: 기능 마이그레이션
   - 문의 폼 → Supabase inquiries
   - 데모 시스템 (선택)

---

## 9. 보안 이슈 (발견 사항)

### 9.1 기존 시스템 보안 문제

| 레벨 | 문제 | 위치 | 영향 |
|------|------|------|------|
| 🔴 높음 | DB 연결 정보 평문 저장 | _common/connect.asp | 권한 탈취 |
| 🔴 높음 | 하드코딩된 자격증명 | 여러 파일 | 보안 노출 |
| 🟡 중간 | 입력값 검증 부족 | order_proc.asp | XSS, SQL Injection |
| 🟡 중간 | 세션 관리 미흡 | login_check.asp | 세션 하이재킹 |

### 9.2 신규 시스템 보안 대책

- Supabase RLS로 데이터 접근 제어
- 환경 변수로 민감 정보 관리
- Server Action에서 입력값 검증
- HTTPS 강제 적용

---

## 10. 기술 부채 및 권장사항

### 10.1 주요 문제점

| 문제 | 영향 | 해결책 |
|------|------|--------|
| Classic ASP | 유지보수 어려움 | Next.js 마이그레이션 |
| SQL Server | 라이선스 비용 | Supabase 전환 |
| 테이블 레이아웃 | 비시맨틱 | Flexbox/Grid |
| Flash 의존 | 보안 취약 | HTML5 기술 |
| 인라인 CSS | 관리 어려움 | Tailwind CSS |

### 10.2 마이그레이션 영향도

- ✅ DB 데이터: 직접 마이그레이션 가능
- ⚠️ 비즈니스 로직: 전체 재개발 필요
- ✅ 이미지 자산: CDN 이관 가능
- ⚠️ KICC 결제: Phase 2에서 별도 검토

---

## 11. 다음 단계 (Phase 2)

1. **Supabase 프로젝트 생성**
2. **테이블 스키마 적용** (DESIGN_INIT.md 참조)
3. **RLS 정책 설정**
4. **초기 데이터 시딩**

---

*작성일: 2026-01-09*
*분석 기준: arspg_web_old/ 디렉토리*
