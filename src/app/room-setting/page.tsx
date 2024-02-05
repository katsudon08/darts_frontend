"use client"

import Text from "@/components/Text"
import { COLOR } from "@/types/color"
import { STRAGE_KEYS } from "@/types/localstrage"
import { ROOM_SELECT } from "@/types/room-select"
import { URLS } from "@/types/urls"
import { KEYS } from "@/types/websocket"
import { generateRandomString } from "@/utils/generateRandomString"
import { getLocalStrage, initLocalStrage, setLocalStrage } from "@/utils/localstrage"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import ReconnectingWebSocket from "reconnecting-websocket"

export default function () {
    const turnSocket = useRef<ReconnectingWebSocket>()
    const teamcodeSocket = useRef<ReconnectingWebSocket>()
    const usersSocket = useRef<ReconnectingWebSocket>()

    const router = useRouter()
    const [user, setUser] = useState("")
    const [users, setUsers] = useState<string[]>([])
    const [selectedTurn, setSelectedTurn] = useState(1)
    const [selectedGroup, setSelectedGroup] = useState(0)
    const [roomFlag, setRoomFlag] = useState(false)
    const [teamcode, setTeamcode] = useState("")

    useEffect(() => {
        // localstrageの初期化よりも先に走らせる
        turnSocket.current = new ReconnectingWebSocket(URLS.WEB_SOCKET + KEYS.TURN)
        teamcodeSocket.current = new ReconnectingWebSocket(URLS.WEB_SOCKET + KEYS.TEAM_CODE)
        usersSocket.current = new ReconnectingWebSocket(URLS.WEB_SOCKET + KEYS.USERS)
        // userリストの一覧取得
        usersSocket.current?.send("")
        if (getLocalStrage(STRAGE_KEYS.ROOM_SELECT) === ROOM_SELECT.HOLD) {
            teamcodeSocket?.current.send(generateRandomString())
        } else {
            teamcodeSocket.current.send("")
        }

        setRoomFlag(getLocalStrage(STRAGE_KEYS.ROOM_SELECT) === ROOM_SELECT.HOLD)
        setUser(getLocalStrage(STRAGE_KEYS.USER_NAME))

        initLocalStrage(STRAGE_KEYS.ROOM_SELECT)
        initLocalStrage(STRAGE_KEYS.TURN)
        initLocalStrage(STRAGE_KEYS.USER_NAME)

        turnSocket.current.onopen = () => {
            console.log("turn open")
        }

        turnSocket.current.onclose = () => {
            console.log("turn close")
        }

        turnSocket.current.onmessage = (e) => {
            console.log("turn:", e.data)

            setSelectedTurn(Number(e.data))
            setLocalStrage(STRAGE_KEYS.TURN, e.data)
        }

        teamcodeSocket.current.onopen = () => {
            console.log("teamcode open")
        }

        teamcodeSocket.current.onclose = () => {
            console.log("teamcode close")
        }

        teamcodeSocket.current.onmessage = (e) => {
            console.log("teamcode:", e.data)

            setTeamcode(e.data)
        }

        usersSocket.current.onopen = () => {
            console.log("users open")
        }

        usersSocket.current.onclose = () => {
            console.log("users close")
        }

        usersSocket.current.onmessage = (e) => {
            console.log("users:", e.data)
            // ユーザーの追加を行いたい
            setUsers(e.data.split(" "))
        }

        return () => {
            turnSocket.current?.close()
            usersSocket.current?.close()
        }
    }, [])

    const groups = ["1", "A", "B"]

    const handleSelectGroup = (num: number) => {
        setSelectedGroup(num)

        // usersSocketを送信
        if (user != "") usersSocket.current?.send(`${groups[num] != groups[0] ? `${groups[num]}:${user}` : `${user}`}`)
    }

    const handleSelectTurn = (num: number) => {
        // turnsocketを送信
        turnSocket.current?.send(String(num))
    }

    const handleFinish = () => {
        turnSocket.current?.close()
        usersSocket.current?.close()
        router.replace(URLS.HOME)
    }

    const handleContinue = () => {
        router.replace(URLS.GAME)
    }

    return (
        <main>
            <div className="flex h-screen justify-center items-center bg-gray-50">
                <div className="flex flex-col justify-between h-full w-full">
                    <div className="flex flex-row justify-between h-full py-5 pr-5">
                        <div className="flex justify-center h-full w-3/4 md:w-4/5">
                            <div className="flex flex-col justify-between space-y-1 h-full w-5/6">
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <div
                                        className="flex  bg-white w-full justify-center items-center rounded-xl border border-gray-300 h-full"
                                        key={i}
                                    >
                                        {users[i]}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col justify-between space-y-3 h-full w-1/4 md:w-1/5">
                            {groups.map((v, i) => (
                                <button
                                    className={
                                        selectedGroup === i
                                            ?
                                            "bg-slate-300 border border-slate-400 rounded-xl h-full mx-2 py-3"
                                            :
                                            "bg-white border border-slate-400 rounded-xl h-full mx-2 py-3"
                                    }
                                    key={i}
                                    onClick={() => handleSelectGroup(i)}
                                >
                                    <Text text={v} color={COLOR.BLACK} />
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col justify-between items-center h-full space-y-2 py-5 px-10">
                        {/* チームコード表示 */}
                        <div className="relative h-full w-full md:w-3/4 rounded-sm border-2 border-slate-400">
                            <div className="absolute top-0.5 left-1 -translate-y-2/3 bg-gray-50 px-2">
                                チームコード
                            </div>
                            <div className="flex justify-center items-center h-full w-full bg-gray-50">
                                <Text
                                    text={
                                        teamcode === ""
                                            ? "loading..."
                                            : teamcode
                                    }
                                    color={COLOR.BLACK}
                                />
                            </div>
                        </div>
                        <div className="flex justify-between md:px-10 px-2 md:space-x-10 space-x-4 h-full w-full md:w-3/4">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <button
                                    className={
                                        i + 1 === selectedTurn
                                            ?
                                            "bg-slate-300 border border-slate-400 h-full w-full rounded-xl"
                                            :
                                            "bg-white border border-slate-400 h-full w-full rounded-xl"
                                    }
                                    key={i}
                                    onClick={() => handleSelectTurn(i + 1)}
                                >
                                    <Text text={String(i + 1)} color={COLOR.BLACK} />
                                    <div className="select-none">ターン</div>
                                </button>
                            ))}
                        </div>
                        <div className="flex justify-center items-center h-full w-full">
                            <button className="bg-blue-600 py-2 px-8 rounded-md w-full md:w-1/4" onClick={handleFinish}>
                                <Text text="ゲーム終了" color={COLOR.WHITE} />
                            </button>
                        </div>
                        <div className="flex justify-center items-center h-full w-full">
                            {roomFlag &&
                                <button
                                    className="bg-blue-600 py-2 px-4 rounded-md w-full md:w-1/4"
                                    onClick={handleContinue}
                                >
                                    <Text text="ゲームスタート" color={COLOR.WHITE} />
                                </button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
