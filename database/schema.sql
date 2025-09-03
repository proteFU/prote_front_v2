
-- Prote 데이터베이스 스키마

-- 사용자 테이블
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  password TEXT, -- 이메일 회원가입용 비밀번호 (해싱됨)
  image TEXT,
  bio TEXT,
  preferences JSONB DEFAULT '{}',
  provider TEXT DEFAULT 'email', -- 'email', 'github', 'spotify'
  provider_id TEXT,
  email_verified BOOLEAN DEFAULT false, -- 이메일 인증 여부
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 감정 기록 테이블
CREATE TABLE IF NOT EXISTS emotions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(email) ON DELETE CASCADE,
  emotion TEXT NOT NULL,
  intensity INTEGER DEFAULT 5 CHECK (intensity >= 1 AND intensity <= 10),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 플레이리스트 테이블
CREATE TABLE IF NOT EXISTS playlists (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  user_id TEXT NOT NULL REFERENCES users(email) ON DELETE CASCADE,
  tracks JSONB DEFAULT '[]',
  emotion TEXT,
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 친구 관계 테이블
CREATE TABLE IF NOT EXISTS friendships (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(email) ON DELETE CASCADE,
  friend_id TEXT NOT NULL REFERENCES users(email) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, friend_id)
);

-- 좋아요 테이블
CREATE TABLE IF NOT EXISTS likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(email) ON DELETE CASCADE,
  playlist_id UUID REFERENCES playlists(id) ON DELETE CASCADE,
  track_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, playlist_id),
  UNIQUE(user_id, track_id)
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_emotions_user_id ON emotions(user_id);
CREATE INDEX IF NOT EXISTS idx_emotions_created_at ON emotions(created_at);
CREATE INDEX IF NOT EXISTS idx_playlists_user_id ON playlists(user_id);
CREATE INDEX IF NOT EXISTS idx_playlists_emotion ON playlists(emotion);
CREATE INDEX IF NOT EXISTS idx_friendships_user_id ON friendships(user_id);
CREATE INDEX IF NOT EXISTS idx_friendships_friend_id ON friendships(friend_id);
CREATE INDEX IF NOT EXISTS idx_friendships_status ON friendships(status);

-- RLS (Row Level Security) 정책
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE emotions ENABLE ROW LEVEL SECURITY;
ALTER TABLE playlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE friendships ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;

-- 사용자 정책
CREATE POLICY "Users can view their own profile" ON users
  FOR SELECT USING (email = current_setting('request.jwt.claims', true)::json->>'email');

CREATE POLICY "Users can update their own profile" ON users
  FOR UPDATE USING (email = current_setting('request.jwt.claims', true)::json->>'email');

-- 회원가입을 위한 INSERT 정책 (RLS 우회)
CREATE POLICY "Allow user registration" ON users
  FOR INSERT WITH CHECK (true);

-- 감정 정책
CREATE POLICY "Users can view their own emotions" ON emotions
  FOR SELECT USING (user_id = current_setting('request.jwt.claims', true)::json->>'email');

CREATE POLICY "Users can insert their own emotions" ON emotions
  FOR INSERT WITH CHECK (user_id = current_setting('request.jwt.claims', true)::json->>'email');

-- 플레이리스트 정책
CREATE POLICY "Users can view public playlists or their own" ON playlists
  FOR SELECT USING (
    is_public = true OR 
    user_id = current_setting('request.jwt.claims', true)::json->>'email'
  );

CREATE POLICY "Users can insert their own playlists" ON playlists
  FOR INSERT WITH CHECK (user_id = current_setting('request.jwt.claims', true)::json->>'email');

CREATE POLICY "Users can update their own playlists" ON playlists
  FOR UPDATE USING (user_id = current_setting('request.jwt.claims', true)::json->>'email');

-- 친구 관계 정책
CREATE POLICY "Users can view their own friendships" ON friendships
  FOR SELECT USING (
    user_id = current_setting('request.jwt.claims', true)::json->>'email' OR
    friend_id = current_setting('request.jwt.claims', true)::json->>'email'
  );

CREATE POLICY "Users can insert their own friendships" ON friendships
  FOR INSERT WITH CHECK (user_id = current_setting('request.jwt.claims', true)::json->>'email');

CREATE POLICY "Users can update friendships where they are involved" ON friendships
  FOR UPDATE USING (
    user_id = current_setting('request.jwt.claims', true)::json->>'email' OR
    friend_id = current_setting('request.jwt.claims', true)::json->>'email'
  );
