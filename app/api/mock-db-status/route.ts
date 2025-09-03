import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const status = {
      connected: true,
      type: 'mock',
      tables: {
        users: { count: 1, status: 'active' },
        emotions: { count: 5, status: 'active' },
        playlists: { count: 2, status: 'active' },
        friendships: { count: 4, status: 'active' }
      },
      lastSync: new Date().toISOString(),
      version: '1.0.0-demo'
    };
    
    return NextResponse.json({
      success: true,
      ...status,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Mock DB 상태 조회 실패' },
      { status: 500 }
    );
  }
}
