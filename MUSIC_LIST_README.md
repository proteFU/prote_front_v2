# 🎵 Prote 음악 플레이어 - 음악 리스트 가이드

## 📋 개요
Prote는 감정 기반 음악 추천 서비스로, 사용자의 현재 감정에 맞는 음악을 추천하고 재생하는 플랫폼입니다.

## 🎶 음악 데이터 구조

### Track 인터페이스
```typescript
interface Track {
  id: string;           // 고유 식별자
  name: string;         // 곡 제목
  artist: string;       // 아티스트명
  image: string;        // 앨범 아트 URL
  audioUrl?: string;    // 오디오 파일 URL (선택사항)
}
```

## 🎭 감정별 음악 분류

### 1. Happy (행복한)
- **Pharrell Williams - Happy**
- **Justin Timberlake - Can't Stop the Feeling!**
- **Lizzo - Good as Hell**
- **Post Malone & Swae Lee - Sunflower**

### 2. Anxious (불안한)
- **Pink Floyd - Breathe**
- **Marconi Union - Weightless**
- **Rema - Calm Down**
- **Enya - Peaceful**

### 3. Comfortable (편안한)
- **Ed Sheeran - Perfect**
- **John Legend - All of Me**
- **Ed Sheeran - Thinking Out Loud**
- **Christina Perri - A Thousand Years**

### 4. Sad (슬픈)
- **Lewis Capaldi - Someone You Loved**
- **Taylor Swift - All Too Well**
- **Johnny Cash - Hurt**
- **Gary Jules - Mad World**

### 5. Nostalgic (향수적인)
- **Queen - Bohemian Rhapsody**
- **Eagles - Hotel California**
- **Guns N' Roses - Sweet Child O' Mine**
- **Journey - Don't Stop Believin'**

### 6. Excited (흥분한)
- **Imagine Dragons - Thunder**
- **Imagine Dragons - Believer**
- **Survivor - Eye of the Tiger**
- **Queen - We Will Rock You**

### 7. Remorseful (후회하는)
- **Johnny Cash - Hurt**
- **Gary Jules - Mad World**
- **Simon & Garfunkel - The Sound of Silence**
- **Radiohead - Creep**

### 8. Lonely (외로운)
- **Akon - Lonely**
- **Simon & Garfunkel - The Sound of Silence**
- **Nine Inch Nails - Hurt**
- **R.E.M. - Everybody Hurts**

## 🏠 홈페이지 추천 음악

### 인기 곡들
1. **The Weeknd - Blinding Lights**
2. **Harry Styles - Watermelon Sugar**
3. **Dua Lipa - Levitating**
4. **Olivia Rodrigo - Good 4 U**
5. **The Kid LAROI & Justin Bieber - Stay**
6. **Lil Nas X - Industry Baby**
7. **Glass Animals - Heat Waves**
8. **Justin Bieber - Peaches**
9. **Lil Nas X - Montero**
10. **Doja Cat ft. SZA - Kiss Me More**

## 🎵 플레이리스트

### 추천 플레이리스트
1. **Today's Top Hits** - Spotify
2. **Chill Vibes** - Music Lover
3. **Workout Mix** - Fitness Fan
4. **Rainy Day** - Weather Watcher
5. **Party Time** - Party Planner
6. **Study Focus** - Student
7. **Road Trip** - Traveler
8. **Coffee Shop** - Coffee Lover
9. **Late Night** - Night Owl
10. **Morning Energy** - Early Bird

## 🎮 음악 플레이어 기능

### 기본 기능
- ✅ 재생/정지
- ✅ 이전/다음 곡
- ✅ 진행바 (Seek)
- ✅ 시간 표시
- ✅ LP판 회전 애니메이션
- ✅ 블러 배경 효과

### 고급 기능
- ✅ 플레이리스트 자동 재생
- ✅ 곡 완료 시 자동 다음 곡
- ✅ 미니 플레이어
- ✅ 전체 화면 플레이어
- ✅ 가사 표시
- ✅ 전체 화면 가사 모드

## 🎨 UI/UX 특징

### 시각적 효과
- **LP판 회전**: 재생 중일 때 앨범 아트가 LP판처럼 회전
- **블러 배경**: 현재 재생 중인 곡의 앨범 아트를 배경으로 블러 처리
- **그라데이션**: 감정별 색상 그라데이션 적용
- **애니메이션**: 부드러운 전환 효과

### 반응형 디자인
- 모바일 최적화
- 태블릿 지원
- 데스크톱 완벽 지원

## 🔧 기술적 특징

### 시뮬레이션 모드
- 실제 오디오 파일 없이도 완전한 플레이어 경험
- 1초마다 시간 진행 시뮬레이션
- 3분 기본 곡 길이 설정
- 자동 다음 곡 재생

### 상태 관리
- React Context API 사용
- 전역 플레이어 상태 관리
- 실시간 UI 업데이트

## 📱 사용 방법

### 1. 감정 선택
1. `/emotion` 페이지에서 현재 감정 선택
2. 여러 감정 동시 선택 가능
3. "Continue" 버튼 클릭

### 2. 음악 추천 받기
1. 선택한 감정에 맞는 음악 추천
2. "Play All" 버튼으로 전체 재생
3. 개별 곡 클릭으로 선택 재생

### 3. 음악 재생
1. 미니 플레이어에서 재생/정지
2. 전체 화면 플레이어로 확장
3. 이전/다음 곡 버튼 사용
4. 진행바로 원하는 시간으로 이동

### 4. 상세 정보 보기
1. 곡 제목 클릭으로 상세 페이지 이동
2. 가사 보기/숨기기
3. 전체 화면 가사 모드

## 🎯 데모 시나리오

### 시연 순서
1. **홈페이지**: 추천 곡 클릭하여 재생
2. **감정 선택**: 여러 감정 선택 후 Continue
3. **플레이리스트**: 추천 음악 재생 및 탐색
4. **상세 페이지**: 곡 상세 정보 및 가사 확인
5. **플레이어**: 미니/전체 화면 플레이어 체험

### 주요 포인트
- 즉시 반응하는 UI
- 부드러운 애니메이션
- 직관적인 사용자 경험
- 감정 기반 음악 추천

## 🚀 향후 개발 계획

### 추가 기능
- [ ] 실제 오디오 파일 재생
- [ ] 사용자 플레이리스트 생성
- [ ] 음악 검색 기능
- [ ] 좋아요/즐겨찾기 기능
- [ ] 소셜 공유 기능

### 개선 사항
- [ ] 더 많은 음악 데이터
- [ ] 개인화된 추천 알고리즘
- [ ] 오프라인 재생 지원
- [ ] 다국어 지원

---

**Prote** - Where melodies mess with your heart. 💜
