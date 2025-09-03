"use client"

import Link from "next/link";
import homeIcon from "@/public/home.svg";
import emotionIcon from "@/public/emotion.svg";
import favoriteIcon from "@/public/favorite.svg";
import profileIcon from "@/public/profile.svg";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";


const navigation = [
    { name: "Home", href: "/", icon: homeIcon, activeIcon: homeIcon},
    { name: "Emotion", href: "/emotion", icon: emotionIcon, activeIcon: emotionIcon},
    { name: "Favorites", href: "/favorites", icon: favoriteIcon, activeIcon: favoriteIcon},
    { name: "Profile", href: ["/profile", "/profile/my", "/profile/friends", "/profile/recent-playlists"], icon: profileIcon, activeIcon: profileIcon},
]

const NavItem = ({ name, href, icon, activeIcon, pathname }: { name: string, href: string | string[], icon: string, activeIcon: string, pathname: string }) => {
    const isActive = Array.isArray(href) ? href.includes(pathname) : href === pathname;
    const linkHref = Array.isArray(href) ? href[0] : href;
    return (
        <Link href={linkHref} className="flex flex-col items-center gap-1">
            <Image 
                src={isActive ? activeIcon : icon} 
                alt={name} 
                width={25} 
                height={24} 
                className={`w-6 h-6 ${isActive ? 'brightness-0 saturate-100' : ''}`}
                style={isActive ? { filter: 'brightness(0) saturate(100%) invert(45%) sepia(93%) saturate(1352%) hue-rotate(218deg) brightness(119%) contrast(119%)' } : {}}
            />
            <span className={`text-xs ${isActive ? 'text-[#7D2EEE]' : 'text-white'}`}>{name}</span>
        </Link>
    )
}

export default function GNB() {
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);


    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="fixed bottom-0 left-0 right-0 w-full h-16 flex justify-between items-center p-4 bg-black/50 backdrop-blur-sm border-t border-white/10 z-50">
                {navigation.map((item) => (
                    <div key={item.name} className="flex flex-col items-center gap-1">
                        <div className="w-6 h-6 bg-gray-600 rounded"></div>
                        <span className="text-xs text-white">{item.name}</span>
                    </div>
                ))}
            </div>
        );
    }
    
    return (
        <div className="fixed bottom-0 left-0 right-0 w-full h-16 flex justify-between items-center p-4 bg-black/50 backdrop-blur-sm border-t border-white/10 z-50">
            {navigation.map((item) => (
                <NavItem key={item.name} name={item.name} href={item.href} icon={item.icon} activeIcon={item.activeIcon} pathname={pathname} />
            ))}
        </div>
    )
}