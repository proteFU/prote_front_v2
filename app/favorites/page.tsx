"use client"

import { useRef } from "react"
import { usePlayer } from "@/contexts/PlayerContext"
import PlayList from "@/components/PlayList"
import MyMusic from "@/components/MyMusic"
import SectionTitle from "@/components/SectionTitle"

export default function Favorites() {
  const { playTrack } = usePlayer()
  const audioRef = useRef<HTMLAudioElement>(null)

  const playlists = [
    { image: "/playlist/playlist1.svg", title: "My Happy Playlist", subtitle: "Made by Guest User" },
    { image: "/playlist/playlist2.svg", title: "Chill Vibes", subtitle: "Made by Guest User" },
    { image: "/playlist/playlist3.svg", title: "Workout Mix", subtitle: "Made by Guest User" },
  ]

  const myMusics = [
    { image: "/song/song1.svg", title: "Blinding Lights", subtitle: "The Weeknd", src: "/songs/song1.mp3", id: "1" },
    { image: "/song/song2.svg", title: "Watermelon Sugar", subtitle: "Harry Styles", src: "/songs/song2.mp3", id: "2" },
    { image: "/song/song3.svg", title: "Levitating", subtitle: "Dua Lipa", src: "/songs/song3.mp3", id: "3" },
    { image: "/song/song4.svg", title: "Good 4 U", subtitle: "Olivia Rodrigo", src: "/songs/song4.mp3", id: "4" },
    { image: "/song/song5.svg", title: "Stay", subtitle: "The Kid LAROI & Justin Bieber", src: "/songs/song5.mp3", id: "5" },
    { image: "/song/song6.svg", title: "Industry Baby", subtitle: "Lil Nas X", src: "/songs/song6.mp3", id: "6" },
  ]

  const handlePlay = (music: typeof myMusics[0]) => {
    playTrack(
      {
        id: music.id,
        name: music.title,
        artist: music.subtitle,
        image: music.image,
      },
      true
    )

    if (audioRef.current) {
      audioRef.current.src = music.src
      audioRef.current.play()
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <SectionTitle title="PlayList" />
      <div className="flex overflow-x-auto gap-3 pl-4">
        {playlists.map((pl, idx) => (
          <PlayList key={idx} image={pl.image} title={pl.title} subtitle={pl.subtitle} />
        ))}
      </div>

      <SectionTitle title="My Music Recap" />
      <div className="flex flex-col gap-y-4 pl-4 pr-4">
        {myMusics.map((music) => (
          <div key={music.id} onClick={() => handlePlay(music)} className="cursor-pointer">
            <MyMusic image={music.image} title={music.title} subtitle={music.subtitle} />
          </div>
        ))}
      </div>
      <audio ref={audioRef} />
    </div>
  )
}