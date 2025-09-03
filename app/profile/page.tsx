"use client"

import Image from "next/image";
import rightArrow from "@/public/rightArrow.svg";
import SectionTitle from "@/components/SectionTitle";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts"
import { useRouter } from "next/navigation";
import { profileImage, moodData, friends, recentPlaylists } from "@/data/ProfileData";
import { Friend, Playlist } from "@/app/types/Profile";
import { useEffect, useState } from "react";


export default function Profile() {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="flex flex-col items-center justify-center h-full w-full gap-4 p-4">
                <div className="w-full h-10 px-4 py-2 rounded-md border border-gray-300 bg-gray-200 animate-pulse" />
                <div className="w-full h-10 px-4 py-2 rounded-md border border-gray-300 bg-gray-200 animate-pulse" />
                <div className="w-full h-10 px-4 py-2 rounded-md bg-gray-200 animate-pulse" />
            </div>
        );
    }
    return (
        <div className="flex flex-col items-center justify-center h-full w-full">
            <div className="flex flex-row justify-between items-center w-full p-4 pb-4" onClick={() => router.push("/profile/my")}>
                <div className="flex flex-row gap-6 items-center">
                    <Image src={profileImage} alt="profile" width={64} height={64} className="rounded-full w-16 h-16 object-cover" />
                    <div className="flex flex-col">
                        <p className="text-xl font-bold">Guest User</p>
                        <p className="text-sm text-gray-500">guest@example.com</p>
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
                    {friends.map((friend: Friend) => (
                        <div className="flex flex-col gap-2 items-center min-w-[80px] flex-shrink-0" key={friend.id}>
                            <Image src={friend.image || profileImage} alt="profile" width={64} height={64} className="rounded-full w-16 h-16 object-cover" />
                            <p className="text-sm text-center">{friend.name}</p>
                        </div>
                    ))}
                </div>
            </div>
            <SectionTitle title="Recent Playlist" href="/profile/recent-playlists" />
            <div className="w-full overflow-x-auto pb-2">
                <div className="flex flex-row items-center gap-4 pl-4 min-w-max">
                    {recentPlaylists.map((playlist: Playlist) => (
                        <div className="flex flex-col gap-2 items-center min-w-[100px] flex-shrink-0 mb-4" key={playlist.id}>
                            <Image src={playlist.image || profileImage} alt="playlist" width={100} height={100} className="rounded-md w-25 h-25 object-cover" />
                            <p className="text-sm text-center">{playlist.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}