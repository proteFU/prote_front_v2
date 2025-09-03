

export interface SpotifyTrack {
  id: string;
  name: string;
  artist: string;
  image: string;
  preview_url?: string;
  external_urls: {
    spotify: string;
  };
  duration_ms: number;
  popularity: number;
}

export interface SpotifyPlaylist {
  id: string;
  name: string;
  description: string;
  image: string;
  tracks: {
    total: number;
  };
  external_urls: {
    spotify: string;
  };
}

// Spotify API 호출 헬퍼
async function spotifyRequest(endpoint: string, options: RequestInit = {}): Promise<any> {
  // 실제 Spotify API 호출 대신 샘플 데이터 반환
  // 실제 구현에서는 Spotify Web API를 사용해야 함
  return {
    tracks: [
      {
        id: '1',
        name: 'Sample Track 1',
        artists: [{ name: 'Sample Artist 1' }],
        album: { images: [{ url: 'https://picsum.photos/300/300?random=400' }] },
        preview_url: null,
        external_urls: { spotify: 'https://open.spotify.com/track/1' },
        duration_ms: 180000,
        popularity: 80,
      },
      {
        id: '2',
        name: 'Sample Track 2',
        artists: [{ name: 'Sample Artist 2' }],
        album: { images: [{ url: 'https://picsum.photos/300/300?random=400' }] },
        preview_url: null,
        external_urls: { spotify: 'https://open.spotify.com/track/2' },
        duration_ms: 200000,
        popularity: 75,
      }
    ],
    items: [
      {
        id: '1',
        name: 'Sample Playlist 1',
        description: 'Sample playlist description',
        images: [{ url: 'https://via.placeholder.com/300x300/FF6B6B/FFFFFF?text=Sample+Playlist' }],
        tracks: { total: 10 },
        external_urls: { spotify: 'https://open.spotify.com/playlist/1' },
      }
    ]
  };
}

// 추천 음악 가져오기
export async function getRecommendations(seedGenres: string[] = ['pop'], limit: number = 20): Promise<SpotifyTrack[]> {
  const params = new URLSearchParams({
    seed_genres: seedGenres.join(','),
    limit: limit.toString(),
  });

  const data = await spotifyRequest(`/recommendations?${params}`);
  
  return data.tracks.map((track: any) => ({
    id: track.id,
    name: track.name,
    artist: track.artists[0]?.name || 'Unknown Artist',
    image: track.album.images[0]?.url || '',
    preview_url: track.preview_url,
    external_urls: track.external_urls,
    duration_ms: track.duration_ms,
    popularity: track.popularity,
  }));
}

// 감정 기반 음악 추천
export async function getEmotionBasedRecommendations(emotion: string, intensity: number = 5): Promise<SpotifyTrack[]> {
  const emotionMap: { [key: string]: { genres: string[], target_energy?: number, target_valence?: number } } = {
    happy: { 
      genres: ['pop', 'dance', 'funk'], 
      target_energy: 0.8, 
      target_valence: 0.9 
    },
    sad: { 
      genres: ['blues', 'indie', 'acoustic'], 
      target_energy: 0.3, 
      target_valence: 0.2 
    },
    angry: { 
      genres: ['rock', 'metal', 'punk'], 
      target_energy: 0.9, 
      target_valence: 0.1 
    },
    excited: { 
      genres: ['electronic', 'house', 'trance'], 
      target_energy: 0.9, 
      target_valence: 0.8 
    },
    calm: { 
      genres: ['ambient', 'classical', 'jazz'], 
      target_energy: 0.2, 
      target_valence: 0.5 
    },
    nostalgic: { 
      genres: ['indie', 'folk', 'alternative'], 
      target_energy: 0.4, 
      target_valence: 0.4 
    },
  };

  const emotionConfig = emotionMap[emotion] || emotionMap.happy;
  
  const params = new URLSearchParams({
    seed_genres: emotionConfig.genres.join(','),
    limit: '20',
  });

  if (emotionConfig.target_energy) {
    params.append('target_energy', emotionConfig.target_energy.toString());
  }
  if (emotionConfig.target_valence) {
    params.append('target_valence', emotionConfig.target_valence.toString());
  }

  const data = await spotifyRequest(`/recommendations?${params}`);
  
  return data.tracks.map((track: any) => ({
    id: track.id,
    name: track.name,
    artist: track.artists[0]?.name || 'Unknown Artist',
    image: track.album.images[0]?.url || '',
    preview_url: track.preview_url,
    external_urls: track.external_urls,
    duration_ms: track.duration_ms,
    popularity: track.popularity,
  }));
}

// 사용자의 플레이리스트 가져오기
export async function getUserPlaylists(): Promise<SpotifyPlaylist[]> {
  const data = await spotifyRequest('/me/playlists');
  
  return data.items.map((playlist: any) => ({
    id: playlist.id,
    name: playlist.name,
    description: playlist.description,
    image: playlist.images[0]?.url || '',
    tracks: {
      total: playlist.tracks.total,
    },
    external_urls: playlist.external_urls,
  }));
}

// 트랙 검색
export async function searchTracks(query: string, limit: number = 20): Promise<SpotifyTrack[]> {
  const params = new URLSearchParams({
    q: query,
    type: 'track',
    limit: limit.toString(),
  });

  const data = await spotifyRequest(`/search?${params}`);
  
  return data.tracks.items.map((track: any) => ({
    id: track.id,
    name: track.name,
    artist: track.artists[0]?.name || 'Unknown Artist',
    image: track.album.images[0]?.url || '',
    preview_url: track.preview_url,
    external_urls: track.external_urls,
    duration_ms: track.duration_ms,
    popularity: track.popularity,
  }));
}

// 사용자의 최근 재생 트랙
export async function getRecentlyPlayed(limit: number = 20): Promise<SpotifyTrack[]> {
  const params = new URLSearchParams({
    limit: limit.toString(),
  });

  const data = await spotifyRequest(`/me/player/recently-played?${params}`);
  
  return data.items.map((item: any) => ({
    id: item.track.id,
    name: item.track.name,
    artist: item.track.artists[0]?.name || 'Unknown Artist',
    image: item.track.album.images[0]?.url || '',
    preview_url: item.track.preview_url,
    external_urls: item.track.external_urls,
    duration_ms: item.track.duration_ms,
    popularity: item.track.popularity,
  }));
}
