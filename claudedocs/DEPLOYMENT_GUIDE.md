# ARSPG 웹사이트 배포 가이드

## 목차

1. [사전 요구사항](#사전-요구사항)
2. [Vercel 배포](#vercel-배포)
3. [환경 변수 설정](#환경-변수-설정)
4. [도메인 연결](#도메인-연결)
5. [배포 후 검증](#배포-후-검증)
6. [문제 해결](#문제-해결)

---

## 사전 요구사항

### 필수 계정
- [Vercel](https://vercel.com) 계정
- [GitHub](https://github.com) 계정 (Git 연동 시)
- [Supabase](https://supabase.com) 프로젝트 (이미 설정됨)

### 로컬 환경 확인
```bash
# Node.js 버전 확인 (18.x 이상 권장)
node --version

# 의존성 설치
npm install

# 로컬 빌드 테스트
npm run build

# 로컬 프로덕션 실행
npm run start
```

---

## Vercel 배포

### 방법 1: Vercel CLI 사용

```bash
# Vercel CLI 설치
npm i -g vercel

# 프로젝트 디렉토리에서 실행
cd arspgweb_new
vercel

# 프로덕션 배포
vercel --prod
```

### 방법 2: GitHub 연동 (권장)

1. **GitHub Repository 생성**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: ARSPG website"
   git remote add origin https://github.com/YOUR_USERNAME/arspgweb.git
   git push -u origin main
   ```

2. **Vercel 프로젝트 연결**
   - [Vercel Dashboard](https://vercel.com/dashboard) 접속
   - "Add New..." → "Project" 클릭
   - GitHub repository 선택
   - "Import" 클릭

3. **프로젝트 설정**
   - Framework Preset: `Next.js` (자동 감지)
   - Root Directory: `.` (기본값)
   - Build Command: `npm run build`
   - Output Directory: `.next` (기본값)

---

## 환경 변수 설정

### Vercel Dashboard에서 설정

1. Project Settings → Environment Variables
2. 다음 변수들 추가:

| Variable | Value | Environment |
|----------|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://qscmlmeukklpcvkpojce.supabase.co` | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIs...` | Production, Preview, Development |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGciOiJIUzI1NiIs...` | Production |

> ⚠️ **주의**: `SUPABASE_SERVICE_ROLE_KEY`는 Production 환경에서만 설정하세요.

### 로컬 개발 환경

`.env.local` 파일이 이미 생성되어 있습니다:
```env
NEXT_PUBLIC_SUPABASE_URL=https://qscmlmeukklpcvkpojce.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIs...
```

---

## 도메인 연결

### 1. Vercel에 도메인 추가

1. Project Settings → Domains
2. 도메인 입력: `www.arspg.co.kr`
3. "Add" 클릭

### 2. DNS 설정

도메인 등록 업체에서 다음 DNS 레코드를 설정:

#### A 레코드 (루트 도메인)
```
Type: A
Name: @
Value: 76.76.19.19
TTL: 3600
```

#### CNAME 레코드 (www 서브도메인)
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

### 3. SSL 인증서

- Vercel에서 자동으로 Let's Encrypt SSL 인증서 발급
- 도메인 연결 후 24시간 내 HTTPS 활성화

### 4. 도메인 확인

DNS 전파 확인:
```bash
# DNS 조회
nslookup www.arspg.co.kr

# 또는
dig www.arspg.co.kr
```

---

## 배포 후 검증

### 1. 기본 기능 확인

- [ ] 홈페이지 로드
- [ ] 모든 페이지 네비게이션
- [ ] 반응형 디자인 (모바일/태블릿/데스크톱)
- [ ] 다크 테마 적용

### 2. SEO 검증

```bash
# sitemap.xml 확인
curl https://www.arspg.co.kr/sitemap.xml

# robots.txt 확인
curl https://www.arspg.co.kr/robots.txt
```

### 3. 성능 테스트

- [PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- Chrome DevTools → Lighthouse

**목표 점수:**
- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 90+

### 4. 데이터베이스 연동 확인

- [ ] FAQ 페이지 데이터 로드
- [ ] 공지사항 목록/상세 페이지
- [ ] 문의 폼 제출 테스트

### 5. 보안 헤더 확인

[Security Headers](https://securityheaders.com/) 에서 확인:
- X-Content-Type-Options
- X-Frame-Options
- X-XSS-Protection
- Referrer-Policy

---

## 문제 해결

### 빌드 실패

```bash
# 로컬에서 빌드 오류 확인
npm run build 2>&1 | tee build.log

# TypeScript 오류 확인
npm run typecheck
```

### 환경 변수 오류

```javascript
// 환경 변수 확인 (클라이언트)
console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
```

### Supabase 연결 오류

1. Supabase Dashboard에서 API URL 확인
2. RLS 정책 확인
3. 네트워크 로그 확인 (Chrome DevTools → Network)

### 도메인 연결 오류

```bash
# DNS 전파 확인 (전 세계)
https://www.whatsmydns.net/

# Vercel 도메인 상태 확인
vercel domains inspect www.arspg.co.kr
```

### 캐시 문제

```bash
# Vercel 캐시 퍼지
vercel --prod --force

# 또는 Dashboard에서
Project Settings → Deployments → Redeploy
```

---

## 유용한 명령어

```bash
# 프로덕션 배포
vercel --prod

# 배포 로그 확인
vercel logs

# 환경 변수 목록
vercel env ls

# 도메인 목록
vercel domains ls

# 프로젝트 정보
vercel inspect
```

---

## 추가 리소스

- [Vercel 공식 문서](https://vercel.com/docs)
- [Next.js 배포 가이드](https://nextjs.org/docs/deployment)
- [Supabase 문서](https://supabase.com/docs)

---

*최종 업데이트: 2026-01-09*
