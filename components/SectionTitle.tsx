"use client"

import Image from "next/image";
import rightArrow from "@/public/rightArrow.svg";
import { useRouter } from "next/navigation";

export default function SectionTitle({ title, href }: { title: string, href?: string }) {
    const router = useRouter();
    return (
        <div className="flex flex-row w-full p-4 content-center items-center justify-between" onClick={() => href && router.push(href)}>
            <h3 className="text-xl font-bold">{title}</h3>
            {href && <Image src={rightArrow} alt="rightArrow" width={20} height={20} className="w-5 h-5" />}
        </div>
    )
}