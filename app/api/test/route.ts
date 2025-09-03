import { NextRequest, NextResponse } from 'next/server';

// API 테스트 엔드포인트
export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      success: true,
      message: 'Prote API is working!',
      timestamp: new Date().toISOString(),
      user: {
        email: 'guest@example.com',
        name: 'Guest User',
        provider: 'demo'
      },
      endpoints: {
        music: '/api/music',
        playlists: '/api/playlists',
        emotion: '/api/emotion',
        users: '/api/users',
        friends: '/api/friends'
      },
      demo: {
        description: 'This is a demo version for presentation purposes',
        features: [
          'Mock music recommendations',
          'Emotion tracking simulation',
          'Playlist management',
          'User profile management',
          'Friend system simulation'
        ]
      }
    });

  } catch (error) {
    console.error('Test API Error:', error);
    return NextResponse.json(
      { error: 'API test failed' },
      { status: 500 }
    );
  }
}
