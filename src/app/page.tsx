"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
    getLocalStrage,
    initLocalStrage,
    setLocalStrage
} from "@/utils/localstrage"
import { KEYS } from "@/types/localstrage"
import { URLS } from "@/types/urls"
import TEXT from "@/components/TEXT"

export default function Home() {
    const router = useRouter()
    const [text, setText] = useState("")

    useEffect(() => {
        initLocalStrage(KEYS.USER_NAME)
        setText(getLocalStrage(KEYS.USER_NAME))
    }, [])

    const handleClick = () => {
        setLocalStrage(KEYS.USER_NAME, text)
        router.push(URLS.ROOM_SELECT)
    }

    return (
        <main>
            <div
                className="flex h-screen justify-center items-center pt-10 bg-lime-600"
                onClick={handleClick}
            >
                <div className="flex flex-col justify-between pt-10 h-2/5">
                    <input
                        type="text"
                        className="py-4 px-2 text-xl"
                        value={text}
                        onChange={e => setText(e.target.value)}
                        onClick={e => e.stopPropagation()}
                    />
                    <TEXT text="タップしてスタート" />
                </div>
            </div>
        </main>
    )
}
