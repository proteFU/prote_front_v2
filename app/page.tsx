"use client"

import SectionTitle from "@/components/SectionTitle";
import Image from "next/image";
import MusicPlayer from "@/components/MusicPlayer";
import EmotionTracker from "@/components/EmotionTracker";
import { usePlayer } from "@/contexts/PlayerContext";
import { useRouter } from "next/navigation";

// 타입 정의
interface Song {
  id: number;
  name: string;
  image: string;
  artist: string;
}

interface Playlist {
  id: number;
  name: string;
  image: string;
  madeby: string;
}

interface Emotion {
  id: number;
  name: string;
  image: string;
}

const recommendedSongs = [
  { id: 1, name: "Blinding Lights", image: "https://picsum.photos/300/300?random=1", artist: "The Weeknd" },
  { id: 2, name: "Watermelon Sugar", image: "https://picsum.photos/300/300?random=2", artist: "Harry Styles" },
  { id: 3, name: "Levitating", image: "https://picsum.photos/300/300?random=3", artist: "Dua Lipa" },
  { id: 4, name: "Good 4 U", image: "https://picsum.photos/300/300?random=4", artist: "Olivia Rodrigo" },
  { id: 5, name: "Stay", image: "https://picsum.photos/300/300?random=5", artist: "The Kid LAROI & Justin Bieber" },
  { id: 6, name: "Industry Baby", image: "https://picsum.photos/300/300?random=6", artist: "Lil Nas X" },
  { id: 7, name: "Heat Waves", image: "https://picsum.photos/300/300?random=7", artist: "Glass Animals" },
  { id: 8, name: "Peaches", image: "https://picsum.photos/300/300?random=8", artist: "Justin Bieber" },
  { id: 9, name: "Montero", image: "https://picsum.photos/300/300?random=9", artist: "Lil Nas X" },
  { id: 10, name: "Kiss Me More", image: "https://picsum.photos/300/300?random=10", artist: "Doja Cat ft. SZA" },
]

const recommendedPlaylists = [
  { id: 1, name: "Today's Top Hits", image: "https://i.pinimg.com/736x/7b/45/fd/7b45fddea919472795527a27b85c6588.jpg", madeby: "Spotify" },
  { id: 2, name: "Chill Vibes", image: "https://i.pinimg.com/736x/13/83/4f/13834fcea4cfe2018235e8a019d07890.jpg", madeby: "Music Lover" },
  { id: 3, name: "Workout Mix", image: "https://i.pinimg.com/1200x/d0/9b/ce/d09bce9b96b9f4ade416642865208217.jpg", madeby: "Fitness Fan" },
  { id: 4, name: "Rainy Day", image: "https://i.pinimg.com/736x/24/41/82/244182673f486ba9246b192fb516cfee.jpg", madeby: "Weather Watcher" },
  { id: 5, name: "Party Time", image: "https://i.pinimg.com/736x/4d/26/a7/4d26a7a096865a5c5af5072311dffbb5.jpg", madeby: "Party Planner" },
  { id: 6, name: "Study Focus", image: "https://i.pinimg.com/736x/f2/0a/ee/f20aee343ebe41e02797b6753788ce68.jpg", madeby: "Student" },
  { id: 7, name: "Road Trip", image: "https://i.pinimg.com/736x/4d/a9/b1/4da9b16be032fe04077db28b0780b02b.jpg", madeby: "Traveler" },
  { id: 8, name: "Coffee Shop", image: "https://i.pinimg.com/736x/23/8a/50/238a5013f680616de3b149c3944d2701.jpg", madeby: "Coffee Lover" },
  { id: 9, name: "Late Night", image: "https://i.pinimg.com/1200x/73/0f/20/730f20a66f48419362bec0ff82b0bedd.jpg", madeby: "Night Owl" },
  { id: 10, name: "Morning Energy", image: "https://i.pinimg.com/736x/d5/dd/5b/d5dd5b93f5f36088e3c8e36e4d97ec9b.jpg", madeby: "Early Bird" },
]

const recommendedEmotions = [
  { id: 1, name: "Happy", image: "https://picsum.photos/300/300?random=11" },
  { id: 2, name: "Sad", image: "https://picsum.photos/300/300?random=12" },
  { id: 3, name: "Excited", image: "https://picsum.photos/300/300?random=13" },
  { id: 4, name: "Calm", image: "https://picsum.photos/300/300?random=14" },
  { id: 5, name: "Nostalgic", image: "https://picsum.photos/300/300?random=15" },
]

function RecommendedPlaylists({ playlist }: { playlist: Playlist }) {
  const handleClick = () => {
    console.log(`플레이리스트 재생: ${playlist.name}`)
  }

  return (
    <div 
      className="flex flex-col items-center justify-center gap-2 mb-4 cursor-pointer hover:scale-105 transition-transform"
      onClick={handleClick}
    >
      <Image src={playlist.image} alt="Recommended Playlist" width={120} height={120} className="rounded-md w-30 h-30 object-cover" />
      <div className="flex flex-col items-center justify-center">
        <p className="text-sm font-bold">{playlist.name}</p>
        <p className="text-xs text-gray-500">{playlist.madeby}</p>
      </div>
    </div>
  )
}

function RecommendedSongs({ song }: { song: Song }) {
  const { playTrack } = usePlayer();
  const router = useRouter();
  
  const handleClick = () => {
    playTrack({
      id: song.id.toString(),
      name: song.name,
      artist: song.artist,
      image: song.image
    }, true); // 사용자 클릭이므로 자동 재생 허용
  }

  const handleDetailClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/music/${song.id}`);
  }

  return (
    <div className="flex flex-col items-center justify-center gap-2 mb-4">
      <div 
        className="cursor-pointer hover:scale-105 transition-transform"
        onClick={handleClick}
      >
        <Image src={song.image} alt="Recommended Song" width={120} height={120} className="rounded-md w-30 h-30 object-cover" />
      </div>
      <div className="flex flex-col items-center justify-center">
        <p className="text-sm font-bold">{song.name}</p>
        <p className="text-xs text-gray-500">{song.artist}</p>
      </div>
      <button
        onClick={handleDetailClick}
        className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
      >
        상세보기
      </button>
    </div>
  )
}

function RecommendedEmotions({ emotion }: { emotion: Emotion }) {
  const handleClick = () => {
    console.log(`감정 선택: ${emotion.name}`)
  }

  return (
    <div 
      className="flex flex-col items-center justify-center gap-2 mb-4 cursor-pointer hover:scale-105 transition-transform"
      onClick={handleClick}
    >
      <Image src={emotion.image} alt="Recommended Emotion" width={120} height={120} className="rounded-md w-30 h-30 object-cover" />
      <div className="flex flex-col items-center justify-center">
        <p className="text-sm font-bold">{emotion.name}</p>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* 기존 정적 콘텐츠 */}
      <SectionTitle title="Songs" href="/songs" />
      <div className="w-full overflow-x-auto pb-2">
        <div className="flex flex-row items-center gap-5 pl-4 min-w-max">
          {recommendedSongs.map((song) => (
            <div className="flex flex-col items-center justify-center gap-2 min-w-[120px] flex-shrink-0" key={song.id}>
              <RecommendedSongs song={song} />
            </div>
          ))}
        </div>
      </div>
      <SectionTitle title="Playlists" href="/playlists" />
      <div className="w-full overflow-x-auto pb-2">
        <div className="flex flex-row items-center gap-5 pl-4 min-w-max">
          {recommendedPlaylists.map((playlist) => (
            <div className="flex flex-col items-center justify-center gap-2 min-w-[120px] flex-shrink-0" key={playlist.id}>
              <RecommendedPlaylists playlist={playlist} />
            </div>
          ))}
        </div>
      </div>
      <SectionTitle title="Find my mood" href="/playlists" />
      <div className="w-full overflow-x-auto pb-2">
        <div className="flex flex-row items-center gap-5 pl-4 min-w-max">
          {recommendedEmotions.map((emotion) => (
            <div className="flex flex-col items-center justify-center gap-2 min-w-[120px] flex-shrink-0" key={emotion.id}>
              <RecommendedEmotions emotion={emotion} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}