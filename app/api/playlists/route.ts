import { NextRequest, NextResponse } from 'next/server';

// Mock 플레이리스트 데이터 저장소
let playlists: any[] = [
  {
    id: '1',
    name: 'My Happy Playlist',
    description: '행복한 기분일 때 듣는 플레이리스트',
    user_id: 'guest@example.com',
    tracks: [
      { id: '1', name: 'Happy', artist: 'Pharrell Williams' },
      { id: '2', name: 'Can\'t Stop the Feeling!', artist: 'Justin Timberlake' }
    ],
    emotion: 'happy',
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '2',
    name: 'Chill Vibes',
    description: '평온한 시간을 위한 플레이리스트',
    user_id: 'guest@example.com',
    tracks: [
      { id: '3', name: 'Perfect', artist: 'Ed Sheeran' },
      { id: '4', name: 'All of Me', artist: 'John Legend' }
    ],
    emotion: 'calm',
    created_at: new Date(Date.now() - 172800000).toISOString(),
  }
];

// 플레이리스트 생성
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, tracks, emotion } = body;

    // Mock 플레이리스트 데이터 생성
    const playlistData = {
      id: Date.now().toString(),
      name,
      description,
      user_id: 'guest@example.com',
      tracks: tracks || [],
      emotion: emotion || null,
      created_at: new Date().toISOString(),
    };

    // 메모리에 저장
    playlists.unshift(playlistData);

    return NextResponse.json({
      success: true,
      data: playlistData
    });

  } catch (error) {
    console.error('Playlist Creation Error:', error);
    return NextResponse.json(
      { error: 'Failed to create playlist' },
      { status: 500 }
    );
  }
}

// 플레이리스트 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const emotion = searchParams.get('emotion');
    const userId = searchParams.get('user_id') || 'guest@example.com';

    let filteredPlaylists = playlists.filter(playlist => playlist.user_id === userId);

    if (emotion) {
      filteredPlaylists = filteredPlaylists.filter(playlist => playlist.emotion === emotion);
    }

    // 최신순으로 정렬
    filteredPlaylists.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return NextResponse.json({
      success: true,
      data: filteredPlaylists
    });

  } catch (error) {
    console.error('Playlist Fetch Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch playlists' },
      { status: 500 }
    );
  }
}
