"use client"

import BoldText from "@/components/BoldText"
import { URLS } from "@/types/urls"
import { useRouter } from "next/navigation"

export default function () {
    const router = useRouter()

    const strs = Array(6).fill("")

    const handleContinue = () => {
        router.replace(URLS.ROOM_SETTING)
    }

    return (
        <main className="flex h-screen justify-center items-center py-10 bg-lime-600">
            <div className="flex flex-col justify-between h-full w-full bg-red-100">
                <div className="flex flex-col md:flex-row h-4/5 w-full px-4 bg-blue-100">
                    <div className="flex flex-col justirfy-between h-full w-full bg-red-500">
                        <div className="flex justify-center h-full w-full items-center bg-green-500">among us</div>
                        <div className="flex justify-center h-full w-full items-center bg-green-600">among us</div>
                        <div className="flex justify-center h-full w-full items-center bg-green-700">among us</div>
                    </div>
                    <div className="flex flex-col justify-between h-full w-full space-y-1 bg-yellow-500">
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
                <div className="flex justify-center items-center h-1/5 w-full bg-slate-500">
                    <button className="p-2 rounded-md bg-white" onClick={handleContinue}>
                        <BoldText text="continue" />
                    </button>
                </div>
            </div>
        </main>
    )
}
