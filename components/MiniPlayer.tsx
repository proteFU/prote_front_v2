"use client"

// import { useState } from 'react';
import Image from 'next/image';

interface MiniPlayerProps {
  isVisible: boolean;
  currentTrack: {
    id: string;
    name: string;
    artist: string;
    image: string;
  } | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onExpand: () => void;
}

export default function MiniPlayer({ 
  isVisible, 
  currentTrack, 
  isPlaying, 
  onTogglePlay, 
  onExpand 
}: MiniPlayerProps) {
  if (!isVisible || !currentTrack) return null;

  return (
    <div 
      className="fixed bottom-16 left-0 right-0 bg-black/90 backdrop-blur-md border-t border-gray-800 z-40"
      onClick={onExpand}
    >
      <div className="flex items-center gap-3 p-3 cursor-pointer hover:bg-white/5 transition-colors">
        <div className="w-12 h-12 bg-white rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={currentTrack.image}
            alt={currentTrack.name}
            width={48}
            height={48}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-medium text-sm truncate">{currentTrack.name}</h4>
          <p className="text-gray-400 text-xs truncate">{currentTrack.artist}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onTogglePlay();
            }}
            className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors"
          >
            {isPlaying ? (
              <div className="w-4 h-4 bg-red-500 rounded-sm flex items-center justify-center">
                <div className="w-1 h-1 bg-white rounded-sm"></div>
              </div>
            ) : (
              <div className="w-0 h-0 border-l-[6px] border-l-white border-y-[4px] border-y-transparent ml-1"></div>
            )}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onExpand();
            }}
            className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors"
          >
            <div className="w-4 h-4 border-2 border-white rounded-sm"></div>
          </button>
        </div>
      </div>
    </div>
  );
}
