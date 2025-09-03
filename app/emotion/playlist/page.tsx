"use client"

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from "next/image";
import { usePlayer } from '@/contexts/PlayerContext';

// 감정별 음악 추천 데이터
const emotionMusic = {
  happy: [
    { id: '1', name: 'Happy', artist: 'Pharrell Williams', image: 'https://picsum.photos/300/300?random=11' },
    { id: '2', name: 'Can\'t Stop the Feeling!', artist: 'Justin Timberlake', image: 'https://picsum.photos/300/300?random=12' },
    { id: '3', name: 'Good as Hell', artist: 'Lizzo', image: 'https://picsum.photos/300/300?random=13' },
    { id: '4', name: 'Sunflower', artist: 'Post Malone & Swae Lee', image: 'https://picsum.photos/300/300?random=14' }
  ],
  anxious: [
    { id: '5', name: 'Breathe', artist: 'Pink Floyd', image: 'https://i.pinimg.com/736x/12/db/a2/12dba21bc2b2e60dac71571451537c57.jpg' },
    { id: '6', name: 'Weightless', artist: 'Marconi Union', image: 'https://picsum.photos/300/300?random=16' },
    { id: '7', name: 'Calm Down', artist: 'Rema', image: 'https://picsum.photos/300/300?random=17' },
    { id: '8', name: 'Peaceful', artist: 'Enya', image: 'https://picsum.photos/300/300?random=18' }
  ],
  comfortable: [
    { id: '9', name: 'Perfect', artist: 'Ed Sheeran', image: 'https://picsum.photos/300/300?random=19' },
    { id: '10', name: 'All of Me', artist: 'John Legend', image: 'https://picsum.photos/300/300?random=20' },
    { id: '11', name: 'Thinking Out Loud', artist: 'Ed Sheeran', image: 'https://picsum.photos/300/300?random=21' },
    { id: '12', name: 'A Thousand Years', artist: 'Christina Perri', image: 'https://picsum.photos/300/300?random=22' }
  ],
  sad: [
    { id: '13', name: 'Someone You Loved', artist: 'Lewis Capaldi', image: 'https://picsum.photos/300/300?random=23' },
    { id: '14', name: 'All Too Well', artist: 'Taylor Swift', image: 'https://picsum.photos/300/300?random=24' },
    { id: '15', name: 'Hurt', artist: 'Johnny Cash', image: 'https://picsum.photos/300/300?random=25' },
    { id: '16', name: 'Mad World', artist: 'Gary Jules', image: 'https://picsum.photos/300/300?random=26' }
  ],
  nostalgic: [
    { id: '17', name: 'Bohemian Rhapsody', artist: 'Queen', image: 'https://picsum.photos/300/300?random=27' },
    { id: '18', name: 'Hotel California', artist: 'Eagles', image: 'https://picsum.photos/300/300?random=28' },
    { id: '19', name: 'Sweet Child O\' Mine', artist: 'Guns N\' Roses', image: 'https://picsum.photos/300/300?random=29' },
    { id: '20', name: 'Don\'t Stop Believin\'', artist: 'Journey', image: 'https://picsum.photos/300/300?random=30' }
  ],
  excited: [
    { id: '21', name: 'Thunder', artist: 'Imagine Dragons', image: 'https://picsum.photos/300/300?random=31' },
    { id: '22', name: 'Believer', artist: 'Imagine Dragons', image: 'https://picsum.photos/300/300?random=32' },
    { id: '23', name: 'Eye of the Tiger', artist: 'Survivor', image: 'https://picsum.photos/300/300?random=33' },
    { id: '24', name: 'We Will Rock You', artist: 'Queen', image: 'https://picsum.photos/300/300?random=34' }
  ],
  remorseful: [
    { id: '25', name: 'Hurt', artist: 'Johnny Cash', image: 'https://picsum.photos/300/300?random=35' },
    { id: '26', name: 'Mad World', artist: 'Gary Jules', image: 'https://picsum.photos/300/300?random=36' },
    { id: '27', name: 'The Sound of Silence', artist: 'Simon & Garfunkel', image: 'https://picsum.photos/300/300?random=37' },
    { id: '28', name: 'Creep', artist: 'Radiohead', image: 'https://picsum.photos/300/300?random=38' }
  ],
  lonely: [
    { id: '29', name: 'Lonely', artist: 'Akon', image: 'https://picsum.photos/300/300?random=39' },
    { id: '30', name: 'The Sound of Silence', artist: 'Simon & Garfunkel', image: 'https://picsum.photos/300/300?random=40' },
    { id: '31', name: 'Hurt', artist: 'Nine Inch Nails', image: 'https://picsum.photos/300/300?random=41' },
    { id: '32', name: 'Everybody Hurts', artist: 'R.E.M.', image: 'https://picsum.photos/300/300?random=42' }
  ]
};

const emotionLabels = {
  happy: 'Happy',
  anxious: 'Anxious', 
  comfortable: 'Comfortable',
  sad: 'Sad',
  nostalgic: 'Nostalgic',
  excited: 'Excited',
  remorseful: 'Remorseful',
  lonely: 'Lonely'
};

export default function EmotionPlaylist() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { playTrack, playPlaylist } = usePlayer();
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [recommendedMusic, setRecommendedMusic] = useState<any[]>([]);
  const [currentPlaying, setCurrentPlaying] = useState<string | null>(null);

  useEffect(() => {
    const emotions = searchParams.get('emotions');
    if (emotions) {
      const emotionArray = emotions.split(',');
      setSelectedEmotions(emotionArray);
      
      // 감정별 음악 추천
      const allMusic: any[] = [];
      emotionArray.forEach(emotion => {
        if (emotionMusic[emotion as keyof typeof emotionMusic]) {
          allMusic.push(...emotionMusic[emotion as keyof typeof emotionMusic]);
        }
      });
      
      // 중복 제거 및 랜덤하게 섞기
      const uniqueMusic = allMusic.filter((music, index, self) => 
        index === self.findIndex(m => m.id === music.id)
      );
      
      const finalMusic = uniqueMusic.slice(0, 8); // 최대 8곡 추천
      setRecommendedMusic(finalMusic);
      
      // 첫 번째 곡 로드 (자동 재생 비활성화)
      if (finalMusic.length > 0) {
        setCurrentPlaying(finalMusic[0].id);
        // 플레이리스트로 설정하고 첫 번째 곡 로드 (자동 재생 안함)
        playPlaylist(finalMusic, 0, false);
      }
    }
  }, [searchParams, playPlaylist]);

  const playMusic = (musicId: string) => {
    console.log('playMusic 호출됨:', musicId);
    const music = recommendedMusic.find(m => m.id === musicId);
    if (music) {
      console.log('음악 찾음:', music);
      setCurrentPlaying(musicId);
      const musicIndex = recommendedMusic.findIndex(m => m.id === musicId);
      console.log('플레이리스트 재생 시작:', musicIndex);
      playPlaylist(recommendedMusic, musicIndex, true); // 사용자 클릭이므로 자동 재생 허용
    } else {
      console.log('음악을 찾을 수 없음:', musicId);
    }
  };

  const playAll = () => {
    if (recommendedMusic.length > 0) {
      setCurrentPlaying(recommendedMusic[0].id);
      playPlaylist(recommendedMusic, 0, true); // 사용자가 클릭했으므로 자동 재생 허용
    }
  };

  const goBack = () => {
    router.push('/emotion');
  };

  return (
    <div className="min-h-screen p-4">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={goBack}
          className="w-8 h-8 flex items-center justify-center"
        >
          <div className="w-0 h-0 border-r-[8px] border-r-white border-y-[6px] border-y-transparent"></div>
        </button>
        <h1 className="text-2xl font-bold text-white">
          {selectedEmotions.map(id => emotionLabels[id as keyof typeof emotionLabels]).join(' + ')} Playlist
        </h1>
      </div>

      {/* Featured Playlist */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
          <span className="text-4xl">🎵</span>
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-white mb-2">
            Your {selectedEmotions.map(id => emotionLabels[id as keyof typeof emotionLabels]).join(' + ')} Mix
          </h2>
          <p className="text-gray-300 text-sm mb-4">
            {recommendedMusic.length} Songs • Based on your emotions
          </p>
          <button 
            onClick={playAll}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg flex items-center gap-2 transition-colors"
          >
            <div className="w-0 h-0 border-l-[8px] border-l-white border-y-[6px] border-y-transparent"></div>
            Play All
          </button>
        </div>
      </div>

      {/* Songs Section */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white mb-4">Recommended Songs</h3>
        <div className="space-y-3">
          {recommendedMusic.map((music, index) => (
            <div
              key={music.id}
              className={`flex items-center gap-4 p-4 rounded-lg transition-all duration-300 ${
                currentPlaying === music.id 
                  ? 'bg-purple-600/30 ring-2 ring-purple-500' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0">
                {index + 1}
              </div>
              <div 
                className="w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0 cursor-pointer"
                onClick={() => playMusic(music.id)}
              >
                <Image
                  src={music.image}
                  alt={music.name}
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                />
              </div>
              <div 
                className="flex-1 cursor-pointer"
                onClick={() => router.push(`/music/${music.id}`)}
              >
                <h4 className="font-semibold text-white hover:text-purple-300 transition-colors">{music.name}</h4>
                <p className="text-gray-300 text-sm">{music.artist}</p>
              </div>
              <div 
                className="w-10 h-10 flex items-center justify-center cursor-pointer"
                onClick={() => playMusic(music.id)}
              >
                {currentPlaying === music.id ? (
                  <div className="w-6 h-6 bg-red-500 rounded-sm flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-sm"></div>
                  </div>
                ) : (
                  <div className="w-0 h-0 border-l-[12px] border-l-white border-y-[8px] border-y-transparent"></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Back to Emotion Selection */}
      <div className="text-center">
        <button
          onClick={goBack}
          className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300"
        >
          Choose Different Emotions
        </button>
      </div>
    </div>
  );
}
