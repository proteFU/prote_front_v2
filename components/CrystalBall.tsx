"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

const EMOTIONS = [
  { id: "joy", label: "😊 행복", color: "rgba(255,223,0,0.6)" },    // 노랑
  { id: "anger", label: "😡 분노", color: "rgba(255,0,0,0.6)" },   // 빨강
  { id: "sad", label: "😢 슬픔", color: "rgba(0,150,255,0.6)" },   // 파랑
  { id: "calm", label: "😌 평온", color: "rgba(0,255,150,0.6)" },  // 초록
];

export default function CrystalBall() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleEmotion = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col items-center gap-8 p-8">
      {/* 수정 구슬 */}
      <div className="relative w-72 h-72 rounded-full bg-gray-100 shadow-inner flex items-center justify-center">
        {/* 기본 구슬 */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle at 30% 30%, #fff, #ccc)",
          }}
        />
        {/* 감정 빛 효과 */}
        {selected.map((id) => {
          const emo = EMOTIONS.find((e) => e.id === id)!;
          return (
            <motion.div
              key={id}
              className="absolute inset-0 rounded-full"
              style={{
                background: `radial-gradient(circle, ${emo.color} 0%, transparent 70%)`,
                mixBlendMode: "screen",
              }}
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          );
        })}
      </div>

      {/* 버튼 */}
      <div className="grid grid-cols-2 gap-3">
        {EMOTIONS.map((emo) => (
          <Button 
            key={emo.id}
            selected={selected.includes(emo.id)}
            id={emo.id}
            onClick={() => toggleEmotion(emo.id)}
          >
            {emo.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
