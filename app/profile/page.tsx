"use client"

import Image from "next/image";
import rightArrow from "@/public/rightArrow.svg";
import SectionTitle from "@/components/SectionTitle";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts"
import { useRouter } from "next/navigation";

const profileImage = `https://i.pinimg.com/236x/99/68/4e/99684ef58dd53fad550b0c00c0678d05.jpg`;

const moodData = [
    { name: 'Joy', value: 85 },
    { name: 'Melancholy', value: 25 },
    { name: 'Passion', value: 75 },
    { name: 'Serenity', value: 60 },
    { name: 'Nostalgia', value: 45 },
    { name: 'Euphoria', value: 90 },
];

const friends = [
    { id: 1, name: "John Doe", image: profileImage },
    { id: 2, name: "Mike Smith", image: profileImage },
    { id: 3, name: "Sarah Johnson", image: profileImage },
    { id: 4, name: "David Lee", image: profileImage },
    { id: 5, name: "Emily Brown", image: profileImage },
    { id: 6, name: "Emily Brown", image: profileImage },
    { id: 7, name: "Emily Brown", image: profileImage },
    { id: 8, name: "Emily Brown", image: profileImage },
    { id: 9, name: "Emily Brown", image: profileImage },
    { id: 10, name: "Emily Brown", image: profileImage },
];



const recentPlaylists = [
    { id: 1, name: "Playlist 1", image: profileImage },
    { id: 2, name: "Playlist 2", image: profileImage },
    { id: 3, name: "Playlist 3", image: profileImage },
    { id: 4, name: "Playlist 4", image: profileImage },
    { id: 5, name: "Playlist 5", image: profileImage },
    { id: 6, name: "Playlist 6", image: profileImage },
    { id: 7, name: "Playlist 7", image: profileImage },
    { id: 8, name: "Playlist 8", image: profileImage },
    { id: 9, name: "Playlist 9", image: profileImage },
    { id: 10, name: "Playlist 10", image: profileImage },
];

export default function Profile() {
    const router = useRouter();
    return (
        <div className="flex flex-col items-center justify-center h-full w-full">
            <div className="flex flex-row justify-between items-center w-full p-4 pb-4" onClick={() => router.push("/profile/my")}>
                <div className="flex flex-row gap-6 items-center">
                    <Image src={profileImage} alt="profile" width={64} height={64} className="rounded-full w-16 h-16 object-cover" />
                    <div className="flex flex-col">
                        <p className="text-xl font-bold">John Dae</p> {/* userName */}
                        <p className="text-sm text-gray-500">john._xae</p> {/* userID */}
                    </div>
                </div>
                <Image src={rightArrow} alt="rightArrow" width={24} height={24} className="w-6 h-6" />
            </div>
            <SectionTitle title="My mood lately" href="/profile/my" />
            <div >
                <RadarChart cx="50%" cy="50%" outerRadius="75%" width={391} height={391} data={moodData}>
                    <PolarGrid stroke="#ffffff20" />
                    <PolarAngleAxis 
                        dataKey="name" 
                        tick={{ fill: '#ffffff80', fontSize: 12, fontWeight: 500 }}
                        axisLine={false}
                    />
                    <PolarRadiusAxis 
                        tick={{ fill: '#ffffff40', fontSize: 10 }}
                        axisLine={false}
                        tickLine={false}
                    />
                    <Radar 
                        name="Emotion" 
                        dataKey="value" 
                        stroke="#7D2EEE" 
                        fill="url(#emotionGradient)" 
                        fillOpacity={0.3}
                        strokeWidth={2}
                    />
                    <defs>
                        <radialGradient id="emotionGradient" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#7D2EEE" stopOpacity={0.8} />
                            <stop offset="100%" stopColor="#7D2EEE" stopOpacity={0.1} />
                        </radialGradient>
                    </defs>
                </RadarChart>
            </div>
            <SectionTitle title="Friends" href="/profile/friends" />
            <div className="w-full overflow-x-auto pb-2">
                <div className="flex flex-row items-center gap-1 pl-4 min-w-max">
                    {friends.map((friend) => (
                        <div className="flex flex-col gap-2 items-center min-w-[80px] flex-shrink-0" key={friend.id}>
                            <Image src={friend.image} alt="profile" width={64} height={64} className="rounded-full w-16 h-16 object-cover" />
                            <p className="text-sm text-center">{friend.name}</p>
                        </div>
                    ))}
                </div>
            </div>
            <SectionTitle title="Recent Playlist" href="/profile/recent-playlists" />
            <div className="w-full overflow-x-auto pb-2">
                <div className="flex flex-row items-center gap-4 pl-4 min-w-max">
                    {recentPlaylists.map((playlist) => (
                        <div className="flex flex-col gap-2 items-center min-w-[100px] flex-shrink-0 mb-4" key={playlist.id}>
                            <Image src={playlist.image} alt="playlist" width={100} height={100} className="rounded-md w-25 h-25 object-cover" />
                            <p className="text-sm text-center">{playlist.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}