"use client"

import TEXT from "@/components/TEXT"
import { URLS } from "@/types/urls"
import { generateRandomString } from "@/utils/generateRandomString"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function () {
    const router = useRouter()
    const [teamcode, setTeamcode] = useState("")

    useEffect(() => {
        setTeamcode(generateRandomString())
    }, [])

    const strs = Array(9).fill("")

    const handleClick = () => {
        router.push(URLS.GAME)
    }

    return (
        <main>
            <div className="flex h-screen justify-center items-center  bg-lime-600">
                <div className="flex flex-col justify-between h-full w-full  bg-red-700">
                    <div className="flex flex-row justify-between h-3/5 py-5">
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
                            {Array.from({length: 4}).map((_, i) => (
                                    <button
                                        className="bg-white rounded-full mx-2 py-3"
                                        key={i}
                                    >
                                        <TEXT text={String(i + 1)} />
                                    </button>
                                ))}
                        </div>
                    </div>
                    <div className="flex flex-col justify-between items-center h-2/5 space-y-2 py-5 px-10 bg-blue-200">
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
                        <div className="flex justify-between px-10 space-x-1  bg-green-400 h-full w-full">
                            {Array.from({length: 3}).map((_, i) => (
                                    <div
                                        className="bg-red-300 w-full rounded-md"
                                        key={i}
                                    >
                                        <TEXT text={String(i + 1)} />
                                        ターン
                                    </div>
                                ))}
                        </div>
                        <div className="flex justify-center items-center bg-green-400 h-full w-full">
                            <button
                                className="bg-green-600 py-2 px-4  rounded-sm"
                                onClick={handleClick}
                            >
                                <TEXT text="ゲームスタート" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
