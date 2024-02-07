"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
    getLocalStrage,
    initLocalStrage,
    setLocalStrage
} from "@/utils/localstrage"
import { STRAGE_KEYS } from "@/types/localstrage"
import { URLS } from "@/types/urls"
import BoldText from "@/components/BoldText"
import { TEXT_COLOR } from "@/types/color"

export default function Home() {
    const router = useRouter()
    const [text, setText] = useState("")

    useEffect(() => {
        initLocalStrage(STRAGE_KEYS.USER_NAME)
        setText(getLocalStrage(STRAGE_KEYS.USER_NAME))
    }, [])

    const handleClick = () => {
        setLocalStrage(STRAGE_KEYS.USER_NAME, text)
        router.push(URLS.ROOM_SELECT)
    }

    return (
        <main>
            <div
                className="flex h-screen justify-center items-center pt-10 bg-gradient-to-b from-blue-400 to-blue-900"
                onClick={handleClick}
            >
                <div className="flex flex-col justify-between items-center pt-10 h-2/5">
                    <input
                        type="username"
                        className="p-2 h-1/3 w-full rounded-md text-xl shadow-md"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                    />
                    <BoldText color={TEXT_COLOR.WHITE}>
                        タップしてスタート
                    </BoldText>
                </div>
            </div>
        </main>
    )
}
