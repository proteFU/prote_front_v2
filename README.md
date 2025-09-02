# 🎵 Prote

> "Where melodies mess with your heart."

Prote는 감정 기반 음악 추천 플랫폼입니다. 사용자의 감정 상태에 따라 맞춤형 음악을 추천하고, 개인화된 플레이리스트를 제공합니다.

## ✨ 주요 기능

- 🏠 **홈**: 추천 곡, 플레이리스트, 감정별 음악 탐색
- 💫 **감정 분석**: 크리스탈볼을 통한 감정 기반 음악 추천
- ❤️ **즐겨찾기**: 좋아하는 음악과 플레이리스트 관리
- 👤 **프로필**: 개인 정보 및 플레이리스트 관리
- 🔐 **인증**: GitHub OAuth를 통한 간편 로그인

## 🛠️ 기술 스택

- **Frontend**: Next.js 15.5.2, React 19.1.0
- **Styling**: Tailwind CSS 4.0
- **Authentication**: NextAuth.js
- **Animation**: Framer Motion
- **Charts**: Recharts
- **Language**: TypeScript
- **Package Manager**: Bun

## 🚀 시작하기

### 필수 조건

- Node.js 18.0 이상
- Bun (권장) 또는 npm/yarn

### 설치 및 실행

1. 저장소 클론
```bash
git clone <repository-url>
cd prote
```

2. 의존성 설치
```bash
bun install
# 또는
npm install
```

3. 환경 변수 설정
```bash
# .env.local 파일 생성
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret
```

4. 개발 서버 실행
```bash
bun dev
# 또는
npm run dev
```

5. 브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

## 📁 프로젝트 구조

```
prote/
├── app/                    # Next.js App Router
│   ├── api/               # API 라우트
│   │   └── auth/          # 인증 관련 API
│   ├── emotion/           # 감정 분석 페이지
│   ├── favorites/         # 즐겨찾기 페이지
│   ├── profile/           # 프로필 페이지
│   ├── globals.css        # 전역 스타일
│   ├── layout.tsx         # 루트 레이아웃
│   └── page.tsx           # 홈페이지
├── components/            # 재사용 가능한 컴포넌트
│   ├── ui/               # UI 컴포넌트
│   ├── CrystalBall.tsx   # 감정 분석 크리스탈볼
│   ├── GNB.tsx           # 글로벌 네비게이션 바
│   ├── Title.tsx         # 페이지 타이틀
│   └── ...
├── public/               # 정적 파일
├── utils/                # 유틸리티 함수
└── hooks/                # 커스텀 훅
```

## 🎨 주요 컴포넌트

### CrystalBall
감정 분석을 위한 인터랙티브 크리스탈볼 컴포넌트

### GNB (Global Navigation Bar)
하단 고정 네비게이션 바로 앱의 주요 섹션으로 이동

### SectionTitle
각 섹션의 제목과 더보기 링크를 포함하는 컴포넌트

## 🔧 개발 스크립트

```bash
# 개발 서버 실행 (Turbopack 사용)
bun dev

# 프로덕션 빌드
bun build

# 프로덕션 서버 실행
bun start

# 린팅
bun lint
```

## 🌟 특징

- **모바일 우선**: 반응형 디자인으로 모든 디바이스에서 최적화
- **다크 테마**: 세련된 다크 테마 UI
- **부드러운 애니메이션**: Framer Motion을 활용한 매끄러운 전환 효과
- **타입 안전성**: TypeScript로 개발하여 타입 안전성 보장
- **최신 기술**: Next.js 15와 React 19의 최신 기능 활용

## 📱 페이지 구성

- **홈** (`/`): 추천 곡, 플레이리스트, 감정별 음악
- **감정** (`/emotion`): 크리스탈볼을 통한 감정 기반 음악 추천
- **즐겨찾기** (`/favorites`): 좋아하는 음악 관리
- **프로필** (`/profile`): 개인 정보 및 플레이리스트 관리

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 📞 연락처

프로젝트에 대한 질문이나 제안사항이 있으시면 이슈를 생성해 주세요.

---

**Prote** - 음악으로 마음을 읽다 🎵