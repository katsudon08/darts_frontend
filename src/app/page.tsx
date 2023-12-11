'use client'

import { useState, useEffect, ChangeEvent, MouseEvent } from 'react'
import { useRouter } from 'next/navigation'
import {
    getLocalStrage,
    initLocalStrage,
    setLocalStrage
} from '@/utils/localstrage'
import { KEYS } from '@/types/localstrage'
import { URLS } from '@/types/urls'
import { color, theme } from '@/types/theme'

export default function Home() {
    const router = useRouter()
    const [text, setText] = useState('')

    useEffect(() => {
        initLocalStrage(KEYS.USER_NAME)
        setText(getLocalStrage(KEYS.USER_NAME))
    }, [])

    const handleClick = () => {
        setLocalStrage(KEYS.USER_NAME, text)
        router.push(URLS.ROOM_SETTING)
    }

    return (
        <main>
            <div
                className={
                    theme.background.main +
                    theme.padding.top +
                    color.background.main
                }
                onClick={handleClick}
            >
                <div
                    className={
                        theme.background.col + theme.padding.top + ' h-60 '
                    }
                >
                    <input
                        type="text"
                        className={theme.input.text}
                        value={text}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setText(e.target.value)
                        }
                        onClick={(e: MouseEvent<HTMLInputElement>) =>
                            e.stopPropagation()
                        }
                    />
                    <h1 className={theme.text.main}>タップしてスタート</h1>
                </div>
            </div>
        </main>
    )
}
