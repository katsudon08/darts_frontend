"use client"

import TEXT from "@/components/TEXT"
import React, { useState } from "react"

export default function () {
    const [isActive, setIsActive] = useState(false)
    const [score, setScore] = useState(0)
    const [times, setTimes] = useState(1)

    const handleScore = (e: React.MouseEvent, num: number) => {
        setIsActive(!isActive)
        setScore(num)
        e.stopPropagation()
    }

    const handleTimes = (num: number) => {
        setTimes(num)
    }

    const handleDarts = (e: React.MouseEvent) => {
        setIsActive(!isActive)
        setScore(50)
        e.stopPropagation()
    }

    return (
        <div className="flex h-screen justify-center items-center  bg-lime-600">
            <div className="flex flex-col h-full w-full">
                <div className="flex flex-col h-2/5 w-full bg-red-100">
                    <div className="absolute top-0 left-0 h-24 w-24 pt-1 pl-1">
                        <div className="flex justify-center items-center h-full w-full pl-2 scale-150">
                            <TEXT text="1"/>
                            <div className="scale-75 pt-4">ターン</div>
                        </div>
                    </div>
                    <div className="bg-green-300 flex justify-center items-center h-3/5 w-full">
                        <TEXT text="まつばら" />
                    </div>
                    <div className="bg-green-200 flex flex-row h-2/5 w-full">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <button className="h-full w-full" key={i} onClick={() => handleTimes(i+1)}>
                                <TEXT text={"x" + String(i + 1)} />
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex justify-center items-center h-3/5 w-full bg-blue-100">
                    <div className="absolute h-3/5 w-full">
                        <div className="flex flex-col justify-between h-full w-full">
                            <div className="flex flex-row justify-end pt-2 pr-2">
                                <div className="h-20 w-20 flex justify-center items-center">
                                    <TEXT text={String(score*times)} />
                                </div>
                            </div>
                            <div className="flex flex-row justify-end pb-1 pr-1">
                                <button className="flex justify-center items-center h-16 w-16">
                                    <img width="50" height="50" src="https://img.icons8.com/ios/50/circled-chevron-right--v1.png" alt="circled-chevron-right--v1" className="scale-110" />
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
                        <div className="relative translate-y-1/4 h-5 w-5">
                            <div className="absolute top-1 h-40 w-8 -translate-y-full -translate-x-3">
                                <button className="flex justify-center h-full w-fit pt-2" onClick={e => handleScore(e, 20)}>
                                    <TEXT text="20" />
                                </button>
                            </div>
                            <div className="absolute text-center top-1 h-40 w-10 -translate-y-full -translate-x-1.5 origin-bottom rotate-18">
                                <button className="flex justify-center h-full w-full pt-2" onClick={e => handleScore(e, 1)}>
                                    <span className="origin-center -rotate-18">
                                        <TEXT text="1" />
                                    </span>
                                </button>
                            </div>
                            <div className="absolute text-center top-1 h-40 w-12 -translate-y-full -translate-x-3 origin-bottom rotate-36">
                                <button className="flex justify-center h-full w-full pt-2" onClick={e => handleScore(e, 18)}>
                                    <span className="origin-center -rotate-36">
                                        <TEXT text="18" />
                                    </span>
                                </button>
                            </div>
                            <div className="absolute text-center top-1 h-40 w-12 -translate-y-full -translate-x-3 origin-bottom rotate-54">
                                <button className="flex justify-center h-full w-full pt-2" onClick={e => handleScore(e, 4)}>
                                    <span className="origin-center -rotate-54">
                                        <TEXT text="4" />
                                    </span>
                                </button>
                            </div>
                            <div className="absolute text-center top-1 h-40 w-12 -translate-y-full -translate-x-3 origin-bottom rotate-72">
                                <button className="flex justify-center h-full w-full pt-2" onClick={e => handleScore(e, 13)}>
                                    <span className="origin-center -rotate-72">
                                        <TEXT text="13" />
                                    </span>
                                </button>
                            </div>
                            <div className="absolute text-center top-1 h-40 w-12 -translate-y-full -translate-x-3 origin-bottom rotate-90">
                                <button className="flex justify-center h-full w-full pt-2" onClick={e => handleScore(e, 6)}>
                                    <span className="origin-center -rotate-90">
                                        <TEXT text="6" />
                                    </span>
                                </button>
                            </div>
                            <div className="absolute text-center top-1 h-40 w-12 -translate-y-full -translate-x-3 origin-bottom rotate-108">
                                <button className="flex justify-center h-full w-full pt-2" onClick={e => handleScore(e, 10)}>
                                    <span className="origin-center -rotate-108">
                                        <TEXT text="10" />
                                    </span>
                                </button>
                            </div>
                            <div className="absolute text-center top-1 h-40 w-12 -translate-y-full -translate-x-3 origin-bottom rotate-126">
                                <button className="flex justify-center h-full w-full pt-2" onClick={e => handleScore(e, 15)}>
                                    <span className="origin-center -rotate-126">
                                        <TEXT text="15" />
                                    </span>
                                </button>
                            </div>
                            <div className="absolute text-center top-1 h-40 w-12 -translate-y-full -translate-x-3 origin-bottom rotate-144">
                                <button className="flex justify-center h-full w-full pt-2" onClick={e => handleScore(e, 2)}>
                                    <span className="origin-center -rotate-144">
                                        <TEXT text="2" />
                                    </span>
                                </button>
                            </div>
                            <div className="absolute text-center top-1 h-40 w-12 -translate-y-full -translate-x-3 origin-bottom rotate-162">
                                <button className="flex justify-center h-full w-full pt-2" onClick={e => handleScore(e, 17)}>
                                    <span className="origin-center -rotate-162">
                                        <TEXT text="17" />
                                    </span>
                                </button>
                            </div>
                            <div className="absolute text-center top-1 h-40 w-12 -translate-y-full -translate-x-3 origin-bottom rotate-180">
                                <button className="flex justify-center h-full w-full pt-2" onClick={e => handleScore(e, 3)}>
                                    <span className="origin-center -rotate-180">
                                        <TEXT text="3" />
                                    </span>
                                </button>
                            </div>
                            <div className="absolute text-center top-1 h-40 w-12 -translate-y-full -translate-x-3 origin-bottom rotate-198">
                                <button className="flex justify-center h-full w-full pt-2" onClick={e => handleScore(e, 19)}>
                                    <span className="origin-center -rotate-198">
                                        <TEXT text="19" />
                                    </span>
                                </button>
                            </div>
                            <div className="absolute text-center top-1 h-40 w-12 -translate-y-full -translate-x-3 origin-bottom rotate-216">
                                <button className="flex justify-center h-full w-full pt-2" onClick={e => handleScore(e, 7)}>
                                    <span className="origin-center -rotate-216">
                                        <TEXT text="7" />
                                    </span>
                                </button>
                            </div>
                            <div className="absolute text-center top-1 h-40 w-12 -translate-y-full -translate-x-3 origin-bottom rotate-234">
                                <button className="flex justify-center h-full w-full pt-2" onClick={e => handleScore(e, 16)}>
                                    <span className="origin-center -rotate-234">
                                        <TEXT text="16" />
                                    </span>
                                </button>
                            </div>
                            <div className="absolute text-center top-1 h-40 w-12 -translate-y-full -translate-x-3 origin-bottom rotate-252">
                                <button className="flex justify-center h-full w-full pt-2" onClick={e => handleScore(e, 8)}>
                                    <span className="origin-center -rotate-252">
                                        <TEXT text="8" />
                                    </span>
                                </button>
                            </div>
                            <div className="absolute text-center top-1 h-40 w-12 -translate-y-full -translate-x-3 origin-bottom rotate-270">
                                <button className="flex justify-center h-full w-full pt-2" onClick={e => handleScore(e, 11)}>
                                    <span className="origin-center -rotate-270">
                                        <TEXT text="11" />
                                    </span>
                                </button>
                            </div>
                            <div className="absolute text-center top-1 h-40 w-12 -translate-y-full -translate-x-3 origin-bottom rotate-288">
                                <button className="flex justify-center h-full w-full pt-2" onClick={e => handleScore(e, 14)}>
                                    <span className="origin-center -rotate-288">
                                        <TEXT text="14" />
                                    </span>
                                </button>
                            </div>
                            <div className="absolute text-center top-1 h-40 w-12 -translate-y-full -translate-x-3 origin-bottom rotate-306">
                                <button className="flex justify-center h-full w-full pt-2" onClick={e => handleScore(e, 9)}>
                                    <span className="origin-center -rotate-306">
                                        <TEXT text="9" />
                                    </span>
                                </button>
                            </div>
                            <div className="absolute text-center top-1 h-40 w-12 -translate-y-full -translate-x-3 origin-bottom rotate-324">
                                <button className="flex justify-center h-full w-full pt-2" onClick={e => handleScore(e, 12)}>
                                    <span className="origin-center -rotate-324">
                                        <TEXT text="12" />
                                    </span>
                                </button>
                            </div>
                            <div className="absolute text-center top-1 h-40 w-8 -translate-y-full -translate-x-2 origin-bottom rotate-342">
                                <button className="flex justify-center h-full w-full pt-2" onClick={e => handleScore(e, 5)}>
                                    <span className="origin-center -rotate-342">
                                        <TEXT text="5" />
                                    </span>
                                </button>
                            </div>
                        </div>


                        <div className="absolute visible h-32 w-32 rounded-full bg-red-400">
                            <button className="h-full w-full" onClick={e => handleDarts(e)} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
