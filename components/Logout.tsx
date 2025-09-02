"use client"

import { signOut } from "next-auth/react";

export default function Logout() {
    return (
        <div className="flex justify-center items-center h-full w-full">
            <button onClick={() => signOut()}>Logout</button>
        </div>
    )
}