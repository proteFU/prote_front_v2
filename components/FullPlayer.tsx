"use client"

import { useState } from 'react';
import { usePlayer } from '@/contexts/PlayerContext';
import Image from 'next/image';

interface FullPlayerProps {
  isVisible: boolean;
  currentTrack: {
    id: string;
    name: string;
    artist: string;
    image: string;
  } | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onClose: () => void;
}

export default function FullPlayer({ 
  isVisible, 
  currentTrack, 
  isPlaying, 
  onTogglePlay, 
  onClose 
}: FullPlayerProps) {
  const { currentTime, duration, seekTo, playlist, playNext, playPrevious } = usePlayer();
  const [showFullScreenLyrics, setShowFullScreenLyrics] = useState(false);

  if (!isVisible || !currentTrack) return null;

  // 가사 데이터 (실제로는 API에서 가져올 수 있음)
  const getLyrics = (trackId: string) => {
    const lyricsMap: { [key: string]: string[] } = {
      '1': [
        "How do I look? 내가 변했냐구?",
        "티비를 틀어봐 I'm the woman on the moon",
        "네 머리 위로 사뿐사뿐 걸어 feel no gravity",
        "우린 어떤 때보다도 ain't no diggity",
        "Bad news, bad news",
        "I'm the woman on the moon",
        "Bad news, bad news",
        "Feel no gravity"
      ],
      '2': [
        "밤하늘에 별이 반짝이는 것처럼",
        "너의 눈빛이 내 마음을 비춰주네",
        "이 순간이 영원했으면 좋겠어",
        "함께 있는 시간이 너무 소중해",
        "사랑해, 사랑해",
        "너를 사랑해",
        "이 세상에 너만이 내 전부야"
      ],
      '3': [
        "힘들었던 하루가 지나가고",
        "새로운 시작을 준비해",
        "꿈을 향해 달려가자",
        "포기하지 말고 계속해",
        "We can do it, we can do it",
        "함께라면 할 수 있어",
        "Never give up, never give up"
      ],
      '4': [
        "추억 속으로 돌아가고 싶어",
        "그때의 우리가 그리워",
        "시간이 흘러도 변하지 않는",
        "소중한 기억들이 있어",
        "Remember, remember",
        "그때를 기억해",
        "Forever in my heart"
      ],
      '5': [
        "새로운 시작을 맞이하며",
        "희망을 품고 나아가자",
        "어려움이 있어도 괜찮아",
        "우리는 함께니까",
        "New beginning, new hope",
        "새로운 시작이야",
        "Everything will be alright"
      ]
    };
    
    return lyricsMap[trackId] || lyricsMap['1'];
  };

  const lyrics = getLyrics(currentTrack.id);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col overflow-hidden">
      {/* Blurred Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${currentTrack.image})`,
          filter: 'blur(20px)',
          transform: 'scale(1.1)'
        }}
      />
      <div className="absolute inset-0 bg-black/70" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors"
        >
          <div className="w-0 h-0 border-r-[6px] border-r-white border-y-[4px] border-y-transparent"></div>
        </button>
        <h2 className="text-white font-semibold">Now Playing</h2>
        <div className="w-8"></div>
      </div>

      {/* Album Art & Song Info */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="relative mb-8">
          <div className={`w-72 h-72 bg-white rounded-full overflow-hidden shadow-2xl transition-transform duration-300 ${
            isPlaying ? 'animate-spin' : ''
          }`} style={{
            animationDuration: '3s'
          }}>
            <Image
              src={currentTrack.image}
              alt={currentTrack.name}
              width={288}
              height={288}
              className="object-cover w-full h-full"
            />
          </div>
          {/* LP Center Hole */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-black rounded-full border-2 border-gray-300"></div>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">{currentTrack.name}</h1>
          <p className="text-gray-300 text-xl">{currentTrack.artist}</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-lg mb-8">
          <div className="flex justify-between text-sm text-gray-300 mb-3">
            <span className="font-medium">{formatTime(currentTime)}</span>
            <span className="font-medium">{formatTime(duration)}</span>
          </div>
          <div 
            className="w-full bg-gray-600 rounded-full h-1 cursor-pointer"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const percentage = clickX / rect.width;
              const newTime = percentage * duration;
              seekTo(newTime);
            }}
          >
            <div 
              className="bg-white h-1 rounded-full transition-all duration-300"
              style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
            ></div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-8 mb-8">
          <button 
            onClick={playPrevious}
            disabled={playlist.length <= 1}
            className="w-12 h-12 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="w-0 h-0 border-r-[10px] border-r-white border-y-[8px] border-y-transparent"></div>
          </button>
          <button
            onClick={onTogglePlay}
            className="w-20 h-20 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors shadow-lg"
          >
            {isPlaying ? (
              <div className="w-8 h-8 bg-black rounded-sm flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-sm"></div>
              </div>
            ) : (
              <div className="w-0 h-0 border-l-[16px] border-l-black border-y-[12px] border-y-transparent ml-1"></div>
            )}
          </button>
          <button 
            onClick={playNext}
            disabled={playlist.length <= 1}
            className="w-12 h-12 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="w-0 h-0 border-l-[10px] border-l-white border-y-[8px] border-y-transparent"></div>
          </button>
        </div>
      </div>

      {/* Lyrics */}
      <div className="h-80 overflow-y-auto p-6 border-t border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white font-semibold text-lg">Lyrics</h3>
          <button
            onClick={() => setShowFullScreenLyrics(true)}
            className="text-purple-400 hover:text-purple-300 text-sm transition-colors"
          >
            전체화면
          </button>
        </div>
        <div 
          className="space-y-4 cursor-pointer"
          onClick={() => setShowFullScreenLyrics(true)}
        >
          {lyrics.map((line, index) => (
            <p 
              key={index}
              className={`text-base leading-relaxed transition-colors ${
                index === Math.floor((currentTime / duration) * lyrics.length) 
                  ? 'text-white font-medium' 
                  : 'text-gray-400'
              }`}
            >
              {line}
            </p>
          ))}
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
                  src={currentTrack.image}
                  alt={currentTrack.name}
                  width={48}
                  height={48}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <h2 className="text-white font-semibold">{currentTrack.name}</h2>
                <p className="text-gray-400 text-sm">{currentTrack.artist}</p>
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
                {lyrics.map((line, index) => (
                  <p 
                    key={index} 
                    className={`text-lg leading-relaxed text-center transition-colors ${
                      index === Math.floor((currentTime / duration) * lyrics.length) 
                        ? 'text-white font-medium' 
                        : 'text-gray-300'
                    }`}
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
                disabled={playlist.length <= 1}
                className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="w-0 h-0 border-r-[8px] border-r-white border-y-[6px] border-y-transparent"></div>
              </button>
              
              <button
                onClick={onTogglePlay}
                className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                {isPlaying ? (
                  <div className="w-5 h-5 bg-black rounded-sm flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-sm"></div>
                  </div>
                ) : (
                  <div className="w-0 h-0 border-l-[10px] border-l-black border-y-[7px] border-y-transparent ml-1"></div>
                )}
              </button>
              
              <button
                onClick={playNext}
                disabled={playlist.length <= 1}
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
