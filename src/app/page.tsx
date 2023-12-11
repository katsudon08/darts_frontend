"use client"

import { useState, useEffect, ChangeEvent, MouseEvent } from "react"
import { useRouter } from "next/navigation"
import {
    getLocalStrage,
    initLocalStrage,
    setLocalStrage
} from "@/utils/localstrage"
import { KEYS } from "@/types/localstrage"
import { URLS } from "@/types/urls"

export default function Home() {
    const router = useRouter()
    const [text, setText] = useState("")

    useEffect(() => {
        initLocalStrage(KEYS.USER_NAME)
        setText(getLocalStrage(KEYS.USER_NAME))
    }, [])

    const handleClick = () => {
        setLocalStrage(KEYS.USER_NAME, text)
        router.push(URLS.ROOM_SETTING)
    }

    return (
        <main>
            <div
                className="flex min-h-screen justify-center items-center pt-10 bg-lime-600"
                onClick={handleClick}
            >
                <div
                    className="flex flex-col justify-between pt-10 h-60"
                >
                    <input
                        type="text"
                        className="py-4 px-2 text-xl"
                        value={text}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setText(e.target.value)
                        }
                        onClick={(e: MouseEvent<HTMLInputElement>) =>
                            e.stopPropagation()
                        }
                    />
                    <h1 className="whitespace-nowrap select-none text-4xl font-semibold">タップしてスタート</h1>
                </div>
            </div>
        </main>
    )
}
