"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';
import SectionTitle from '@/components/SectionTitle';
import Button from '@/components/ui/Button';

export default function MyProfile() {
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mock 사용자 데이터 로드
        const mockUserData = {
            name: 'Guest User',
            email: 'guest@example.com',
            image: 'https://picsum.photos/300/300?random=100',
            bio: '음악을 사랑하는 사용자입니다.',
            joinDate: '2024년 1월',
            totalPlaylists: 12,
            totalSongs: 156,
            favoriteGenres: ['Pop', 'Rock', 'Electronic']
        };
        
        setTimeout(() => {
            setUserData(mockUserData);
            setLoading(false);
        }, 1000);
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-full w-full gap-4 p-4">
                <div className="w-full h-10 px-4 py-2 rounded-md border border-gray-300 bg-gray-200 animate-pulse" />
                <div className="w-full h-10 px-4 py-2 rounded-md border border-gray-300 bg-gray-200 animate-pulse" />
                <div className="w-full h-10 px-4 py-2 rounded-md bg-gray-200 animate-pulse" />
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center h-full w-full p-4">
            {/* 프로필 헤더 */}
            <div className="flex flex-col items-center gap-4 mb-8">
                <Image 
                    src={userData.image} 
                    alt="Profile" 
                    width={120} 
                    height={120} 
                    className="rounded-full w-30 h-30 object-cover border-4 border-purple-500" 
                />
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-white">{userData.name}</h1>
                    <p className="text-gray-400">{userData.email}</p>
                    <p className="text-sm text-gray-500 mt-2">{userData.joinDate} 가입</p>
                </div>
            </div>

            {/* 통계 */}
            <SectionTitle title="My Stats" />
            <div className="grid grid-cols-2 gap-4 w-full max-w-md mb-8">
                <div className="bg-white/10 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-purple-400">{userData.totalPlaylists}</div>
                    <div className="text-sm text-gray-400">플레이리스트</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-purple-400">{userData.totalSongs}</div>
                    <div className="text-sm text-gray-400">저장된 곡</div>
                </div>
            </div>

            {/* 선호 장르 */}
            <SectionTitle title="Favorite Genres" />
            <div className="flex flex-wrap gap-2 mb-8">
                {userData.favoriteGenres.map((genre: string, index: number) => (
                    <span 
                        key={index}
                        className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm"
                    >
                        {genre}
                    </span>
                ))}
            </div>

            {/* 설정 버튼 */}
            <div className="w-full max-w-md space-y-3">
                <Button className="w-full">
                    프로필 편집
                </Button>
                <Button className="w-full">
                    설정
                </Button>
                <Button className="w-full">
                    친구 관리
                </Button>
            </div>
        </div>
    );
}