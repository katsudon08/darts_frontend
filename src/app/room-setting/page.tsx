'use client'

import { useRouter } from "next/navigation";

export default function() {
    const router = useRouter()

    const handleClick = () => {
        router.push('/game')
    }

    return (
        <main>
            <button onClick={handleClick}>next</button>
        </main>
    );
}