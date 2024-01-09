"use client"

import TEXT from "@/components/TEXT"
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
    const groupSocket = useRef<ReconnectingWebSocket>()
    const turnSocket = useRef<ReconnectingWebSocket>()
    const usersSocket = useRef<ReconnectingWebSocket>()

    const router = useRouter()
    const [user, setUser] = useState("")
    const [users, setUsers] = useState<string[]>([])
    const [selectedTurn, setSelectedTurn] = useState(1)
    const [selectedGroup, setSelectedGroup] = useState(0)
    const [roomFlag, setRoomFlag] = useState(false)
    const [teamcode, setTeamcode] = useState("")

    useEffect(() => {
        initLocalStrage(STRAGE_KEYS.ROOM_SELECT)
        initLocalStrage(STRAGE_KEYS.TURN)
        initLocalStrage(STRAGE_KEYS.USER_NAME)
        setRoomFlag(getLocalStrage(STRAGE_KEYS.ROOM_SELECT) === ROOM_SELECT.HOLD)
        setTeamcode(generateRandomString())
        setUser(getLocalStrage(STRAGE_KEYS.USER_NAME))

        groupSocket.current = new ReconnectingWebSocket(URLS.WEB_SOCKET+KEYS.GROUP)
        turnSocket.current = new ReconnectingWebSocket(URLS.WEB_SOCKET+KEYS.TURN)
        usersSocket.current = new ReconnectingWebSocket(URLS.WEB_SOCKET+KEYS.USERS)

        groupSocket.current.onopen = () => {
            console.log("group open")
        }

        groupSocket.current.onclose = () => {
            console.log("group close")
        }

        groupSocket.current.onmessage = (e) => {
            console.log("group:", e.data)

            setSelectedGroup(Number(e.data))
        }

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
            groupSocket.current?.close()
            turnSocket.current?.close()
            usersSocket.current?.close()
        }
    }, [])

    const groups = ["1", "A", "B"]

    const handleSelectGroup = (num: number) => {
        // groupsocketを送信
        groupSocket.current?.send(String(num))
        usersSocket.current?.send("admin")
    }

    const handleSelectTurn = (num: number) => {
        // turnsocketを送信
        turnSocket.current?.send(String(num))
    }

    const handleFinish = () => {
        groupSocket.current?.close()
        turnSocket.current?.close()
        usersSocket.current?.close()
        router.replace(URLS.HOME)
    }

    const handleContinue = () => {
        router.replace(URLS.GAME)
    }

    return (
        <main>
            <div className="flex h-screen justify-center items-center  bg-lime-600">
                <div className="flex flex-col justify-between h-full w-full  bg-red-700">
                    <div className="flex flex-row justify-between h-full py-5">
                        <div className="flex justify-center bg-yellow-200 h-full w-4/5">
                            <div className="flex flex-col justify-between bg-yellow-500 space-y-1 h-full w-4/5">
                                {Array.from({length: 6}).map((_, i) => (
                                    <div
                                        className="flex  bg-white w-full justify-center items-center rounded-xl h-full"
                                        key={i}
                                    >
                                        {users[i]}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col justify-between space-y-2 bg-yellow-300 h-full w-1/5">
                            {groups.map((v, i) => (
                                <button
                                    className={
                                        selectedGroup === i
                                            ?
                                            "bg-slate-300 rounded-full h-full mx-2 py-3"
                                            :
                                            "bg-white rounded-full h-full mx-2 py-3"
                                    }
                                    key={i}
                                    onClick={() => handleSelectGroup(i)}
                                >
                                    <TEXT text={v} />
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col justify-between items-center h-full space-y-2 py-5 px-10 bg-blue-200">
                        <div className="relative h-full w-2/3 border-black border-2">
                            <div className="absolute top-0.5 left-1 -translate-y-2/3 bg-white px-2">
                                チームコード
                            </div>
                            <div className="flex justify-center items-center h-full w-full bg-white">
                                <TEXT
                                    text={
                                        teamcode === ""
                                            ? "loading..."
                                            : teamcode
                                    }
                                />
                            </div>
                        </div>
                        <div className="flex justify-between md:px-10 px-2 md:space-x-10 space-x-4  bg-green-400 h-full w-full">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <button
                                    className={
                                        i + 1 === selectedTurn
                                            ?
                                            "bg-red-400 h-full w-full rounded-xl"
                                            :
                                            "bg-red-300 h-full w-full rounded-xl"
                                    }
                                    key={i}
                                    onClick={() => handleSelectTurn(i + 1)}
                                >
                                    <TEXT text={String(i + 1)} />
                                    <div className="select-none">ターン</div>
                                </button>
                            ))}
                        </div>
                        <div className="flex justify-center items-center bg-green-400 h-full w-full">
                            <button className="bg-green-600 py-2 px-8  rounded-sm" onClick={handleFinish}>
                                <TEXT text="ゲーム終了" />
                            </button>
                        </div>
                        <div className="flex justify-center items-center bg-green-400 h-full w-full">
                            {roomFlag &&
                                <button
                                    className="bg-green-600 py-2 px-4  rounded-sm"
                                    onClick={handleContinue}
                                >
                                    <TEXT text="ゲームスタート" />
                                </button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
