# ARSPG.CO.KR 웹사이트 개발
- 기존 www.arspg.co.kr 의 웹사이트를 리뉴얼하고자 한다. 

## 기존 사이트 정보
- www.arspg.co.kr 
- 기존 페이지는 HTML 위주의 페이지로 구성되어 있다. 
- 웹서버는 IIS 를 사용하고 있다.
- DB는 MS SQL을 사용한다.

## 변경 사항
- Next js 를 기반으로 변경하고자 한다.
- 웹서버는 Vercel 을 사용한다.
- DB는 supabase 를 사용한다. 

## 내용 파악
- arspg_web_old 폴더에 기존 코드가 있다. 이것을 참조해서 포함되어야 하는 내용을 파악한다.
- www.arspg.co.kr 를 직접 playwright로 파악한다. 

## 디자인 템플릿
- linear.app 랜딩 페이지 열어서 
- Hero, Feature, Pricing 섹션을 각각 React 컴포넌트로 만들어줘. 
- Tailwind로 스타일 분리하고 재사용 가능하게 만들어줘. 

## 구현
- Nest js 프로젝트를 만들고 코드를 생성한다. 
