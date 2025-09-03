"use client"

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Title() {
    const pathname = usePathname();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);
    const getPageTitle = (path: string) => {
        switch (path) {
            case "/":
                return "Home";
            case "/emotion":
                return "Emotion";
            case "/favorites":
                return "Favorites";
            case "/profile":
                return "Profile";
            case "/profile/my":
                return "My Profile";
            default:
                return path.charAt(0).toUpperCase() + path.slice(1).replace("-", " ");
        }
    };

    if (!mounted) {
        return (
            <div className="flex flex-row items-center justify-between p-4">
                <h1 className="text-2xl font-bold text-white/40">Loading...</h1>
            </div>
        );
    }

    return (
        pathname === "/profile" ? (
            <div className="flex flex-row items-center justify-between p-4">
                <h1 className="text-2xl font-bold">{getPageTitle(pathname)}</h1>
            </div>
        ) : (
            <div className="flex flex-row items-center justify-between p-4">
                <h1 className="text-2xl font-bold">{getPageTitle(pathname)}</h1>
                <Image
                src={`https://picsum.photos/300/300?random=300`}
                alt="profile" 
                width={32} 
                height={32} 
                className="rounded-full w-8 h-8 object-cover" 
                onClick={() => router.push("/profile")}
                />
            </div>
        )
    )
}