"use client"

import TEXT from "@/components/TEXT"
import { useState } from "react"

export default function () {
    const [isActive, setIsActive] = useState(true)

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
                                ? "flex justify-center items-center h-80 w-80 rounded-full bg-red-200 visible"
                                : "flex justify-center items-center h-80 w-80 invisible"
                        }
                    >
                        <div className="visible h-32 w-32 rounded-full bg-red-400"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
