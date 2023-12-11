"use client"

import { URLS } from "@/types/urls"
import { useRouter } from "next/navigation"

export default function () {
    const router = useRouter()

    const handleClick = () => {
        console.log(URLS.GAME)
        // router.push(URLS.GAME)
    }

    return (
        <main>
            <div className="flex min-h-screen justify-center items-center pt-10 bg-lime-600">
                <div className="flex flex-col justify-between pt-10"></div>
            </div>
        </main>
    )
}
