"use client"

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePlayer } from '@/contexts/PlayerContext';

interface Track {
  id: string;
  name: string;
  artist: string;
  image: string;
  album?: string;
  duration?: number;
  genre?: string;
  year?: number;
}

export default function MusicDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { 
    currentTrack, 
    isPlaying, 
    playlist, 
    currentTrackIndex,
    togglePlay, 
    playNext, 
    playPrevious,
    playPlaylist,
    playTrack,
    showFullPlayer,
    hideFullPlayer,
    isFullPlayerVisible
  } = usePlayer();
  
  const [track, setTrack] = useState<Track | null>(null);
  const [showLyrics, setShowLyrics] = useState(false);
  const [showFullScreenLyrics, setShowFullScreenLyrics] = useState(false);
  const [isInPlaylist, setIsInPlaylist] = useState(false);
  const [trackIndex, setTrackIndex] = useState(-1);

  // Mock 데이터 (실제로는 API에서 가져올 수 있음)
  const mockTracks: Track[] = [
    {
      id: '1',
      name: 'Blinding Lights',
      artist: 'The Weeknd',
      image: 'https://picsum.photos/300/300?random=1',
      album: 'After Hours',
      duration: 200,
      genre: 'Pop',
      year: 2020
    },
    {
      id: '2',
      name: 'Watermelon Sugar',
      artist: 'Harry Styles',
      image: 'https://picsum.photos/300/300?random=2',
      album: 'Fine Line',
      duration: 174,
      genre: 'Pop Rock',
      year: 2020
    },
    {
      id: '3',
      name: 'Levitating',
      artist: 'Dua Lipa',
      image: 'https://picsum.photos/300/300?random=3',
      album: 'Future Nostalgia',
      duration: 203,
      genre: 'Disco Pop',
      year: 2020
    },
    {
      id: '4',
      name: 'Good 4 U',
      artist: 'Olivia Rodrigo',
      image: 'https://picsum.photos/300/300?random=4',
      album: 'SOUR',
      duration: 178,
      genre: 'Pop Punk',
      year: 2021
    },
    {
      id: '5',
      name: 'Stay',
      artist: 'The Kid LAROI & Justin Bieber',
      image: 'https://picsum.photos/300/300?random=5',
      album: 'F*CK LOVE 3',
      duration: 141,
      genre: 'Pop',
      year: 2021
    }
  ];

  useEffect(() => {
    const trackId = params.id as string;
    const foundTrack = mockTracks.find(t => t.id === trackId);
    
    if (foundTrack) {
      setTrack(foundTrack);
      
      // 현재 플레이리스트에서 해당 트랙이 있는지 확인
      const index = playlist.findIndex(t => t.id === trackId);
      if (index !== -1) {
        setIsInPlaylist(true);
        setTrackIndex(index);
      }
    }
  }, [params.id, playlist]);

  const handlePlay = () => {
    if (track) {
      if (isInPlaylist) {
        // 플레이리스트에 있으면 해당 곡부터 재생
        const index = playlist.findIndex(t => t.id === track.id);
        if (index !== -1) {
          // 이미 현재 재생 중인 곡이면 토글만
          if (currentTrack?.id === track.id) {
            togglePlay();
          } else {
            // 다른 곡이면 해당 곡부터 플레이리스트 재생
            playPlaylist(playlist, index, true);
          }
        }
      } else {
        // 플레이리스트에 없으면 단일 곡으로 재생
        playTrack({
          id: track.id,
          name: track.name,
          artist: track.artist,
          image: track.image
        }, true);
      }
    }
  };

  const handleAddToPlaylist = () => {
    if (track && !isInPlaylist) {
      // 플레이리스트에 추가하는 로직
      console.log('플레이리스트에 추가:', track.name);
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!track) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">곡을 찾을 수 없습니다.</div>
      </div>
    );
  }

  const isCurrentTrack = currentTrack?.id === track.id;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Blurred Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${track.image})`,
          filter: 'blur(20px)',
          transform: 'scale(1.1)'
        }}
      />
      <div className="absolute inset-0 bg-black/60" />
      
      {/* Content */}
      <div className="relative z-10 p-4">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => router.back()}
          className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors"
        >
          <div className="w-0 h-0 border-r-[6px] border-r-white border-y-[4px] border-y-transparent"></div>
        </button>
        <h1 className="text-white text-xl font-semibold">곡 정보</h1>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Album Art & Basic Info */}
          <div className="flex flex-col items-center">
            <div className="relative mb-8">
              <div className={`w-72 h-72 bg-white rounded-full overflow-hidden shadow-2xl transition-transform duration-300 ${
                isCurrentTrack && isPlaying ? 'animate-spin' : ''
              }`} style={{
                animationDuration: '3s'
              }}>
                <Image
                  src={track.image}
                  alt={track.name}
                  width={288}
                  height={288}
                  className="object-cover w-full h-full"
                />
              </div>
              {/* LP Center Hole */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-black rounded-full border-2 border-gray-300"></div>
            </div>
            
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-3">{track.name}</h1>
              <p className="text-gray-300 text-2xl mb-4">{track.artist}</p>
              {track.album && (
                <p className="text-gray-400 text-lg">from {track.album}</p>
              )}
            </div>

            {/* Play Controls */}
            <div className="flex items-center gap-6 mb-8">
              <button
                onClick={playPrevious}
                disabled={!isInPlaylist || trackIndex <= 0}
                className="w-14 h-14 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="w-0 h-0 border-r-[10px] border-r-white border-y-[8px] border-y-transparent"></div>
              </button>
              
              <button
                onClick={handlePlay}
                className="w-20 h-20 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors shadow-lg"
              >
                {isCurrentTrack && isPlaying ? (
                  <div className="w-8 h-8 bg-black rounded-sm flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-sm"></div>
                  </div>
                ) : (
                  <div className="w-0 h-0 border-l-[16px] border-l-black border-y-[12px] border-y-transparent ml-1"></div>
                )}
              </button>
              
              <button
                onClick={playNext}
                disabled={!isInPlaylist || trackIndex >= playlist.length - 1}
                className="w-14 h-14 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="w-0 h-0 border-l-[10px] border-l-white border-y-[8px] border-y-transparent"></div>
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowLyrics(!showLyrics)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full font-semibold transition-colors"
              >
                {showLyrics ? '가사 숨기기' : '가사 보기'}
              </button>
              
              {!isInPlaylist && (
                <button
                  onClick={handleAddToPlaylist}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full font-semibold transition-colors"
                >
                  플레이리스트에 추가
                </button>
              )}
              
              <button
                onClick={isFullPlayerVisible ? hideFullPlayer : showFullPlayer}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-full font-semibold transition-colors"
              >
                {isFullPlayerVisible ? '플레이어 닫기' : '전체 플레이어'}
              </button>
            </div>
          </div>

          {/* Track Details */}
          <div className="space-y-6">
            <div className="bg-white/5 rounded-lg p-6">
              <h2 className="text-white text-xl font-semibold mb-4">곡 정보</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">제목</span>
                  <span className="text-white">{track.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">아티스트</span>
                  <span className="text-white">{track.artist}</span>
                </div>
                {track.album && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">앨범</span>
                    <span className="text-white">{track.album}</span>
                  </div>
                )}
                {track.duration && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">길이</span>
                    <span className="text-white">{formatDuration(track.duration)}</span>
                  </div>
                )}
                {track.genre && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">장르</span>
                    <span className="text-white">{track.genre}</span>
                  </div>
                )}
                {track.year && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">발매년도</span>
                    <span className="text-white">{track.year}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Lyrics Section */}
            {showLyrics && (
              <div className="bg-white/5 rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-white text-xl font-semibold">가사</h2>
                  <button
                    onClick={() => setShowFullScreenLyrics(true)}
                    className="text-purple-400 hover:text-purple-300 text-sm transition-colors"
                  >
                    전체화면
                  </button>
                </div>
                <div 
                  className="space-y-4 max-h-80 overflow-y-auto cursor-pointer"
                  onClick={() => setShowFullScreenLyrics(true)}
                >
                  {getLyrics(track.id).map((line, index) => (
                    <p key={index} className="text-gray-300 text-base leading-relaxed">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Playlist Status */}
            {isInPlaylist && (
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-400 text-sm">
                    현재 플레이리스트에 포함됨 ({trackIndex + 1}/{playlist.length})
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Full Screen Lyrics Modal */}
      {showFullScreenLyrics && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-lg overflow-hidden">
                <Image
                  src={track.image}
                  alt={track.name}
                  width={48}
                  height={48}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <h2 className="text-white font-semibold">{track.name}</h2>
                <p className="text-gray-400 text-sm">{track.artist}</p>
              </div>
            </div>
            <button
              onClick={() => setShowFullScreenLyrics(false)}
              className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors"
            >
              <div className="w-4 h-4 border-2 border-white rounded-sm"></div>
            </button>
          </div>

          {/* Lyrics Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-2xl mx-auto">
              <div className="space-y-4">
                {getLyrics(track.id).map((line, index) => (
                  <p 
                    key={index} 
                    className="text-white text-lg leading-relaxed text-center"
                  >
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Footer with Play Controls */}
          <div className="border-t border-gray-800 p-4">
            <div className="max-w-md mx-auto flex items-center justify-center gap-6">
              <button
                onClick={playPrevious}
                disabled={!isInPlaylist || trackIndex <= 0}
                className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="w-0 h-0 border-r-[8px] border-r-white border-y-[6px] border-y-transparent"></div>
              </button>
              
              <button
                onClick={handlePlay}
                className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                {isCurrentTrack && isPlaying ? (
                  <div className="w-5 h-5 bg-black rounded-sm flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-sm"></div>
                  </div>
                ) : (
                  <div className="w-0 h-0 border-l-[10px] border-l-black border-y-[7px] border-y-transparent ml-1"></div>
                )}
              </button>
              
              <button
                onClick={playNext}
                disabled={!isInPlaylist || trackIndex >= playlist.length - 1}
                className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="w-0 h-0 border-l-[8px] border-l-white border-y-[6px] border-y-transparent"></div>
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

// 가사 데이터 (실제로는 API에서 가져올 수 있음)
function getLyrics(trackId: string): string[] {
  const lyricsMap: { [key: string]: string[] } = {
    '1': [
      "I've been tryna call",
      "I've been on my own for long enough",
      "Maybe you can show me how to love, maybe",
      "I'm going through withdrawals",
      "You don't even have to do too much",
      "You can turn me on with just a touch, baby",
      "I look around and",
      "Sin City's cold and empty (oh)",
      "No one's around to judge me (oh)",
      "I can't see clearly when you're gone",
      "I said, ooh, I'm blinded by the lights",
      "No, I can't sleep until I feel your touch",
      "I said, ooh, I'm drowning in the night",
      "Oh, when I'm like this, you're the one I trust"
    ],
    '2': [
      "Tastes like strawberries on a summer evenin'",
      "And it sounds just like a song",
      "I want more berries and that summer feelin'",
      "It's so wonderful and warm",
      "Breathe me in, breathe me out",
      "I don't know if I could ever go without",
      "I'm just thinking out loud",
      "I don't know if I could ever go without",
      "Watermelon sugar high",
      "Watermelon sugar high",
      "Watermelon sugar high",
      "Watermelon sugar high"
    ],
    '3': [
      "If you wanna run away with me, I know a galaxy",
      "And I can take you for a ride",
      "I had a premonition that we fell into a rhythm",
      "Where the music don't stop for life",
      "Glitter in the sky, glitter in my eyes",
      "Shining just the way I like",
      "If you're feeling like you need a little bit of company",
      "You met me at the perfect time",
      "You want me, I want you, baby",
      "My sugarboo, I'm levitating",
      "The Milky Way, we're renegading",
      "Yeah, yeah, yeah, yeah, yeah"
    ],
    '4': [
      "Well, good for you, you look happy and healthy, not me",
      "If you ever cared to ask",
      "Good for you, you're doing great out there without me, baby",
      "God, I wish that I could do that",
      "I've lost my mind, I've spent the night",
      "Crying on the floor of my bathroom",
      "But you're so unaffected, I really don't get it",
      "But I guess good for you",
      "Good for you, you look happy and healthy, not me",
      "If you ever cared to ask",
      "Good for you, you're doing great out there without me, baby",
      "Like a damn sociopath"
    ],
    '5': [
      "I do the same thing I told you that I never would",
      "I told you I'd change, even when I knew I never could",
      "I know that I can't find nobody else as good as you",
      "I need you to stay, need you to stay, hey",
      "I get drunk, I wake up, I'm wasted still",
      "I realize the time that I wasted here",
      "I feel like you can't feel the way I feel",
      "I'll be fucked up, if you can't be right here",
      "I do the same thing I told you that I never would",
      "I told you I'd change, even when I knew I never could",
      "I know that I can't find nobody else as good as you",
      "I need you to stay, need you to stay, hey"
    ]
  };
  
  return lyricsMap[trackId] || ["가사를 찾을 수 없습니다."];
}
