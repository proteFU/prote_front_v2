"use client"

import Image from "next/image"
import { MyMusicProps } from "@/app/types/favorite"

export default function PlayList({ image, title = "Music Title", subtitle = "Sub Title" }: MyMusicProps) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-1">
        <div className="w-[150px] h-[150px] bg-white rounded-lg overflow-hidden">
          <Image src={image} alt={title} width={150} height={150} className="object-cover" />
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-[16px] mt-1">{title}</div>
          <div className="text-[14px] text-[#A1A1A1]">{subtitle}</div>
        </div>
      </div>
    </div>
  )
}