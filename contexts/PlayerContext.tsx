"use client"

import { createContext, useContext, useState, useRef, useEffect, useCallback, ReactNode } from 'react';

interface Track {
  id: string;
  name: string;
  artist: string;
  image: string;
  audioUrl?: string;
}

interface PlayerContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  isMiniPlayerVisible: boolean;
  isFullPlayerVisible: boolean;
  currentTime: number;
  duration: number;
  playlist: Track[];
  currentTrackIndex: number;
  playTrack: (track: Track, autoPlay?: boolean) => void;
  playPlaylist: (tracks: Track[], startIndex?: number, autoPlay?: boolean) => void;
  playNext: () => void;
  playPrevious: () => void;
  togglePlay: () => void;
  showMiniPlayer: () => void;
  hideMiniPlayer: () => void;
  showFullPlayer: () => void;
  hideFullPlayer: () => void;
  seekTo: (time: number) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMiniPlayerVisible, setIsMiniPlayerVisible] = useState(false);
  const [isFullPlayerVisible, setIsFullPlayerVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180); // 기본 3분 길이
  const [playlist, setPlaylist] = useState<Track[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 기본 오디오 URL 생성 (실제로는 API에서 가져올 수 있음)
  const getDefaultAudioUrl = useCallback((trackId: string) => {
    // 무료 음악 샘플 URL들 (실제 서비스에서는 음악 라이브러리 API 사용)
    const sampleUrls = [
      'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
      'https://www.soundjay.com/misc/sounds/bell-ringing-01.wav',
      'https://www.soundjay.com/misc/sounds/bell-ringing-02.wav',
      'https://www.soundjay.com/misc/sounds/bell-ringing-03.wav',
      'https://www.soundjay.com/misc/sounds/bell-ringing-04.wav',
    ];
    
    // trackId를 기반으로 샘플 URL 선택
    const index = parseInt(trackId) % sampleUrls.length;
    return sampleUrls[index];
  }, []);

  const playTrack = useCallback((track: Track, autoPlay: boolean = true) => {
    setCurrentTrack(track);
    setIsMiniPlayerVisible(true);
    setIsFullPlayerVisible(false);
    setCurrentTime(0); // 시간 초기화
    
    console.log(`곡 선택: ${track.name} - ${track.artist}`);
    
    // 시뮬레이션 모드로 즉시 재생 상태 설정
    if (autoPlay && hasUserInteracted) {
      setIsPlaying(true);
      console.log(`시뮬레이션 재생: ${track.name}`);
    } else {
      setIsPlaying(false);
      console.log(`곡 로드됨: ${track.name} (재생 대기 중)`);
    }
  }, [hasUserInteracted]);

  // 자동으로 다음 곡 재생하는 함수
  const handleTrackEnd = useCallback(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    // 자동으로 다음 곡 재생 (사용자 상호작용이 있었을 때만)
    if (hasUserInteracted && playlist.length > 0) {
      setCurrentTrackIndex(prevIndex => {
        const nextIndex = (prevIndex + 1) % playlist.length;
        // 다음 곡을 재생하되, 상태 업데이트는 비동기적으로 처리
        setTimeout(() => {
          if (playlist[nextIndex]) {
            playTrack(playlist[nextIndex], true);
          }
        }, 100);
        return nextIndex;
      });
    }
  }, [hasUserInteracted, playlist, playTrack]);

  // 오디오 초기화 (시뮬레이션 모드에서는 사용하지 않음)
  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     audioRef.current = new Audio();
  //     
  //     const audio = audioRef.current;
  //     
  //     audio.addEventListener('loadedmetadata', () => {
  //       setDuration(audio.duration || 180);
  //     });
  //     
  //     audio.addEventListener('timeupdate', () => {
  //       setCurrentTime(audio.currentTime);
  //     });
  //     
  //     audio.addEventListener('ended', handleTrackEnd);
  //     
  //     return () => {
  //       audio.removeEventListener('loadedmetadata', () => {});
  //       audio.removeEventListener('timeupdate', () => {});
  //       audio.removeEventListener('ended', handleTrackEnd);
  //     };
  //   }
  // }, [handleTrackEnd]);

  // 시뮬레이션 모드에서 시간 진행
  useEffect(() => {
    if (isPlaying && currentTrack) {
      // 시뮬레이션 시간 진행
      const interval = setInterval(() => {
        setCurrentTime(prevTime => {
          const newTime = prevTime + 1;
          // 곡이 끝나면 다음 곡으로
          if (newTime >= duration) {
            handleTrackEnd();
            return 0;
          }
          return newTime;
        });
      }, 1000);
      
      return () => {
        clearInterval(interval);
      };
    }
  }, [isPlaying, currentTrack, duration, handleTrackEnd]);

  const playPlaylist = useCallback((tracks: Track[], startIndex: number = 0, autoPlay: boolean = true) => {
    setPlaylist(tracks);
    setCurrentTrackIndex(startIndex);
    if (tracks.length > 0) {
      playTrack(tracks[startIndex], autoPlay);
    }
  }, [playTrack]);

  const playNext = useCallback(() => {
    if (playlist.length === 0) return;
    
    setCurrentTrackIndex(prevIndex => {
      const nextIndex = (prevIndex + 1) % playlist.length;
      playTrack(playlist[nextIndex]);
      return nextIndex;
    });
  }, [playlist, playTrack]);

  const playPrevious = useCallback(() => {
    if (playlist.length === 0) return;
    
    setCurrentTrackIndex(prevIndex => {
      const newIndex = prevIndex === 0 ? playlist.length - 1 : prevIndex - 1;
      playTrack(playlist[newIndex]);
      return newIndex;
    });
  }, [playlist, playTrack]);

  const togglePlay = useCallback(() => {
    if (!currentTrack) return;
    
    // 사용자 상호작용 기록
    setHasUserInteracted(true);
    
    if (isPlaying) {
      setIsPlaying(false);
      console.log(`정지: ${currentTrack.name}`);
    } else {
      setIsPlaying(true);
      console.log(`재생: ${currentTrack.name}`);
    }
  }, [isPlaying, currentTrack]);

  const seekTo = useCallback((time: number) => {
    // 시뮬레이션 모드에서 시간 업데이트
    setCurrentTime(time);
  }, []);

  const showMiniPlayer = useCallback(() => {
    setIsMiniPlayerVisible(true);
    setIsFullPlayerVisible(false);
  }, []);

  const hideMiniPlayer = useCallback(() => {
    setIsMiniPlayerVisible(false);
  }, []);

  const showFullPlayer = useCallback(() => {
    setIsFullPlayerVisible(true);
    setIsMiniPlayerVisible(false);
  }, []);

  const hideFullPlayer = useCallback(() => {
    setIsFullPlayerVisible(false);
    if (currentTrack) {
      setIsMiniPlayerVisible(true);
    }
  }, [currentTrack]);

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        isMiniPlayerVisible,
        isFullPlayerVisible,
        currentTime,
        duration,
        playlist,
        currentTrackIndex,
        playTrack,
        playPlaylist,
        playNext,
        playPrevious,
        togglePlay,
        showMiniPlayer,
        hideMiniPlayer,
        showFullPlayer,
        hideFullPlayer,
        seekTo,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
}
