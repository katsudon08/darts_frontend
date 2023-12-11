"use client"

import { color, theme } from "@/types/theme"
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
            <div className={theme.background.main + color.background.main}>
                <div className={theme.background.col}></div>
            </div>
        </main>
    )
}
