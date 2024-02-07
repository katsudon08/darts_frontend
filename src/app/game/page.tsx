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

    useEffect(() => {
        initLocalStrage(STRAGE_KEYS.TURN)
        setTurn(Number(getLocalStrage(STRAGE_KEYS.TURN)))
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
        1 < turn ? setTurn(turn - 1) : router.replace(URLS.RESULT)
    }

    const handleReset = () => {
        setScore(0)
        setIsActive(false)
    }

    return (
        <main className="flex h-screen justify-center items-center  bg-lime-600">
            <div className="flex flex-col h-full w-full">
                <div className="flex flex-col h-2/5 w-full bg-red-100">
                    <div className="absolute top-0 left-0 h-24 w-24 pt-1 pl-1">
                        <div className="flex justify-center items-center h-full w-full pl-2 scale-150">
                            <BoldText color={TEXT_COLOR.BLACK}>
                                {String(turn)}
                            </BoldText>
                            <div className="scale-75 select-none pt-4">ターン</div>
                        </div>
                    </div>
                    <div className="bg-green-300 flex justify-center items-center h-3/5 w-full">
                        <BoldText color={TEXT_COLOR.BLACK}>
                            まつばら
                        </BoldText>
                    </div>
                    <div className="bg-green-200 flex flex-row h-2/5 w-full">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <button
                                className="h-full w-full"
                                key={i}
                                onClick={() => handleTimes(i + 1)}
                            >
                                <BoldText color={TEXT_COLOR.BLACK}>
                                    {"x" + String(i + 1)}
                                </BoldText>
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex justify-center items-center h-3/5 w-full bg-blue-100">
                    <div className="absolute h-3/5 w-full">
                        <div className="flex flex-col justify-between h-full w-full">
                            <div className="flex flex-row justify-end pt-2 pr-2">
                                <div className="h-20 w-20 flex justify-center items-center">
                                    <BoldText color={TEXT_COLOR.BLACK}>
                                        {String(score * times)}
                                    </BoldText>
                                </div>
                            </div>
                            <div className="flex flex-row justify-between pb-1 pl-1">
                                <button
                                    className="flex justify-center items-center"
                                    onClick={handleReset}
                                >
                                    <BoldText color={TEXT_COLOR.BLACK}>
                                        リセット
                                    </BoldText>
                                </button>
                                <button
                                    className="flex justify-center items-center h-16 w-16"
                                    onClick={handleContinue}
                                >
                                    <img
                                        width="50"
                                        height="50"
                                        src="https://img.icons8.com/ios/50/circled-chevron-right--v1.png"
                                        alt="circled-chevron-right--v1"
                                        className="scale-110"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div
                        className={
                            isActive
                                ? "flex flex-col justify-center items-center h-80 w-80 rounded-full bg-red-200 visible"
                                : "flex flex-col justify-center items-center h-80 w-80 invisible"
                        }
                    >
                        {/* ダーツ板のUI */}
                        <div className="relative translate-y-1/4 h-5 w-5">
                            {Array.from({length: 20}).map((_, i) => (
                                <DartsButton rotate={i*18} dartsScore={dartsScores[i]} clickEvent={handleScore} key={i}>
                                    <BoldText color={TEXT_COLOR.BLACK} key={i}>
                                        {dartsScores[i]}
                                    </BoldText>
                                </DartsButton>
                            ))}
                        </div>

                        <div className="absolute visible h-32 w-32 rounded-full bg-red-400">
                            <button
                                className="h-full w-full"
                                onClick={(e) => handleDarts(e)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
