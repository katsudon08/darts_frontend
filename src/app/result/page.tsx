"use client"

import BoldText from "@/components/BoldText"
import { TEXT_COLOR } from "@/types/color"
import { URLS } from "@/types/urls"
import { useRouter } from "next/navigation"

export default function () {
    const router = useRouter()

    const strs = Array(6).fill("")

    const handleContinue = () => {
        router.replace(URLS.ROOM_SETTING)
    }

    return (
        <main>
            <div className="h-screen w-full flex flex-col p-2 bg-gradient-to-b from-blue-400 to-purple-800">
                <div className="h-[87%] md:h-4/5 w-full flex flex-col md:flex-row space-y-2 md:space-y-0 md:py-2">
                    <div className="h-full w-full flex flex-col justify-between space-y-1 md:space-y-2 md:py-2">
                        <div className="h-fit w-full flex flex-row bg-gray-50 rounded-md border border-slate-400 shadow-md">
                            <div className="h-full w-1/4 text-center select-none font-semibold">RANK</div>
                            <div className="h-full w-3/4 border-l-2 border-r-2 md:border-r-1 border-slate-300 text-center select-none font-semibold">TEAM</div>
                            <div className="h-full w-2/4 border-l-1 border-r-2 border-slate-300 select-none font-semibold hidden md:flex md:justify-center">MEMBER</div>
                            <div className="h-full w-1/4 text-center select-none font-semibold">POINT</div>
                        </div>
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div className="h-full w-full flex flex-row bg-gray-50 rounded-md border border-slate-400 shadow-md" key={i}>
                                <div className="h-full w-1/4" key={i}></div>
                                <div className="h-full w-3/4 border-l-2 border-r-2 md:border-r-1 border-slate-300" key={i}></div>
                                <div className="h-full w-2/4 border-l-1 border-r-2 border-slate-300 hidden md:flex" key={i}></div>
                                <div className="h-full w-1/4" key={i}></div>
                            </div>
                        ))}
                    </div>
                    <div className="h-full w-full flex flex-col space-y-1 md:hidden">
                        <div className="h-fit w-full flex flex-row bg-gray-50 rounded-md border border-slate-400 shadow-md">
                            <div className="h-full w-1/4 text-center select-none font-semibold">TEAM</div>
                            <div className="h-full w-3/4 border-l-2 border-r-2 border-slate-300 text-center select-none font-semibold">MEMBER</div>
                            <div className="h-full w-1/4 text-center select-none font-semibold">POINT</div>
                        </div>
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div className="h-full w-full flex flex-row bg-gray-50 rounded-md border border-slate-400 shadow-md" key={i}>
                                <div className="h-full w-1/4" key={i}></div>
                                <div className="h-full w-3/4 border-l-2 border-r-2 border-slate-300" key={i}></div>
                                <div className="h-full w-1/4" key={i}></div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="h-[13%] md:h-1/5 w-full flex justify-end items-center px-2">
                    <button className="p-2 bg-gray-100 w-1/3 md:w-1/5 rounded-lg shadow-xl" onClick={handleContinue}>
                        <BoldText color={TEXT_COLOR.BLACK}>
                            終了
                        </BoldText>
                    </button>
                </div>
            </div>
        </main>
    )
}
