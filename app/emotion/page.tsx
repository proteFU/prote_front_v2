"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import SectionTitle from "@/components/SectionTitle";
// const profileImage = `https://picsum.photos/300/300?random=200`;

// 감정 데이터
const emotions = [
  { id: 'happy', label: 'Happy', color: 'rgba(255, 223, 0, 0.8)' },
  { id: 'anxious', label: 'Anxious', color: 'rgba(255, 165, 0, 0.8)' },
  { id: 'comfortable', label: 'Comfortable', color: 'rgba(0, 255, 150, 0.8)' },
  { id: 'sad', label: 'Sad', color: 'rgba(0, 150, 255, 0.8)' },
  { id: 'nostalgic', label: 'Nostalgic', color: 'rgba(138, 43, 226, 0.8)' },
  { id: 'excited', label: 'Excited', color: 'rgba(255, 0, 0, 0.8)' },
  { id: 'remorseful', label: 'Remorseful', color: 'rgba(75, 0, 130, 0.8)'},
  { id: 'lonely', label: 'Lonely', color: 'rgba(105, 105, 105, 0.8)' }
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

      {/* 3D 수정 구슬 */}
      <div className="flex justify-center mb-12 relative">
        <Image src="/CrystalBall.png"
        alt="Crystal Ball" width={160} height={160}
        className="w-40 h-40 z-10 object-contain"
        />
        {selectedEmotions.map((emotionId) => {
          const emotion = emotions.find(e => e.id === emotionId);
          return emotion ? (
            <div key={emotionId} className="w-32 h-32 absolute top-5% left-50% rounded-full blur-2xl opacity-60" style={{ backgroundColor: emotion.color }} />
          ) : null;
        })}
        
        
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
          <p>Choose your emotions and click Continue</p>
        </div>
      )}
    </div>
  );
}