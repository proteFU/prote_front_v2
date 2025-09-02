import SectionTitle from "@/components/SectionTitle";
import Image from "next/image";

const recommendedSongs = [
  { id: 1, name: "Song 1", image: "https://i.pinimg.com/236x/99/68/4e/99684ef58dd53fad550b0c00c0678d05.jpg", artist: "Artist 1" },
  { id: 2, name: "Song 2", image: "https://i.pinimg.com/236x/99/68/4e/99684ef58dd53fad550b0c00c0678d05.jpg", artist: "Artist 2" },
  { id: 3, name: "Song 3", image: "https://i.pinimg.com/236x/99/68/4e/99684ef58dd53fad550b0c00c0678d05.jpg", artist: "Artist 3" },
  { id: 4, name: "Song 4", image: "https://i.pinimg.com/236x/99/68/4e/99684ef58dd53fad550b0c00c0678d05.jpg", artist: "Artist 4" },
  { id: 5, name: "Song 5", image: "https://i.pinimg.com/236x/99/68/4e/99684ef58dd53fad550b0c00c0678d05.jpg", artist: "Artist 5" },
  { id: 6, name: "Song 6", image: "https://i.pinimg.com/236x/99/68/4e/99684ef58dd53fad550b0c00c0678d05.jpg", artist: "Artist 6" },
  { id: 7, name: "Song 7", image: "https://i.pinimg.com/236x/99/68/4e/99684ef58dd53fad550b0c00c0678d05.jpg", artist: "Artist 7" },
  { id: 8, name: "Song 8", image: "https://i.pinimg.com/236x/99/68/4e/99684ef58dd53fad550b0c00c0678d05.jpg", artist: "Artist 8" },
  { id: 9, name: "Song 9", image: "https://i.pinimg.com/236x/99/68/4e/99684ef58dd53fad550b0c00c0678d05.jpg", artist: "Artist 9" },
  { id: 10, name: "Song 10", image: "https://i.pinimg.com/236x/99/68/4e/99684ef58dd53fad550b0c00c0678d05.jpg", artist: "Artist 10" },
]

const recommendedPlaylists = [
  { id: 1, name: "Playlist 1", image: "https://i.pinimg.com/236x/99/68/4e/99684ef58dd53fad550b0c00c0678d05.jpg", madeby: "Made by John Dae" },
  { id: 2, name: "Playlist 2", image: "https://i.pinimg.com/236x/99/68/4e/99684ef58dd53fad550b0c00c0678d05.jpg", madeby: "Made by John Dae" },
  { id: 3, name: "Playlist 3", image: "https://i.pinimg.com/236x/99/68/4e/99684ef58dd53fad550b0c00c0678d05.jpg", madeby: "Made by John Dae" },
  { id: 4, name: "Playlist 4", image: "https://i.pinimg.com/236x/99/68/4e/99684ef58dd53fad550b0c00c0678d05.jpg", madeby: "Made by John Dae" },
  { id: 5, name: "Playlist 5", image: "https://i.pinimg.com/236x/99/68/4e/99684ef58dd53fad550b0c00c0678d05.jpg", madeby: "Made by John Dae" },
  { id: 6, name: "Playlist 6", image: "https://i.pinimg.com/236x/99/68/4e/99684ef58dd53fad550b0c00c0678d05.jpg", madeby: "Made by John Dae" },
  { id: 7, name: "Playlist 7", image: "https://i.pinimg.com/236x/99/68/4e/99684ef58dd53fad550b0c00c0678d05.jpg", madeby: "Made by John Dae" },
  { id: 8, name: "Playlist 8", image: "https://i.pinimg.com/236x/99/68/4e/99684ef58dd53fad550b0c00c0678d05.jpg", madeby: "Made by John Dae" },
  { id: 9, name: "Playlist 9", image: "https://i.pinimg.com/236x/99/68/4e/99684ef58dd53fad550b0c00c0678d05.jpg", madeby: "Made by John Dae" },
  { id: 10, name: "Playlist 10", image: "https://i.pinimg.com/236x/99/68/4e/99684ef58dd53fad550b0c00c0678d05.jpg", madeby: "Made by John Dae" },
]

const recommendedEmotions = [

  { id: 1, name: "Happy", image: "https://i.pinimg.com/236x/99/68/4e/99684ef58dd53fad550b0c00c0678d05.jpg" },
  { id: 2, name: "Sad", image: "https://i.pinimg.com/236x/99/68/4e/99684ef58dd53fad550b0c00c0678d05.jpg" },
  { id: 3, name: "Angry", image: "https://i.pinimg.com/236x/99/68/4e/99684ef58dd53fad550b0c00c0678d05.jpg" },
  { id: 4, name: "Sleepy", image: "https://i.pinimg.com/236x/99/68/4e/99684ef58dd53fad550b0c00c0678d05.jpg" },
  { id: 5, name: "Excited", image: "https://i.pinimg.com/236x/99/68/4e/99684ef58dd53fad550b0c00c0678d05.jpg" },
]

function RecommendedPlaylists({ playlist }: { playlist: any }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 mb-4">
      <Image src={playlist.image} alt="Recommended Playlist" width={120} height={120} className="rounded-md w-30 h-30 object-cover" />
      <div className="flex flex-col items-center justify-center">
        <p className="text-sm font-bold">{playlist.name}</p>
        {/* <p className="text-sm text-gray-500">{playlist.madeby}</p> */}
      </div>
    </div>
  )
}

function RecommendedSongs({ song }: { song: any }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 mb-4">
      <Image src={song.image} alt="Recommended Song" width={120} height={120} className="rounded-md w-30 h-30 object-cover" />
      <div className="flex flex-col items-center justify-center">
        <p className="text-sm font-bold">{song.name}</p>
        <p className="text-xs text-gray-500">{song.artist}</p>
      </div>
    </div>
  )
}

function RecommendedEmotions({ emotion }: { emotion: any }) {

  return (
    <div className="flex flex-col items-center justify-center gap-2 mb-4">
      <Image src={emotion.image} alt="Recommended Emotion" width={120} height={120} className="rounded-md w-30 h-30 object-cover" />
      <div className="flex flex-col items-center justify-center">
        <p className="text-sm font-bold">{emotion.name}</p>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <>
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
    </>
  )
}