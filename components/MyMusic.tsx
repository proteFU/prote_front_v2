"use client"

import Image from "next/image"
import { MyMusicProps } from "@/app/types/favorite"
import { usePlayer } from "@/contexts/PlayerContext"

export default function MyMusic({ image, title = "Music Title", subtitle = "Sub Title" }: MyMusicProps) {
  const { playTrack } = usePlayer()

  const handleToggle = () => {
    playTrack({
      id: title, // 임시 ID
      name: title,
      artist: subtitle,
      image: image
    })
  }

  return (
    <div
      className="flex items-center gap-3 cursor-pointer hover:bg-white/10 p-2 rounded-lg transition-colors"
      onClick={handleToggle}
    >
      <div className="w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0">
        <Image src={image} alt={title} width={64} height={64} className="object-cover" />
      </div>
      <div className="flex flex-col flex-1">
        <div className="text-[16px] font-medium">{title}</div>
        <div className="text-[12px] text-gray-400">{subtitle}</div>
      </div>
      <div className="flex items-center justify-center w-8 h-8">
        <div className="w-0 h-0 border-l-[8px] border-l-white border-y-[6px] border-y-transparent hover:scale-110 transition-transform"></div>
      </div>
    </div>
  )
}
