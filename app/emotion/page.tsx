"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import SectionTitle from "@/components/SectionTitle";

const profileImage = `https://picsum.photos/300/300?random=200`;

// 감정 데이터
const emotions = [
  { id: 'happy', label: 'Happy', color: 'rgba(255, 223, 0, 0.8)', emoji: '😊' },
  { id: 'anxious', label: 'Anxious', color: 'rgba(255, 165, 0, 0.8)', emoji: '😰' },
  { id: 'comfortable', label: 'Comfortable', color: 'rgba(0, 255, 150, 0.8)', emoji: '😌' },
  { id: 'sad', label: 'Sad', color: 'rgba(0, 150, 255, 0.8)', emoji: '😢' },
  { id: 'nostalgic', label: 'Nostalgic', color: 'rgba(138, 43, 226, 0.8)', emoji: '😌' },
  { id: 'excited', label: 'Excited', color: 'rgba(255, 0, 0, 0.8)', emoji: '🤩' },
  { id: 'remorseful', label: 'Remorseful', color: 'rgba(75, 0, 130, 0.8)', emoji: '😔' },
  { id: 'lonely', label: 'Lonely', color: 'rgba(105, 105, 105, 0.8)', emoji: '😞' }
];



export default function Emotion() {
  const router = useRouter();
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);

  const toggleEmotion = (emotionId: string) => {
    setSelectedEmotions(prev => 
      prev.includes(emotionId) 
        ? prev.filter(id => id !== emotionId)
        : [...prev, emotionId]
    );
  };

  const handleContinue = () => {
    if (selectedEmotions.length === 0) return;
    
    // 선택된 감정들을 쿼리 파라미터로 전달하여 새 페이지로 이동
    const emotionsParam = selectedEmotions.join(',');
    router.push(`/emotion/playlist?emotions=${emotionsParam}`);
  };

  return (
    <div className="min-h-screen p-4">
      <SectionTitle title="Each feeling shines as your color" />

      {/* 수정 구슬 */}
      <div className="flex justify-center mb-12">
        <div className="relative w-80 h-80">
          {/* 중앙 구슬 */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-100 to-gray-300 shadow-inner flex items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-white shadow-lg flex items-center justify-center">
              <span className="text-4xl">🔮</span>
            </div>
          </div>
          
          {/* 감정별 빛 효과 */}
          {selectedEmotions.map((emotionId, index) => {
            const emotion = emotions.find(e => e.id === emotionId);
            if (!emotion) return null;
            
            const angle = (360 / emotions.length) * emotions.findIndex(e => e.id === emotionId);
            const radius = 120;
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;
            
            return (
              <div
                key={emotionId}
                className="absolute w-16 h-16 rounded-full animate-pulse"
                style={{
                  background: `radial-gradient(circle, ${emotion.color} 0%, transparent 70%)`,
                  left: `calc(50% + ${x}px - 32px)`,
                  top: `calc(50% + ${y}px - 32px)`,
                  animationDelay: `${index * 0.2}s`,
                  animationDuration: '2s'
                }}
              />
            );
          })}
        </div>
      </div>

      {/* 감정 선택 버튼들 */}
      <div className="grid grid-cols-4 gap-3 mb-8 max-w-md mx-auto">
        {emotions.map((emotion) => (
          <button
            key={emotion.id}
            onClick={() => toggleEmotion(emotion.id)}
            className={`p-3 rounded-lg text-white text-sm font-medium transition-all duration-300 ${
              selectedEmotions.includes(emotion.id)
                ? 'ring-2 ring-white scale-110'
                : 'bg-gray-600 hover:bg-gray-500'
            }`}
            style={{
              backgroundColor: selectedEmotions.includes(emotion.id) 
                ? emotion.color.replace('0.8', '1') 
                : undefined
            }}
          >
            <div className="text-lg mb-1">{emotion.emoji}</div>
            <div className="text-xs">{emotion.label}</div>
          </button>
        ))}
      </div>

      {/* Continue 버튼 */}
      {selectedEmotions.length > 0 && (
        <div className="text-center mb-8">
          <button
            onClick={handleContinue}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300"
          >
            Continue
          </button>
        </div>
      )}

      {/* 선택된 감정이 없을 때 안내 메시지 */}
      {selectedEmotions.length === 0 && (
        <div className="text-center text-gray-400 mt-8">
          <p>감정을 선택하고 Continue를 눌러보세요</p>
        </div>
      )}
    </div>
  );
}