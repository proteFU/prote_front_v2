import { NextRequest, NextResponse } from 'next/server';

// Mock 감정 데이터 저장소
interface EmotionData {
  id: string;
  user_id: string;
  emotion: string;
  intensity: number;
  description: string;
  created_at: string;
}

let emotionHistory: EmotionData[] = [];

// 감정 분석 및 음악 추천
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { emotion, intensity, description } = body;

    // Mock 감정 데이터 생성
    const emotionData = {
      id: Date.now().toString(),
      user_id: 'guest@example.com',
      emotion,
      intensity: intensity || 5,
      description,
      created_at: new Date().toISOString(),
    };

    // 메모리에 저장
    emotionHistory.unshift(emotionData);
    if (emotionHistory.length > 100) {
      emotionHistory = emotionHistory.slice(0, 100);
    }

    // 감정에 따른 음악 추천 로직
    const musicRecommendations = await getEmotionBasedMusic(emotion, intensity);

    return NextResponse.json({
      success: true,
      data: {
        emotion: emotionData,
        recommendations: musicRecommendations
      }
    });

  } catch (error) {
    console.error('Emotion Analysis Error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze emotion' },
      { status: 500 }
    );
  }
}

// 감정 기반 음악 추천
async function getEmotionBasedMusic(emotion: string, intensity: number) {
  // const emotionMap: { [key: string]: string[] } = {
  //   happy: ['pop', 'dance', 'funk'],
  //   sad: ['blues', 'indie', 'acoustic'],
  //   angry: ['rock', 'metal', 'punk'],
  //   excited: ['electronic', 'house', 'trance'],
  //   calm: ['ambient', 'classical', 'jazz'],
  //   nostalgic: ['indie', 'folk', 'alternative'],
  // };

  // const genres = emotionMap[emotion] || ['pop'];
  
  // 실제로는 Spotify API를 호출하지만, 여기서는 샘플 데이터 반환
  return [
    {
      id: '1',
      name: `${emotion} Song 1`,
      artist: 'Artist 1',
      image: 'https://picsum.photos/300/300?random=500',
      emotion,
      intensity
    },
    {
      id: '2',
      name: `${emotion} Song 2`,
      artist: 'Artist 2',
      image: 'https://picsum.photos/300/300?random=500',
      emotion,
      intensity
    }
  ];
}

// 사용자의 감정 히스토리 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');

    // Mock 데이터와 실제 기록된 데이터 합치기
    const mockEmotions = [
      {
        id: '1',
        user_id: 'guest@example.com',
        emotion: 'happy',
        intensity: 8,
        description: '오늘 날씨가 정말 좋아서 기분이 좋다!',
        created_at: new Date(Date.now() - 86400000).toISOString(), // 1일 전
      },
      {
        id: '2',
        user_id: 'guest@example.com',
        emotion: 'excited',
        intensity: 9,
        description: '새로운 프로젝트가 시작되어서 신난다',
        created_at: new Date(Date.now() - 172800000).toISOString(), // 2일 전
      },
      {
        id: '3',
        user_id: 'guest@example.com',
        emotion: 'calm',
        intensity: 6,
        description: '평온한 하루였다',
        created_at: new Date(Date.now() - 259200000).toISOString(), // 3일 전
      },
      {
        id: '4',
        user_id: 'guest@example.com',
        emotion: 'nostalgic',
        intensity: 7,
        description: '옛날 음악을 들으니 추억이 난다',
        created_at: new Date(Date.now() - 345600000).toISOString(), // 4일 전
      },
      {
        id: '5',
        user_id: 'guest@example.com',
        emotion: 'sad',
        intensity: 4,
        description: '조금 우울한 기분',
        created_at: new Date(Date.now() - 432000000).toISOString(), // 5일 전
      }
    ];

    const allEmotions = [...emotionHistory, ...mockEmotions]
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, limit);

    return NextResponse.json({
      success: true,
      data: allEmotions
    });

  } catch (error) {
    console.error('Emotion History Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch emotion history' },
      { status: 500 }
    );
  }
}
