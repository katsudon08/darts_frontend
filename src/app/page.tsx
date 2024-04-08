"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
    getLocalStorage,
    initLocalStorage,
    setLocalStorage
} from "@/utils/localstorage"
import { STORAGE_KEYS } from "@/types/localstorage"
import { URLS } from "@/types/urls"
import BoldText from "@/components/BoldText"
import { TEXT_COLOR } from "@/types/color"
import PopUp from "@/components/PopUp"

export default function Home() {
    const router = useRouter()
    const [text, setText] = useState("")
    const [isPopUpWindow, setIsPopUpWindow] = useState(false)
    const hidePopUpWindow = (): void => setIsPopUpWindow(false)

    useEffect(() => {
        initLocalStorage(STORAGE_KEYS.USER_NAME)
        setText(getLocalStorage(STORAGE_KEYS.USER_NAME))
    }, [])

    const handleClick = () => {
        if (text) {
            setLocalStorage(STORAGE_KEYS.USER_NAME, text)
            router.push(URLS.ROOM_SELECT)
        } else {
            setIsPopUpWindow(true)
        }
    }

    return (
        <main className="flex h-screen w-full justify-center items-center bg-gradient-to-b from-blue-400 to-purple-800">
            {isPopUpWindow &&
                <PopUp hidePopUpWindow={hidePopUpWindow}>
                    ユーザー名を入力してください
                </PopUp>
            }
            <div
                className="h-full w-full flex justify-center items-center"
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
                        <div className="opacity-80">タップしてスタート</div>
                    </BoldText>
                </div>
            </div>
        </main >
    )
}