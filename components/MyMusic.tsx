"use client"

import Image from "next/image"
import { useState } from "react"

export default function MyMusic() {
  const [isPlaying, setIsPlaying] = useState(false)

  const handleToggle = () => {
    setIsPlaying(prev => !prev)
  }

  return (
    <div className="flex flex-col gap-2">
      <div
        className="flex items-center justify-between gap-3 pb-2 cursor-pointer"
        onClick={handleToggle}
      >
        <div className="w-[60px] h-[60px] bg-white rounded-lg" />
        <div className="flex flex-col justify-center flex-1">
          <div className="text-[16px]">Music Title</div>
          <div className="text-[12px] text-gray-400">Sub Title</div>
        </div>
        <Image
          src={isPlaying ? "/stop.svg" : "/play.svg"}
          alt={isPlaying ? "stop" : "play"}
          width={24}
          height={24}
        />
      </div>
    </div>
  )
}
