"use client"

import BoldText from "@/components/BoldText"
import DartsButton from "@/components/DartsButton"
import { TEXT_COLOR } from "@/types/color"
import { STRAGE_KEYS } from "@/types/localstrage"
import { URLS } from "@/types/urls"
import { getLocalStrage, initLocalStrage } from "@/utils/localstrage"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"

export default function () {
    const router = useRouter()
    const [isActive, setIsActive] = useState(false)
    const [score, setScore] = useState(0)
    const [turn, setTurn] = useState(1)
    const [times, setTimes] = useState(1)
    const dartsScores = [20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5]
    const DARTS_DEGREE = 18

    useEffect(() => {
        initLocalStrage(STRAGE_KEYS.TURN)
    }, [])

    const handleScore = (e: React.MouseEvent, num: number) => {
        isActive && setScore(num)
        setIsActive(!isActive)
        e.stopPropagation()
    }

    const handleTimes = (num: number) => {
        setTimes(num)
    }

    const handleDarts = (e: React.MouseEvent) => {
        isActive && setScore(50)
        setIsActive(!isActive)
        e.stopPropagation()
    }

    const handleContinue = () => {
        turn < Number(getLocalStrage(STRAGE_KEYS.TURN)) ? setTurn(turn + 1) : router.replace(URLS.RESULT)
    }

    const handleReset = () => {
        setScore(0)
        setIsActive(false)
    }

    return (
        <main>
            <div className="flex h-screen justify-center items-center bg-gray-50">
                <div className="flex flex-col h-full w-full">
                    <div className="flex flex-col h-2/5 w-full">
                        <div className="flex flex-row items-center h-3/5 w-full">
                            <div className="h-fit w-2/5 flex justify-center scale-150">
                                <div className="w-fit flex justify-center items-center p-2 border border-slate-300 bg-white rounded-md shadow-lg">
                                    <div className=" scale-125 mr-1">
                                        <BoldText color={TEXT_COLOR.BLACK}>
                                            {String(turn)}
                                        </BoldText>
                                    </div>
                                    <div className="font-semibold select-none pt-3">ターン</div>
                                </div>
                            </div>
                            <div className="w-3/5 px-2">
                                <BoldText color={TEXT_COLOR.BLACK}>
                                    {"まつばらあきひこ".length > 6 ? "まつばらあき..." : "まつばらあき"}
                                </BoldText>
                            </div>
                        </div>
                        <div className="flex flex-row justify-between space-x-2 md:space-x-4 px-2 md:px-4 h-1/3 md:h-2/5 w-full">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <button
                                    className={
                                        times === (i + 1) ?
                                            "h-full w-full rounded-lg bg-blue-500 border border-blue-400 shadow-md"
                                            :
                                            "h-full w-full rounded-lg bg-white border border-blue-400 shadow-md"
                                    }
                                    onClick={() => handleTimes(i + 1)}
                                    key={i}
                                >
                                    <BoldText color={
                                        times === (i + 1) ?
                                            TEXT_COLOR.WHITE
                                            :
                                            TEXT_COLOR.BLUE
                                    }>
                                        {"x" + String(i + 1)}
                                    </BoldText>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-center items-center h-3/5 w-full">
                        <div className="absolute h-3/5 w-full">
                            <div className="flex flex-col justify-between h-full w-full">
                                <div className="flex flex-row justify-end px-2 md:p-4">
                                    <div className="h-full w-fit flex justify-center items-center p-2 rounded-lg bg-white border border-slate-300 shadow-xl">
                                        <BoldText color={TEXT_COLOR.BLACK}>
                                            {String(score * times) + "点"}
                                        </BoldText>
                                    </div>
                                </div>
                                <div className="flex flex-row justify-between pb-2 px-3 md:px-6">
                                    <button
                                        className="flex justify-center items-center p-1 rounded-full border-2 border-black shadow-md"
                                        onClick={handleReset}
                                    >
                                        <img
                                            width="50"
                                            height="50"
                                            src="https://img.icons8.com/ios/50/u-turn-to-left.png"
                                            alt="u-turn-to-left"
                                            className="scale-[65%]"
                                        />
                                    </button>
                                    <button
                                        className="flex justify-center items-center p-1 rounded-full border-2 border-black shadow-md"
                                        onClick={handleContinue}
                                    >
                                        <img
                                            width="50"
                                            height="50"
                                            src="https://img.icons8.com/ios/50/forward--v1.png"
                                            alt="forward--v1"
                                            className="scale-[80%]"
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div
                            className={
                                isActive
                                    ? "flex flex-col justify-center items-center h-80 w-80 rounded-full bg-blue-400 shadow-xl visible"
                                    : "flex flex-col justify-center items-center h-80 w-80 invisible"
                            }
                        >
                            {/* ダーツ板のUI */}
                            <div className="relative translate-y-1/4 h-5 w-5">
                                {Array.from({ length: 20 }).map((_, i) => (
                                    <DartsButton rotate={i * DARTS_DEGREE} dartsScore={dartsScores[i]} clickEvent={handleScore} key={i}>
                                        <BoldText color={TEXT_COLOR.WHITE} key={i}>
                                            {dartsScores[i]}
                                        </BoldText>
                                    </DartsButton>
                                ))}
                            </div>

                            <div
                                className="absolute flex justify-center items-center visible h-32 w-32 rounded-full bg-red-500 shadow-lg cursor-pointer"
                                onClick={(e) => handleDarts(e)}
                            >
                                <div className="visible bg-slate-800 rounded-full h-1/2 w-1/2" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
