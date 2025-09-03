"use client";

import { useState, useEffect } from 'react';

interface Track {
  id: string;
  name: string;
  artist: string;
  image: string;
  preview_url?: string;
  external_urls: {
    spotify: string;
  };
}

export default function MusicPlayer() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState('happy');

  // 음악 추천 가져오기
  const fetchRecommendations = async (type: string = 'recommendations', emotion?: string) => {
    
    setLoading(true);
    try {
      const params = new URLSearchParams({ type });
      if (emotion) params.append('emotion', emotion);
      
      const response = await fetch(`/api/music?${params}`);
      const data = await response.json();
      
      if (data.success) {
        setTracks(data.data);
      }
    } catch (error) {
      console.error('음악 추천 가져오기 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  // 감정 기반 음악 추천
  const handleEmotionRecommendation = (emotion: string) => {
    setCurrentEmotion(emotion);
    fetchRecommendations('emotion', emotion);
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);



  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">🎵 음악 추천</h2>
      
      {/* 감정 선택 버튼 */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {['happy', 'sad', 'excited', 'calm', 'angry', 'nostalgic'].map((emotion) => (
          <button
            key={emotion}
            onClick={() => handleEmotionRecommendation(emotion)}
            className={`px-4 py-2 rounded-md ${
              currentEmotion === emotion 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {emotion}
          </button>
        ))}
      </div>

      {/* 음악 목록 */}
      {loading ? (
        <div className="text-center py-8">
          <p className="text-gray-500">음악을 불러오는 중...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tracks.map((track) => (
            <div key={track.id} className="bg-white/10 rounded-lg p-4">
              <img 
                src={track.image} 
                alt={track.name}
                className="w-full h-32 object-cover rounded-md mb-3"
              />
              <h3 className="font-semibold text-white">{track.name}</h3>
              <p className="text-gray-300 text-sm">{track.artist}</p>
              
              <div className="mt-3 flex gap-2">
                {track.preview_url && (
                  <audio controls className="w-full">
                    <source src={track.preview_url} type="audio/mpeg" />
                  </audio>
                )}
                <a 
                  href={track.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 text-white px-3 py-1 rounded text-sm"
                >
                  Spotify에서 듣기
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
