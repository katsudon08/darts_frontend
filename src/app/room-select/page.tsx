"use client"

import BoldText from "@/components/BoldText"
import ModalWindow from "@/components/ModalWindow"
import PopUp from "@/components/PopUp"
import { TEXT_COLOR } from "@/types/color"
import { HTTP_KEYS } from "@/types/http"
import { STRAGE_KEYS } from "@/types/localstrage"
import { ROOM_SELECT } from "@/types/room-select"
import { URLS } from "@/types/urls"
import { generateRandomString } from "@/utils/generateRandomString"
import { generateUUID } from "@/utils/generateUUID"
import { initLocalStrage, setLocalStrage } from "@/utils/localstrage"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function () {
    const router = useRouter()
    const [isModalWindowDisplay, setIsModalWindowDisplay] = useState(false)
    const [isCreatePopUpWindow, setIsCreatePopUpWindow] = useState(false)
    const [isJoinPopUpWindow, setIsJoinPopUpWindow] = useState(false)
    // 即時関数にすることで子コンポーネントに渡した際の無限レンダリングを防いでいる
    const hideModalWindowDisplay = (): void => setIsModalWindowDisplay(false)

    const createTeamCode = async () => {
        const response = await fetch(URLS.API + HTTP_KEYS.TEAM_CODE_CREATE, {
            method: "POST",
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                teamcode: generateRandomString()
            })
        })

        if (!response.ok) {
            throw new Error("チームコードの作成に失敗しました.")
        }

        const teamcode = await response.json()
        console.log("page_teamcode:", teamcode)

        if (Boolean(teamcode)) {
            setLocalStrage(STRAGE_KEYS.TEAM_CODE, teamcode)
            router.push(URLS.ROOM_SETTING)
        } else {
            // TODO: エラー表示
            setIsCreatePopUpWindow(true)
        }
    }

    const joinTeamCode = async (data: string) => {
        console.log("data", data)

        const response = await fetch(URLS.API + HTTP_KEYS.TEAM_CODE_JOIN, {
            method: "POST",
            cache: "no-store",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                teamcode: data
            })
        })

        if (!response.ok) {
            throw new Error("チームへの参加に失敗しました.")
        }

        const teamcode = await response.json()
        console.log("page_teamcode:", teamcode)

        if (Boolean(teamcode)) {
            setLocalStrage(STRAGE_KEYS.TEAM_CODE, teamcode)
            router.push(URLS.ROOM_SETTING)
        } else {
            // TODO: エラー表示
            setIsJoinPopUpWindow(true)
        }
    }

    useEffect(() => {
        initLocalStrage(STRAGE_KEYS.ROOM_SELECT)
        initLocalStrage(STRAGE_KEYS.USER_ID)

        setLocalStrage(STRAGE_KEYS.USER_ID, generateUUID())
    }, [])

    const handleHold = () => {
        setLocalStrage(STRAGE_KEYS.ROOM_SELECT, ROOM_SELECT.HOLD)
        createTeamCode()
    }

    const handleJoin = () => {
        setLocalStrage(STRAGE_KEYS.ROOM_SELECT, ROOM_SELECT.JOIN)
        setIsModalWindowDisplay(true)
    }

    return (
        <main className="flex h-screen justify-center items-center py-10 bg-gradient-to-b from-blue-400 to-purple-800">
            {isModalWindowDisplay && <ModalWindow hideModalWindowDisplay={hideModalWindowDisplay} clickEvent={joinTeamCode} />}
            {isCreatePopUpWindow &&
                <PopUp>
                    チームの作成に失敗しました
                </PopUp>
            }
            {isJoinPopUpWindow &&
                <PopUp>
                    チームへの参加に失敗しました
                </PopUp>
            }
            <div className="flex flex-col justify-between h-3/5 w-4/5 md:w-3/5">
                <button
                    className="h-1/3 w-full rounded-md bg-white shadow-md"
                    onClick={handleHold}
                >
                    <BoldText color={TEXT_COLOR.BLACK}>
                        ルームを作成
                    </BoldText>
                </button>
                <button
                    className="h-1/3 w-full rounded-md bg-white shadow-md"
                    onClick={handleJoin}
                >
                    <BoldText color={TEXT_COLOR.BLACK}>
                        ルームに参加
                    </BoldText>
                </button>
            </div>
        </main>
    )
}