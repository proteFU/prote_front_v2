"use client"

import { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from "next/image";

const emotionMusic = {
  happy: [
    { id: '1', name: 'Happy', artist: 'Pharrell aWilliams', image: 'https://picsum.photos/300/300?random=11', src: '/music/music1.mp3' },
    { id: '2', name: 'Can\'t Stop the Feeling!', artist: 'Justin Timberlake', image: 'https://picsum.photos/300/300?random=12', src: '/music/music2.mp3' },
    { id: '3', name: 'Good as Hell', artist: 'Lizzo', image: 'https://picsum.photos/300/300?random=13', src: '/music/music3.mp3' },
    { id: '4', name: 'Sunflower', artist: 'Post Malone & Swae Lee', image: 'https://picsum.photos/300/300?random=14', src: '/music/music4.mp3' }
  ],
  anxious: [
    { id: '5', name: 'Breathe', artist: 'Pink Floyd', image: 'https://i.pinimg.com/736x/12/db/a2/12dba21bc2b2e60dac71571451537c57.jpg', src: '/music/music5.mp3' },
    { id: '6', name: 'Weightless', artist: 'Marconi Union', image: 'https://picsum.photos/300/300?random=16', src: '/music/music6.mp3' },
    { id: '7', name: 'Calm Down', artist: 'Rema', image: 'https://picsum.photos/300/300?random=17', src: '/music/music7.mp3' },
    { id: '8', name: 'Peaceful', artist: 'Enya', image: 'https://picsum.photos/300/300?random=18', src: '/music/music8.mp3' }
  ],
  comfortable: [
    { id: '9', name: 'Perfect', artist: 'Ed Sheeran', image: 'https://picsum.photos/300/300?random=19', src: '/music/music9.mp3' },
    { id: '10', name: 'All of Me', artist: 'John Legend', image: 'https://picsum.photos/300/300?random=20', src: '/music/music10.mp3' },
    { id: '11', name: 'Thinking Out Loud', artist: 'Ed Sheeran', image: 'https://picsum.photos/300/300?random=21', src: '/music/music11.mp3' },
    { id: '12', name: 'A Thousand Years', artist: 'Christina Perri', image: 'https://picsum.photos/300/300?random=22', src: '/music/music12.mp3' }
  ],
  sad: [
    { id: '13', name: 'Someone You Loved', artist: 'Lewis Capaldi', image: 'https://picsum.photos/300/300?random=23', src: '/music/music13.mp3' },
    { id: '14', name: 'All Too Well', artist: 'Taylor Swift', image: 'https://picsum.photos/300/300?random=24', src: '/music/music14.mp3' },
    { id: '15', name: 'Hurt', artist: 'Johnny Cash', image: 'https://picsum.photos/300/300?random=25', src: '/music/music15.mp3' },
    { id: '16', name: 'Mad World', artist: 'Gary Jules', image: 'https://picsum.photos/300/300?random=26', src: '/music/music16.mp3' }
  ],
  nostalgic: [
    { id: '17', name: 'Bohemian Rhapsody', artist: 'Queen', image: 'https://picsum.photos/300/300?random=27', src: '/music/music17.mp3' },
    { id: '18', name: 'Hotel California', artist: 'Eagles', image: 'https://picsum.photos/300/300?random=28', src: '/music/music18.mp3' },
    { id: '19', name: 'Sweet Child O\' Mine', artist: 'Guns N\' Roses', image: 'https://picsum.photos/300/300?random=29', src: '/music/music19.mp3' },
    { id: '20', name: 'Don\'t Stop Believin\'', artist: 'Journey', image: 'https://picsum.photos/300/300?random=30', src: '/music/music20.mp3' }
  ],
  excited: [
    { id: '21', name: 'Thunder', artist: 'Imagine Dragons', image: 'https://picsum.photos/300/300?random=31', src: '/music/music21.mp3' },
    { id: '22', name: 'Believer', artist: 'Imagine Dragons', image: 'https://picsum.photos/300/300?random=32', src: '/music/music22.mp3' },
    { id: '23', name: 'Eye of the Tiger', artist: 'Survivor', image: 'https://picsum.photos/300/300?random=33', src: '/music/music23.mp3' },
    { id: '24', name: 'We Will Rock You', artist: 'Queen', image: 'https://picsum.photos/300/300?random=34', src: '/music/music24.mp3' }
  ],
  remorseful: [
    { id: '25', name: 'Hurt', artist: 'Johnny Cash', image: 'https://picsum.photos/300/300?random=35', src: '/music/music15.mp3' },
    { id: '26', name: 'Mad World', artist: 'Gary Jules', image: 'https://picsum.photos/300/300?random=36', src: '/music/music16.mp3' },
    { id: '27', name: 'The Sound of Silence', artist: 'Simon & Garfunkel', image: 'https://picsum.photos/300/300?random=37', src: '/music/music27.mp3' },
    { id: '28', name: 'Creep', artist: 'Radiohead', image: 'https://picsum.photos/300/300?random=38', src: '/music/music28.mp3' }
  ],
  lonely: [
    { id: '29', name: 'Lonely', artist: 'Akon', image: 'https://picsum.photos/300/300?random=39', src: '/music/music29.mp3' },
    { id: '30', name: 'The Sound of Silence', artist: 'Simon & Garfunkel', image: 'https://picsum.photos/300/300?random=40', src: '/music/music30.mp3' },
    { id: '31', name: 'Hurt', artist: 'Nine Inch Nails', image: 'https://picsum.photos/300/300?random=41', src: '/music/music31.mp3' },
    { id: '32', name: 'Everybody Hurts', artist: 'R.E.M.', image: 'https://picsum.photos/300/300?random=42', src: '/music/music32.mp3' }
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

function EmotionPlaylistContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [recommendedMusic, setRecommendedMusic] = useState<Array<{ id: string, name: string, artist: string, image: string, src: string }>>([]);
  const [currentPlaying, setCurrentPlaying] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const emotions = searchParams.get('emotions');
    if (emotions) {
      const emotionArray = emotions.split(',');
      setSelectedEmotions(emotionArray);

      const allMusic: Array<{ id: string, name: string, artist: string, image: string, src: string }> = [];
      emotionArray.forEach(emotion => {
        if (emotionMusic[emotion as keyof typeof emotionMusic]) {
          allMusic.push(...emotionMusic[emotion as keyof typeof emotionMusic]);
        }
      });

      const uniqueMusic = allMusic.filter((music, index, self) =>
        index === self.findIndex(m => m.id === music.id)
      );

      const finalMusic = uniqueMusic.slice(0, 8);
      setRecommendedMusic(finalMusic);
    }
  }, [searchParams]);

  const playMusic = (musicId: string) => {
    const music = recommendedMusic.find(m => m.id === musicId);
    if (music && audioRef.current) {
      setCurrentPlaying(musicId);
      audioRef.current.src = music.src;
      audioRef.current.play();
    }
  };

  const playAll = () => {
    if (recommendedMusic.length > 0 && audioRef.current) {
      setCurrentPlaying(recommendedMusic[0].id);
      audioRef.current.src = recommendedMusic[0].src;
      audioRef.current.play();
    }
  };

  const goBack = () => {
    router.push('/emotion');
  };

  return (
    <div className="min-h-screen p-4">
      <audio ref={audioRef} controls className="hidden" />
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

      <div className="mb-6">
        <h3 className="text-xl font-bold text-white mb-4">Recommended Songs</h3>
        <div className="space-y-3">
          {recommendedMusic.map((music, index) => (
            <div
              key={music.id}
              className={`flex items-center gap-4 p-4 rounded-lg transition-all duration-300 ${currentPlaying === music.id
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
              <div className="flex-1">
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

export default function EmotionPlaylist() {
  return (
    <Suspense fallback={<div className="min-h-screen p-4 flex items-center justify-center">
      <div className="text-white text-xl">Loading...</div>
    </div>}>
      <EmotionPlaylistContent />
    </Suspense>
  );
}