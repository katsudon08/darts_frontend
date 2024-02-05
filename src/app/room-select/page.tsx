"use client"

import Text from "@/components/Text"
import { COLOR } from "@/types/color"
import { STRAGE_KEYS } from "@/types/localstrage"
import { ROOM_SELECT } from "@/types/room-select"
import { URLS } from "@/types/urls"
import { initLocalStrage, setLocalStrage } from "@/utils/localstrage"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function () {
    const router = useRouter()

    useEffect(() => {
        initLocalStrage(STRAGE_KEYS.ROOM_SELECT)
    }, [])

    const handleHold = () => {
        setLocalStrage(STRAGE_KEYS.ROOM_SELECT, ROOM_SELECT.HOLD)
        router.push(URLS.ROOM_SETTING)
    }

    const handleJoin = () => {
        setLocalStrage(STRAGE_KEYS.ROOM_SELECT, ROOM_SELECT.JOIN)
        router.push(URLS.ROOM_SETTING)
    }

    return (
        <main className="flex h-screen justify-center items-center py-10 bg-gradient-to-b from-blue-400 to-blue-900">
            <div className="flex flex-col justify-between h-3/5 w-3/5">
                <button
                    className="h-1/3 w-full rounded-md bg-white"
                    onClick={handleHold}
                >
                    <Text text="ルームを作成" color={COLOR.BLACK} />
                </button>
                <button
                    className="h-1/3 w-full rounded-md bg-white"
                    onClick={handleJoin}
                >
                    <Text text="ルームに参加" color={COLOR.BLACK} />
                </button>
            </div>
        </main>
    )
}