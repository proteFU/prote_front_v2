import PlayList from "@/components/PlayList"
import MyMusic from "@/components/MyMusic"
import SectionTitle from "@/components/SectionTitle"

export default function Favorites() {
  const playlists = [
    { image: "/playlist/playlist1.svg", title: "이무 생각 없이 듣는", subtitle: "고구마빵" },
    { image: "/playlist/playlist2.svg", title: "City Pop Playlist", subtitle: "I luv 4 u" },
    { image: "/playlist/playlist3.svg", title: "어디서 들어본 J-POP", subtitle: "kitty" },
  ]

  const myMusics = [
    { image: "/song/song1.svg", title: "주저하는 연인들을 위해", subtitle: "잔나비" },
    { image: "/song/song2.svg", title: "머리어깨무릎발 (feat.원슈타인)", subtitle: "이하이, 원슈타인" },
    { image: "/song/song3.svg", title: "Checklist (feat.Chromeo)", subtitle: "MAX" },
    { image: "/song/song4.svg", title: "ed", subtitle: "카우션" },
    { image: "/song/song5.svg", title: "I Don’t Think That I Like Her", subtitle: "Charlie Puth" },
    { image: "/song/song6.svg", title: "너의 로맨스에 내 이름을 써줘 (Prod. IVY GROUND)", subtitle: "104 (백사)" },
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
