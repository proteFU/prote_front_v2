"use client"

import Image from "next/image"
import { useState } from "react"
import { MyMusicProps } from "@/app/types/favorite"

export default function MyMusic({ image, title = "Music Title", subtitle = "Sub Title" }: MyMusicProps) {
  const [isPlaying, IsPlaying] = useState(false)

  const handleToggle = () => IsPlaying(prev => !prev)

  return (
    <div
      className="flex items-center gap-3 cursor-pointer"
      onClick={handleToggle}
    >
      <div className="w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0">
        <Image src={image} alt={title} width={64} height={64} className="object-cover" />
      </div>
      <div className="flex flex-col flex-1">
        <div className="text-[16px]">{title}</div>
        <div className="text-[12px] text-gray-400">{subtitle}</div>
      </div>
      <Image
        src={isPlaying ? "/stop.svg" : "/play.svg"}
        alt={isPlaying ? "stop" : "play"}
        width={24}
        height={24}
      />
    </div>
  )
}
