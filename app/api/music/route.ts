import { NextRequest, NextResponse } from 'next/server';

// Mock 음악 데이터
const mockTracks = [
  {
    id: '1',
    name: 'Blinding Lights',
    artist: 'The Weeknd',
    image: 'https://picsum.photos/300/300?random=1',
    preview_url: null,
    external_urls: { spotify: 'https://open.spotify.com/track/1' },
    duration_ms: 200000,
    popularity: 95
  },
  {
    id: '2',
    name: 'Watermelon Sugar',
    artist: 'Harry Styles',
    image: 'https://picsum.photos/300/300?random=2',
    preview_url: null,
    external_urls: { spotify: 'https://open.spotify.com/track/2' },
    duration_ms: 174000,
    popularity: 88
  },
  {
    id: '3',
    name: 'Levitating',
    artist: 'Dua Lipa',
    image: 'https://picsum.photos/300/300?random=3',
    preview_url: null,
    external_urls: { spotify: 'https://open.spotify.com/track/3' },
    duration_ms: 203000,
    popularity: 92
  },
  {
    id: '4',
    name: 'Good 4 U',
    artist: 'Olivia Rodrigo',
    image: 'https://picsum.photos/300/300?random=4',
    preview_url: null,
    external_urls: { spotify: 'https://open.spotify.com/track/4' },
    duration_ms: 178000,
    popularity: 90
  },
  {
    id: '5',
    name: 'Stay',
    artist: 'The Kid LAROI & Justin Bieber',
    image: 'https://picsum.photos/300/300?random=5',
    preview_url: null,
    external_urls: { spotify: 'https://open.spotify.com/track/5' },
    duration_ms: 141000,
    popularity: 87
  }
];

const emotionBasedTracks = {
  happy: [
    {
      id: 'h1',
      name: 'Happy',
      artist: 'Pharrell Williams',
      image: 'https://picsum.photos/300/300?random=11',
      preview_url: null,
      external_urls: { spotify: 'https://open.spotify.com/track/h1' },
      duration_ms: 233000,
      popularity: 85
    },
    {
      id: 'h2',
      name: 'Can\'t Stop the Feeling!',
      artist: 'Justin Timberlake',
      image: 'https://picsum.photos/300/300?random=12',
      preview_url: null,
      external_urls: { spotify: 'https://open.spotify.com/track/h2' },
      duration_ms: 236000,
      popularity: 82
    }
  ],
  sad: [
    {
      id: 's1',
      name: 'Someone You Loved',
      artist: 'Lewis Capaldi',
      image: 'https://picsum.photos/300/300?random=21',
      preview_url: null,
      external_urls: { spotify: 'https://open.spotify.com/track/s1' },
      duration_ms: 182000,
      popularity: 78
    },
    {
      id: 's2',
      name: 'All Too Well',
      artist: 'Taylor Swift',
      image: 'https://picsum.photos/300/300?random=22',
      preview_url: null,
      external_urls: { spotify: 'https://open.spotify.com/track/s2' },
      duration_ms: 330000,
      popularity: 80
    }
  ],
  excited: [
    {
      id: 'e1',
      name: 'Thunder',
      artist: 'Imagine Dragons',
      image: 'https://picsum.photos/300/300?random=31',
      preview_url: null,
      external_urls: { spotify: 'https://open.spotify.com/track/e1' },
      duration_ms: 187000,
      popularity: 83
    },
    {
      id: 'e2',
      name: 'Believer',
      artist: 'Imagine Dragons',
      image: 'https://picsum.photos/300/300?random=32',
      preview_url: null,
      external_urls: { spotify: 'https://open.spotify.com/track/e2' },
      duration_ms: 204000,
      popularity: 86
    }
  ],
  calm: [
    {
      id: 'c1',
      name: 'Perfect',
      artist: 'Ed Sheeran',
      image: 'https://picsum.photos/300/300?random=41',
      preview_url: null,
      external_urls: { spotify: 'https://open.spotify.com/track/c1' },
      duration_ms: 263000,
      popularity: 89
    },
    {
      id: 'c2',
      name: 'All of Me',
      artist: 'John Legend',
      image: 'https://picsum.photos/300/300?random=42',
      preview_url: null,
      external_urls: { spotify: 'https://open.spotify.com/track/c2' },
      duration_ms: 269000,
      popularity: 84
    }
  ],
  angry: [
    {
      id: 'a1',
      name: 'In the End',
      artist: 'Linkin Park',
      image: 'https://picsum.photos/300/300?random=51',
      preview_url: null,
      external_urls: { spotify: 'https://open.spotify.com/track/a1' },
      duration_ms: 216000,
      popularity: 91
    },
    {
      id: 'a2',
      name: 'Numb',
      artist: 'Linkin Park',
      image: 'https://picsum.photos/300/300?random=52',
      preview_url: null,
      external_urls: { spotify: 'https://open.spotify.com/track/a2' },
      duration_ms: 187000,
      popularity: 88
    }
  ],
  nostalgic: [
    {
      id: 'n1',
      name: 'Bohemian Rhapsody',
      artist: 'Queen',
      image: 'https://picsum.photos/300/300?random=61',
      preview_url: null,
      external_urls: { spotify: 'https://open.spotify.com/track/n1' },
      duration_ms: 355000,
      popularity: 94
    },
    {
      id: 'n2',
      name: 'Hotel California',
      artist: 'Eagles',
      image: 'https://picsum.photos/300/300?random=62',
      preview_url: null,
      external_urls: { spotify: 'https://open.spotify.com/track/n2' },
      duration_ms: 391000,
      popularity: 87
    }
  ]
};

// 음악 데이터 가져오기
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'recommendations';
    const limit = parseInt(searchParams.get('limit') || '20');
    const emotion = searchParams.get('emotion');
    const query = searchParams.get('query');

    let data;

    switch (type) {
      case 'emotion':
        if (!emotion) {
          return NextResponse.json(
            { error: 'Emotion parameter is required' },
            { status: 400 }
          );
        }
        data = emotionBasedTracks[emotion as keyof typeof emotionBasedTracks] || mockTracks.slice(0, 5);
        break;
      
      case 'search':
        if (!query) {
          return NextResponse.json(
            { error: 'Query parameter is required' },
            { status: 400 }
          );
        }
        // 검색 결과 시뮬레이션
        data = mockTracks.filter(track => 
          track.name.toLowerCase().includes(query.toLowerCase()) ||
          track.artist.toLowerCase().includes(query.toLowerCase())
        );
        break;
      
      case 'recent':
        data = mockTracks.slice(0, limit);
        break;
      
      default:
        data = mockTracks.slice(0, limit);
    }
    
    return NextResponse.json({
      success: true,
      data
    });

  } catch (error) {
    console.error('Music API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch music data' },
      { status: 500 }
    );
  }
}
