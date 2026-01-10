# Windows Server IIS + Next.js 하이브리드 배포 가이드

## 개요

| 항목 | 내용 |
|------|------|
| 대상 서버 | Windows Server 2016 (211.196.157.120) |
| 웹 서버 | IIS (80 포트) |
| Next.js 포트 | 3000 (내부 전용) |
| 구성 방식 | IIS + ARR Reverse Proxy |
| 특징 | **기존 ASP 사이트와 Next.js 공존** |

---

## 아키텍처

```
                    www.arspg.com (80)
                           │
                          IIS
                    (ARR Reverse Proxy)
                           │
           ┌───────────────┼───────────────┐
           │               │               │
           ▼               ▼               ▼
      기존 ASP         기존 ASP        Next.js
    (*.htm, *.asp)    (/ars/*)      (/, /about 등)
                                         │
                                         ▼
                               localhost:3000
```

### 라우팅 규칙

| URL 패턴 | 처리 | 예시 |
|----------|------|------|
| `/` (루트) | Next.js | `www.arspg.com/` |
| `/about`, `/services` 등 | Next.js | `www.arspg.com/about` |
| `*.htm`, `*.html` | IIS/ASP | `www.arspg.com/main.htm` |
| `*.asp` | IIS/ASP | `www.arspg.com/test.asp` |
| `/ars/*` | IIS/ASP | `www.arspg.com/ars/kicc/order.asp` |

---

## 필수 설치 모듈

### 1. URL Rewrite 2.1

**다운로드**: https://www.iis.net/downloads/microsoft/url-rewrite

```
https://download.microsoft.com/download/1/2/8/128E2E22-C1B9-44A4-BE2A-5859ED1D4592/rewrite_amd64_en-US.msi
```

### 2. Application Request Routing (ARR) 3.0

**다운로드**: https://www.iis.net/downloads/microsoft/application-request-routing

설치 후 `iisreset` 실행

---

## ARR 프록시 설정

### 설정 방법

1. **IIS 관리자** 열기 (`inetmgr`)
2. 좌측에서 **서버 레벨** 선택 (사이트 아님)
3. **Application Request Routing Cache** 더블클릭
4. 우측 **Server Proxy Settings** 클릭
5. 다음 항목 설정:
   - ✅ **Enable proxy** 체크
   - **Reverse proxy**: `localhost:3000`
   - ✅ **Use URL Rewrite to inspect incoming requests** 체크
6. **적용** 클릭

---

## web.config 설정

### 최종 web.config (검증 완료)

`C:\inetpub\arspg_web\web.config`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <system.webServer>
        <defaultDocument>
            <files>
                <add value="main.htm" />
            </files>
        </defaultDocument>
        <handlers>
            <remove name="ASPhtm" />
            <add name="ASPhtm" path="*.htm" verb="*" modules="IsapiModule" scriptProcessor="%windir%\system32\inetsrv\asp.dll" resourceType="File" />
            <add name="ASPhtml" path="*.html" verb="*" modules="IsapiModule" scriptProcessor="%windir%\system32\inetsrv\asp.dll" resourceType="File" />
        </handlers>
        <rewrite>
            <rules>
                <rule name="Root to Next.js" stopProcessing="true">
                    <match url="^$" />
                    <action type="Rewrite" url="http://localhost:3000/" />
                </rule>
                <rule name="Next.js Proxy" stopProcessing="true">
                    <match url="(.*)" />
                    <conditions logicalGrouping="MatchAll">
                        <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
                        <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
                        <add input="{REQUEST_URI}" pattern="\.(asp|htm|html)$" negate="true" />
                        <add input="{REQUEST_URI}" pattern="^/ars/" negate="true" />
                    </conditions>
                    <action type="Rewrite" url="http://localhost:3000/{R:1}" />
                </rule>
            </rules>
        </rewrite>
    </system.webServer>
</configuration>
```

### 규칙 설명

| 규칙 | 설명 |
|------|------|
| `Root to Next.js` | 루트 경로(`/`)를 Next.js로 프록시 |
| `Next.js Proxy` | 조건부 프록시 - 아래 조건 모두 만족 시 Next.js로 |

### Next.js Proxy 조건

- 파일이 존재하지 않음 (IsFile negate)
- 디렉토리가 아님 (IsDirectory negate)
- `.asp`, `.htm`, `.html` 확장자가 아님
- `/ars/` 경로가 아님

---

## Next.js 실행

### 개발 모드 (테스트용)

```cmd
cd D:\Project\arspg
npm run dev -- -H 0.0.0.0 -p 3000
```

### 프로덕션 모드 (운영용)

```cmd
cd D:\Project\arspg

# 빌드
npm run build

# 실행
npm run start -- -H 0.0.0.0 -p 3000
```

### PM2로 백그라운드 실행 (권장)

```cmd
# PM2 설치
npm install -g pm2

# 프로젝트 폴더로 이동
cd D:\Project\arspg

# 프로덕션 실행 (검증 완료)
pm2 start node_modules/next/dist/bin/next --name "arspg-next" -- start -H 0.0.0.0 -p 3000

# 상태 확인
pm2 status

# 로그 확인
pm2 logs arspg-next

# 재시작
pm2 restart arspg-next

# 중지
pm2 stop arspg-next

# 삭제
pm2 delete arspg-next

# 현재 상태 저장
pm2 save
```

> **주의**: PM2 실행 전 반드시 `npm run build`로 빌드가 완료되어 있어야 합니다.

### Windows 서버 재부팅 시 자동 시작 설정

```cmd
# 1. pm2-windows-startup 설치
npm install -g pm2-windows-startup

# 2. Windows 서비스로 등록
pm2-startup install

# 3. 현재 PM2 상태 저장 (중요!)
pm2 save
```

#### 설정 확인

```cmd
# Windows 서비스 목록에서 확인
services.msc

# 또는 PowerShell에서
Get-Service | Where-Object {$_.Name -like "*pm2*"}
```

#### 재부팅 테스트

```cmd
# 서버 재부팅
shutdown /r /t 0

# 재부팅 후 확인
pm2 status
```

#### 문제 발생 시: NSSM 사용 (대안)

```cmd
# 1. NSSM 다운로드: https://nssm.cc/download
# nssm.exe를 C:\Windows\System32에 복사

# 2. 서비스 등록
nssm install PM2 "C:\Users\Administrator\AppData\Roaming\npm\pm2.cmd" resurrect

# 3. 서비스 시작
nssm start PM2

# 4. 서비스 상태 확인
nssm status PM2
```

---

## 확인 명령어

### 포트 리스닝 확인

```cmd
netstat -an | findstr ":3000"
```

정상 결과:
```
TCP    0.0.0.0:3000    0.0.0.0:0    LISTENING
```

### IIS 재시작

```cmd
iisreset
```

### web.config 확인

```cmd
type C:\inetpub\arspg_web\web.config
```

---

## 문제 해결

### 500.19 오류 (XML 파싱 오류)

| 원인 | 해결 |
|------|------|
| XML 첫 줄 앞 공백 | 공백 제거 후 저장 |
| URL Rewrite 미설치 | URL Rewrite 모듈 설치 |
| 잘못된 XML 문법 | 메모장에서 새로 작성, UTF-8 저장 |

### 500 오류

| 원인 | 해결 |
|------|------|
| ARR 프록시 비활성화 | ARR 프록시 활성화 |
| Next.js 서버 중지 | `pm2 status` 확인, 재시작 |
| web.config 규칙 오류 | 기존 설정으로 복원 후 단계별 추가 |

### 타임아웃

| 원인 | 해결 |
|------|------|
| Next.js 서버 미실행 | `netstat -an | findstr ":3000"` 확인 |
| 방화벽 차단 (외부) | IIS 프록시는 내부 통신이므로 무관 |

### 기존 ASP 페이지 접근 불가

| 원인 | 해결 |
|------|------|
| 규칙 순서 문제 | `Root to Next.js` 규칙이 첫 번째인지 확인 |
| 조건 누락 | `.asp`, `.htm` 확장자 제외 조건 확인 |

---

## 테스트 결과 (2026-01-10)

| URL | 결과 | 처리 |
|-----|------|------|
| `http://www.arspg.com/` | ✅ Next.js | 새 랜딩 페이지 |
| `http://www.arspg.com/about` | ✅ Next.js | 회사 소개 페이지 |
| `http://www.arspg.com/main.htm` | ✅ IIS/ASP | 기존 ASP 페이지 |
| `http://www.arspg.com/sub/customer_faq.htm` | ✅ IIS/ASP | 기존 FAQ 페이지 |

---

## 유지보수

### 소스 코드 업데이트

```cmd
cd D:\Project\arspg

# 1. 소스 코드 복사/업데이트

# 2. 의존성 설치 (package.json 변경 시)
npm install

# 3. 재빌드
npm run build

# 4. PM2 재시작
pm2 restart arspg-next
```

### 로그 확인

```cmd
# PM2 실시간 로그
pm2 logs arspg-next

# PM2 로그 파일 위치
C:\Users\Administrator\.pm2\logs\
```

---

## 문서 정보

| 항목 | 내용 |
|------|------|
| 작성일 | 2026-01-10 |
| 대상 프로젝트 | ARSPG 웹사이트 (Next.js 14) |
| 대상 서버 | Windows Server 2016 + IIS |
| 구성 | 하이브리드 (기존 ASP + Next.js 공존) |
| Node.js 버전 | 20.x LTS 권장 |
