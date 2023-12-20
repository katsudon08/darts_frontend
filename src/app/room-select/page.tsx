"use client"

import TEXT from "@/components/TEXT"
import { URLS } from "@/types/urls"
import { useRouter } from "next/navigation"

export default function () {
    const router = useRouter()

    const handleHold = () => {
        router.push(URLS.ROOM_SETTING)
    }

    const handleJoin = () => {
        router.push(URLS.ROOM_SETTING)
    }

    return (
        <main className="flex h-screen justify-center items-center py-10 bg-lime-600">
            <div className="flex flex-col justify-between h-3/5 w-3/5">
                <button
                    className="h-1/3 w-full rounded-md bg-white"
                    onClick={handleHold}
                >
                    <TEXT text="ルームを作成" />
                </button>
                <button
                    className="h-1/3 w-full rounded-md bg-white"
                    onClick={handleJoin}
                >
                    <TEXT text="ルームに参加" />
                </button>
            </div>
        </main>
    )
}
