'use client'

import { URLS } from '@/types/urls'
import { useRouter } from 'next/navigation'

export default function () {
    const router = useRouter()

    const handleClick = () => {
        router.push(URLS.GAME)
    }

    return (
        <main>
            <button onClick={handleClick}>next</button>
        </main>
    )
}
