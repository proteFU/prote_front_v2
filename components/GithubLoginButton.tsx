"use client"

import { signIn } from "next-auth/react";
import githubIcon from "@/public/githubIcon.svg";
import Image from "next/image";

export default function GithubLoginButton() {
    return (
        <div className="flex justify-center items-center h-full w-full">
            <button
            onClick={() => signIn("github")}
            className="bg-white text-black px-4 py-2 rounded-md flex items-center gap-2"
            >
                <Image src={githubIcon} alt="github" width={20} height={20} />
            Sign in with Github</button>
        </div>
    )
}