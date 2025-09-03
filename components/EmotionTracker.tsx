"use client";

import { useState } from 'react';

// interface EmotionData {
//   emotion: string;
//   intensity: number;
//   description: string;
// }

export default function EmotionTracker() {
  const [emotion, setEmotion] = useState('');
  const [intensity, setIntensity] = useState(5);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const emotions = [
    { name: 'happy', label: '😊 행복', color: 'bg-yellow-400' },
    { name: 'sad', label: '😢 슬픔', color: 'bg-blue-400' },
    { name: 'excited', label: '🤩 신남', color: 'bg-red-400' },
    { name: 'calm', label: '😌 평온', color: 'bg-green-400' },
    { name: 'angry', label: '😠 화남', color: 'bg-red-600' },
    { name: 'nostalgic', label: '😌 그리움', color: 'bg-purple-400' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emotion) return;

    setLoading(true);
    try {
      const response = await fetch('/api/emotion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emotion,
          intensity,
          description,
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setMessage('감정이 기록되었습니다! 🎵');
        setEmotion('');
        setDescription('');
        setIntensity(5);
      } else {
        setMessage('감정 기록에 실패했습니다.');
      }
    } catch (error) {
      console.error('감정 기록 실패:', error);
      setMessage('감정 기록에 실패했습니다.');
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };



  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">💭 오늘의 감정 기록</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 감정 선택 */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            현재 감정을 선택해주세요
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {emotions.map((em) => (
              <button
                key={em.name}
                type="button"
                onClick={() => setEmotion(em.name)}
                className={`p-3 rounded-lg text-white text-sm ${
                  emotion === em.name 
                    ? `${em.color} ring-2 ring-white` 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              >
                {em.label}
              </button>
            ))}
          </div>
        </div>

        {/* 감정 강도 */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            감정 강도: {intensity}/10
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={intensity}
            onChange={(e) => setIntensity(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* 설명 */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            추가 설명 (선택사항)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="오늘의 기분을 자유롭게 적어보세요..."
            className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-gray-600"
            rows={3}
          />
        </div>

        {/* 제출 버튼 */}
        <button
          type="submit"
          disabled={loading || !emotion}
          className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? '기록 중...' : '감정 기록하기'}
        </button>

        {message && (
          <div className="text-center text-green-400 font-medium">
            {message}
          </div>
        )}
      </form>
    </div>
  );
}
