# Express 유저 기능 구현 (연습3)

## 문제: 도서 대여 서비스 API 구축

### **구현할 기능**

- **공통**
    - Prisma를 이용해서 데이터베이스와 상호작용 하세요.
    - 어떤 모델이 필요할지 생각해서 구성해보세요.
    - 초기 도서 목록은 데이터 시딩을 통해 넣어주세요.
- **회원 관리**
    - **`POST /users/register`**: 새로운 사용자를 등록합니다.
        - **요청 본문:** `{ "username": "string", "password": "string" }`
        - **응답:** 성공 시 `201 Created`와 `{ "message": "User registered successfully" }` 반환.
        - **조건:**
            - `username`이 이미 존재하면 `409 Conflict`와 에러 메시지 반환.
            - `password`는 `bcrypt`로 해싱해야 합니다.
    - **`POST /users/login`**: 사용자의 로그인을 처리합니다.
        - **요청 본문:** `{ "username": "string", "password": "string" }`
        - **응답:** 성공 시 `200 OK`와 `{ "token": "string" }` (JWT) 반환.
        - **조건:** `passport-local` 전략을 사용해 인증하고, 성공 시 JWT를 발급합니다.
    - **`DELETE /users/delete`**: 현재 로그인된 사용자를 탈퇴 처리합니다.
        - **요청 헤더:** `Authorization: Bearer <JWT>`
        - **응답:** 성공 시 `200 OK`와 `{ "message": "User deleted successfully" }` 반환.
        - **조건:** JWT 인증이 필요한 보호된 라우트입니다.
- **도서 관리**
    - **`GET /books`**: 모든 도서의 목록을 조회합니다.
        - **요청:** JWT 토큰 없이 접근 가능.
        - **응답:** `200 OK`와 `{ "id": 1, "title": "...", "isRented": true, "rentedBy": "...", "rentedDate": "..." }` 형태의 도서 배열 반환.
    - **`POST /books/rent/:bookId`**: 도서를 대여합니다.
        - **요청 헤더:** `Authorization: Bearer <JWT>`
        - **응답:** 성공 시 `200 OK`와 `{ "message": "Book rented successfully" }` 반환.
        - **조건:** JWT 인증이 필요한 보호된 라우트입니다. 도서가 이미 대여 중이면 `409 Conflict` 반환.
    - **`POST /books/return/:bookId`**: 도서를 반납합니다.
        - **요청 헤더:** `Authorization: Bearer <JWT>`
        - **응답:** 성공 시 `200 OK`와 `{ "message": "Book returned successfully" }` 반환.
        - **조건:** JWT 인증이 필요한 보호된 라우트입니다. 요청한 사용자가 해당 도서를 대여한 사용자가 아니면 `403 Forbidden` 반환.

## 테스트

### 사용자 가입

```jsx
curl -X POST -H "Content-Type: application/json" -d '{"username":"testuser", "password":"password123"}' http://localhost:3000/users/register
```

### 사용자 로그인

```jsx
curl -X POST -H "Content-Type: application/json" -d '{"username":"testuser", "password":"password123"}' http://localhost:3000/users/login
```

### 도서 목록 확인 (초기 상태)

```jsx
curl http://localhost:3000/books
```

### 도서 대여 (도서 ID 1번)

```jsx
curl -X POST -H "Authorization: Bearer $TOKEN" http://localhost:3000/books/rent/1
```

### 도서 목록 확인 (대여 후)

```jsx
curl http://localhost:3000/books
```

### 이후 테스트는 어떤 테스트가 필요할 지 직접 고민해서 만들어보세요. 👍

---

### **데이터베이스 설정**

이 프로젝트는 별도의 데이터베이스 설치 과정 없이 **SQLite**를 사용합니다. 데이터베이스 파일은 `prisma/migrations/dev.db` 경로에 자동으로 생성됩니다.

### **데이터베이스 확인 방법**

`dev.db` 파일의 내용을 확인하려면 **VS Code**에 **** **`SQLite Viewer` 확장팩**을 설치해야 합니다.

설치 후 `dev.db` 파일을 클릭하면 데이터베이스의 테이블과 데이터를 쉽게 확인할 수 있습니다.

시작을 어떻게 해야할지 모르겠다. `docs 폴더` 안의 파일 참조