"use client"

import BoldText from "@/components/BoldText"
import ModalWindow from "@/components/ModalWindow"
import { TEXT_COLOR } from "@/types/color"
import { STRAGE_KEYS } from "@/types/localstrage"
import { ROOM_SELECT } from "@/types/room-select"
import { URLS } from "@/types/urls"
import { initLocalStrage, setLocalStrage } from "@/utils/localstrage"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function () {
    const router = useRouter()
    const [isModalWindowDisplay, setIsModalWindowDisplay] = useState(false)
    // 即時関数にすることで子コンポーネントに渡した際の無限レンダリングを防いでいる
    const hideModalWindowDisplay = (): void => setIsModalWindowDisplay(false)

    useEffect(() => {
        initLocalStrage(STRAGE_KEYS.ROOM_SELECT)
    }, [])

    const handleHold = () => {
        setLocalStrage(STRAGE_KEYS.ROOM_SELECT, ROOM_SELECT.HOLD)
        router.push(URLS.ROOM_SETTING)
    }

    const handleJoin = () => {
        setLocalStrage(STRAGE_KEYS.ROOM_SELECT, ROOM_SELECT.JOIN)
        setIsModalWindowDisplay(true)
    }

    return (
        <main className="flex h-screen justify-center items-center py-10 bg-gradient-to-b from-blue-400 to-blue-900">
            {isModalWindowDisplay && <ModalWindow hideModalWindowDisplay={hideModalWindowDisplay} />}
            <div className="flex flex-col justify-between h-3/5 w-4/5 md:w-3/5">
                <button
                    className="h-1/3 w-full rounded-md bg-white shadow-md"
                    onClick={handleHold}
                >
                    <BoldText color={TEXT_COLOR.BLACK}>
                        ルームを作成
                    </BoldText>
                </button>
                <button
                    className="h-1/3 w-full rounded-md bg-white shadow-md"
                    onClick={handleJoin}
                >
                    <BoldText color={TEXT_COLOR.BLACK}>
                        ルームに参加
                    </BoldText>
                </button>
            </div>
        </main>
    )
}