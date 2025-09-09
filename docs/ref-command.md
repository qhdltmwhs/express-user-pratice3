좋습니다 👍 말씀해주신 부분을 반영해서 가이드를 매끄럽게 수정했습니다.
`schema.prisma` 예시와 함께 설명을 자연스럽게 추가했어요.

---

# Express + Prisma 인증 프로젝트 시작 가이드

## 📦 프로젝트 준비

### 1. 프로젝트 생성 및 초기화

먼저 새로운 디렉토리를 만들고 `package.json` 파일을 초기화합니다.

```bash
mkdir express-user-pratice3
cd express-user-pratice3

npm init -y
```

`package.json`에서 ES 모듈을 사용할 수 있도록 아래 항목을 추가합니다.

```json
"type": "module"
```

---

### 2. 의존성 설치

프로젝트 실행에 필요한 라이브러리를 설치합니다.

```bash
npm install express dotenv bcrypt jsonwebtoken passport passport-jwt passport-local @prisma/client
```

* **express**: 웹 서버 프레임워크
* **dotenv**: 환경 변수 관리
* **bcrypt**: 비밀번호 암호화
* **jsonwebtoken**: JWT 토큰 관리
* **passport**: 인증 미들웨어
* **passport-jwt**: JWT 인증 전략
* **passport-local**: 아이디/비밀번호 인증 전략
* **@prisma/client**: Prisma 클라이언트

개발 환경에서만 필요한 도구도 설치합니다.

```bash
npm install --save-dev nodemon prisma
```

---

### 3. 실행 스크립트 설정

`package.json`에 실행 스크립트를 추가합니다.

```json
"scripts": {
  "dev": "nodemon src/app.js",
  "start": "node src/app.js"
}
```

---

## 🗄️ 데이터베이스 설정 (Prisma)

### 1. Prisma 초기화

Prisma CLI를 사용하여 초기 설정을 진행합니다.

```bash
npx prisma init
```

* `prisma/` 폴더가 생성되고
* `schema.prisma` 파일이 포함됩니다.

`.env` 파일이 필요하므로 아래 중 하나를 실행합니다.

```bash
# 복사 (원본 유지)
cp .env.example .env

# 이동 (원본 삭제)
mv .env.example .env
```

---

### 2. 마이그레이션 실행

데이터베이스 모델을 작성한 뒤, 실제 DB에 반영합니다.
연습용으로 SQLite를 사용할 경우, `schema.prisma`의 `datasource` 블록을 다음과 같이 작성하면 됩니다.

```prisma
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}
```

이후 마이그레이션을 실행합니다.

```bash
npx prisma migrate dev --name init
```

---

### 3. Seed 데이터 추가 (선택)

`package.json`에 seed 설정을 추가합니다.

```json
"prisma": {
  "seed": "node prisma/seed.js"
}
```

이후 실행합니다.

```bash
npx prisma db seed
```

---

## 🚀 프로젝트 실행

### 개발 모드 실행

코드 변경 시 자동으로 서버가 재시작됩니다.

```bash
npm run dev
```

### 프로덕션 실행

```bash
npm start
```

---

## 🛠️ 데이터베이스 확인 (SQLite)

이 프로젝트는 기본적으로 **SQLite**를 사용합니다.
데이터베이스 파일은 `prisma/dev.db` 경로에 자동 생성됩니다.

확인 방법:

1. VS Code 확장 프로그램 **SQLite Viewer** 설치
2. `dev.db` 파일 클릭 → 테이블 및 데이터 조회 가능

---

👉 이렇게 하면 SQLite 연습용 DB 설정 방법이 자연스럽게 포함된 가이드가 됩니다.

혹시 이 문서, **팀원 공유용으로 좀 더 친절하게 (예: 스크린샷이나 예시 모델 추가)** 정리해드릴까요?
