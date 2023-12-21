"use client"

import TEXT from "@/components/TEXT"
import { KEYS } from "@/types/localstrage"
import { ROOM_SELECT } from "@/types/room-select"
import { URLS } from "@/types/urls"
import { generateRandomString } from "@/utils/generateRandomString"
import { getLocalStrage, initLocalStrage, setLocalStrage } from "@/utils/localstrage"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function () {
    const router = useRouter()
    const [selectedTurn, setSelectedTurn] = useState(1)
    const [roomFlag, setRoomFlag] = useState(false)
    const [teamcode, setTeamcode] = useState("")

    useEffect(() => {
        initLocalStrage(KEYS.ROOM_SELECT)
        initLocalStrage(KEYS.TURN)
        setRoomFlag(getLocalStrage(KEYS.ROOM_SELECT) === ROOM_SELECT.HOLD)
        setTeamcode(generateRandomString())
    }, [])

    const strs = Array(6).fill("")

    const handleSelectTurn = (num: number) => {
        setSelectedTurn(num)
        setLocalStrage(KEYS.TURN, String(num))
    }

    const handleFinish = () => {
        router.replace(URLS.HOME)
    }

    const handleContinue = () => {
        router.replace(URLS.GAME)
    }

    return (
        <main>
            <div className="flex h-screen justify-center items-center  bg-lime-600">
                <div className="flex flex-col justify-between h-full w-full  bg-red-700">
                    <div className="flex flex-row justify-between h-full py-5">
                        <div className="flex justify-center bg-yellow-200 h-full w-4/5">
                            <div className="flex flex-col justify-between bg-yellow-500 space-y-1 h-full w-4/5">
                                {strs.map((str, i) => (
                                    <div
                                        className="flex  bg-white w-full justify-center items-center rounded-xl h-full"
                                        key={i}
                                    >
                                        {str}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col justify-between bg-yellow-300 h-full w-1/5">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <button
                                    className="bg-white rounded-full mx-2 py-3"
                                    key={i}
                                >
                                    <TEXT text={String(i + 1)} />
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col justify-between items-center h-full space-y-2 py-5 px-10 bg-blue-200">
                        <div className="relative h-full w-2/3 border-black border-2">
                            <div className="absolute top-0.5 left-1 -translate-y-2/3 bg-white px-2">
                                チームコード
                            </div>
                            <div className="flex justify-center items-center h-full w-full bg-white">
                                <TEXT
                                    text={
                                        teamcode === ""
                                            ? "loading..."
                                            : teamcode
                                    }
                                />
                            </div>
                        </div>
                        <div className="flex justify-between md:px-10 px-2 md:space-x-10 space-x-4  bg-green-400 h-full w-full">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <button
                                    className={
                                        i+1 === selectedTurn
                                        ?
                                        "bg-red-400 h-full w-full rounded-xl"
                                        :
                                        "bg-red-300 h-full w-full rounded-xl"
                                    }
                                    key={i}
                                    onClick={() => handleSelectTurn(i+1)}
                                >
                                    <TEXT text={String(i + 1)} />
                                    <div className="select-none">ターン</div>
                                </button>
                            ))}
                        </div>
                        <div className="flex justify-center items-center bg-green-400 h-full w-full">
                            <button className="bg-green-600 py-2 px-8  rounded-sm" onClick={handleFinish}>
                                <TEXT text="ゲーム終了"/>
                            </button>
                        </div>
                        <div className="flex justify-center items-center bg-green-400 h-full w-full">
                            {roomFlag &&
                                <button
                                    className="bg-green-600 py-2 px-4  rounded-sm"
                                    onClick={handleContinue}
                                >
                                    <TEXT text="ゲームスタート" />
                                </button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
