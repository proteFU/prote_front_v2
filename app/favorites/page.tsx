"use client"

import PlayList from "@/components/PlayList"
import MyMusic from "@/components/MyMusic"
import SectionTitle from "@/components/SectionTitle"

export default function Favorites() {
  const playlists = [
    { image: "/playlist/playlist1.svg", title: "My Happy Playlist", subtitle: "Made by Guest User" },
    { image: "/playlist/playlist2.svg", title: "Chill Vibes", subtitle: "Made by Guest User" },
    { image: "/playlist/playlist3.svg", title: "Workout Mix", subtitle: "Made by Guest User" },
  ]

  const myMusics = [
    { image: "/song/song1.svg", title: "Blinding Lights", subtitle: "The Weeknd" },
    { image: "/song/song2.svg", title: "Watermelon Sugar", subtitle: "Harry Styles" },
    { image: "/song/song3.svg", title: "Levitating", subtitle: "Dua Lipa" },
    { image: "/song/song4.svg", title: "Good 4 U", subtitle: "Olivia Rodrigo" },
    { image: "/song/song5.svg", title: "Stay", subtitle: "The Kid LAROI & Justin Bieber" },
    { image: "/song/song6.svg", title: "Industry Baby", subtitle: "Lil Nas X" },
  ]

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
        {myMusics.map((music, idx) => (
          <MyMusic key={idx} image={music.image} title={music.title} subtitle={music.subtitle} />
        ))}
      </div>
    </div>
  )
}
