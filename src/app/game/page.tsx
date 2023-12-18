"use client"

import TEXT from "@/components/TEXT"
import { useState } from "react"

export default function () {
    const [isActive, setIsActive] = useState(true)

    const darts = [
        [12, 5, 20, 1, 18],
        [9, 0, 0, 0, 4],
        [14, 0, 0, 0, 13],
        [11, 0, 0, 0, 6],
        [8, 0, 0, 0, 10],
        [16, 0, 0, 0, 15],
        [7, 19, 3, 17, 2]
    ]

    const handleDarts = (e: React.MouseEvent) => {
        setIsActive(!isActive)
        e.stopPropagation()
    }

    return (
        <div className="flex h-screen justify-center items-center  bg-lime-600">
            <div className="flex flex-col h-full w-full">
                <div className="flex flex-col h-2/5 w-full bg-red-100">
                    <div className="bg-green-300 flex justify-center items-center h-3/5 w-full">
                        <TEXT text="まつばら" />
                    </div>
                    <div className="bg-green-200 flex flex-row h-2/5 w-full">
                        {Array(3)
                            .fill(0)
                            .map((v, i) => (
                                <button className="h-full w-full" key={i}>
                                    <TEXT text={"x" + String(i + 1)} />
                                </button>
                            ))}
                    </div>
                </div>
                <div className="flex justify-center items-center h-3/5 w-full bg-blue-100">
                    <div
                        className={
                            isActive
                                ? "flex flex-col justify-center items-center h-80 w-80 rounded-full bg-red-200 visible"
                                : "flex flex-col justify-center items-center h-80 w-80 invisible"
                        }
                    >

                        <div className="relative visible translate-y-1/4 bg-blue-950 h-5 w-5">
                            <div className="absolute top-1 visible h-40 w-8 -translate-y-full -translate-x-3">
                                <button className="flex justify-center h-full w-fit pt-1">
                                    <TEXT text="20" />
                                </button>
                            </div>
                            <div className="absolute text-center top-1 visible h-40 w-12 -translate-y-full -translate-x-3 origin-bottom rotate-18">
                                <button className="flex justify-center h-full w-full pt-1">
                                    <TEXT text="1" />
                                </button>
                            </div>
                            <div className="absolute text-center top-1 visible h-40 w-12 -translate-y-full -translate-x-3 origin-bottom rotate-36">
                                <button className="flex justify-center h-full w-full pt-1">
                                    <TEXT text="18" />
                                </button>
                            </div>
                            <div className="absolute text-center top-1 visible h-40 w-12 -translate-y-full -translate-x-3 origin-bottom rotate-54">
                                <button className="flex justify-center h-full w-full pt-1">
                                    <TEXT text="4" />
                                </button>
                            </div>
                            <div className="absolute text-center top-1 visible h-40 w-12 -translate-y-full -translate-x-3 origin-bottom rotate-72">
                                <button className="flex justify-center h-full w-full pt-1">
                                    <TEXT text="13" />
                                </button>
                            </div>
                            <div className="absolute text-center top-1 visible h-40 w-12 -translate-y-full -translate-x-3 origin-bottom rotate-90">
                                <button className="flex justify-center h-full w-full pt-1">
                                    <TEXT text="6" />
                                </button>
                            </div>
                            <div className="absolute text-center top-1 visible h-40 w-12 -translate-y-full -translate-x-3 origin-bottom rotate-108">
                                <button className="flex justify-center h-full w-full pt-1">
                                    <TEXT text="10" />
                                </button>
                            </div>
                            <div className="absolute text-center top-1 visible h-40 w-12 -translate-y-full -translate-x-3 origin-bottom rotate-126">
                                <button className="flex justify-center h-full w-full pt-1">
                                    <TEXT text="15" />
                                </button>
                            </div>
                            <div className="absolute text-center top-1 visible h-40 w-12 -translate-y-full -translate-x-3 origin-bottom rotate-144">
                                <button className="flex justify-center h-full w-full pt-1">
                                    <TEXT text="2" />
                                </button>
                            </div>
                            <div className="absolute text-center top-1 visible h-40 w-12 -translate-y-full -translate-x-3 origin-bottom rotate-162">
                                <button className="flex justify-center h-full w-full pt-1">
                                    <TEXT text="17" />
                                </button>
                            </div>
                            <div className="absolute text-center top-1 visible h-40 w-12 -translate-y-full -translate-x-3 origin-bottom rotate-180">
                                <button className="flex justify-center h-full w-full pt-1">
                                    <TEXT text="3" />
                                </button>
                            </div>
                            <div className="absolute text-center top-1 visible h-40 w-12 -translate-y-full -translate-x-3 origin-bottom rotate-198">
                                <button className="flex justify-center h-full w-full pt-1">
                                    <TEXT text="19" />
                                </button>
                            </div>
                            <div className="absolute text-center top-1 visible h-40 w-12 -translate-y-full -translate-x-3 origin-bottom rotate-216">
                                <button className="flex justify-center h-full w-full pt-1">
                                    <TEXT text="7" />
                                </button>
                            </div>
                            <div className="absolute text-center top-1 visible h-40 w-12 -translate-y-full -translate-x-3 origin-bottom rotate-234">
                                <button className="flex justify-center h-full w-full pt-1">
                                    <TEXT text="16" />
                                </button>
                            </div>
                            <div className="absolute text-center top-1 visible h-40 w-12 -translate-y-full -translate-x-3 origin-bottom rotate-252">
                                <button className="flex justify-center h-full w-full pt-1">
                                    <TEXT text="8" />
                                </button>
                            </div>
                            <div className="absolute text-center top-1 visible h-40 w-12 -translate-y-full -translate-x-3 origin-bottom rotate-270">
                                <button className="flex justify-center h-full w-full pt-1">
                                    <TEXT text="11" />
                                </button>
                            </div>
                            <div className="absolute text-center top-1 visible h-40 w-12 -translate-y-full -translate-x-3 origin-bottom rotate-288">
                                <button className="flex justify-center h-full w-full pt-1">
                                    <TEXT text="14" />
                                </button>
                            </div>
                            <div className="absolute text-center top-1 visible h-40 w-12 -translate-y-full -translate-x-3 origin-bottom rotate-306">
                                <button className="flex justify-center h-full w-full pt-1">
                                    <TEXT text="9" />
                                </button>
                            </div>
                            <div className="absolute text-center top-1 visible h-40 w-12 -translate-y-full -translate-x-3 origin-bottom rotate-324">
                                <button className="flex justify-center h-full w-full pt-1">
                                    <TEXT text="12" />
                                </button>
                            </div>
                            <div className="absolute text-center top-1 visible h-40 w-12 -translate-y-full -translate-x-3 origin-bottom rotate-342">
                                <button className="flex justify-center h-full w-full pt-1">
                                    <TEXT text="5" />
                                </button>
                            </div>
                        </div>


                        <div className="absolute invisible h-32 w-32 rounded-full bg-red-400">
                            <button className="h-full w-full" onClick={e => handleDarts(e)} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
