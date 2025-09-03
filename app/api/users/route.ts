import { NextRequest, NextResponse } from 'next/server';

// 사용자 프로필 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('user_id') || 'guest@example.com';

    // Mock 사용자 데이터
    const userData = {
      email: 'guest@example.com',
      name: 'Guest User',
      image: 'https://picsum.photos/300/300?random=100',
      bio: '음악을 사랑하는 사용자입니다.',
      preferences: {
        favoriteGenres: ['pop', 'rock', 'electronic'],
        moodTracking: true,
        notifications: true
      }
    };

    // Mock 감정 통계
    const emotionStats = {
      happy: 15,
      excited: 12,
      calm: 8,
      nostalgic: 6,
      sad: 3,
      angry: 2
    };

    return NextResponse.json({
      success: true,
      data: {
        user: userData,
        stats: emotionStats
      }
    });

  } catch (error) {
    console.error('User Profile Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user profile' },
      { status: 500 }
    );
  }
}

// 사용자 프로필 업데이트
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, bio, preferences } = body;

    // Mock 업데이트된 사용자 데이터
    const updatedUserData = {
      email: 'guest@example.com',
      name: name || 'Guest User',
      image: 'https://picsum.photos/300/300?random=100',
      bio: bio || '음악을 사랑하는 사용자입니다.',
      preferences: preferences || {
        favoriteGenres: ['pop', 'rock', 'electronic'],
        moodTracking: true,
        notifications: true
      },
      updated_at: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: updatedUserData
    });

  } catch (error) {
    console.error('User Update Error:', error);
    return NextResponse.json(
      { error: 'Failed to update user profile' },
      { status: 500 }
    );
  }
}
