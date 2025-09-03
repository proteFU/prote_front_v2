"use client"

import { usePlayer } from '@/contexts/PlayerContext';
import MiniPlayer from './MiniPlayer';
import FullPlayer from './FullPlayer';

export function PlayerWrapper() {
  const {
    currentTrack,
    isPlaying,
    isMiniPlayerVisible,
    isFullPlayerVisible,
    togglePlay,
    showFullPlayer,
    hideFullPlayer,
  } = usePlayer();

  return (
    <>
      <MiniPlayer
        isVisible={isMiniPlayerVisible}
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onTogglePlay={togglePlay}
        onExpand={showFullPlayer}
      />
      <FullPlayer
        isVisible={isFullPlayerVisible}
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onTogglePlay={togglePlay}
        onClose={hideFullPlayer}
      />
    </>
  );
}
