"use client"

import BoldText from "@/components/BoldText"
import PopUp from "@/components/PopUp"
import User from "@/components/User"
import { TEXT_COLOR } from "@/types/color"
import { STORAGE_KEYS } from "@/types/localstorage"
import { ROOM_SELECT } from "@/types/room-select"
import { URLS } from "@/types/urls"
import { UserData } from "@/types/user"
import { SOCKET_KEYS } from "@/types/websocket"
import { createMessageFromUsers } from "@/utils/createMessageFromUsers"
import { getLocalStorage, initLocalStorage, setLocalStorage } from "@/utils/localstorage"
import { changeUsersMessageToUsersData } from "@/utils/receiveWebSocketMessage"
import { deleteUserData, getTurnData, getUsersData, turnSocketMessage, usersSocketMessage } from "@/utils/sendWebSocketMessage"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import ReconnectingWebSocket from "reconnecting-websocket"

export default function RoomSetting() {
    const turnSocket = useRef<ReconnectingWebSocket>()
    const usersSocket = useRef<ReconnectingWebSocket>()
    const transitionSocket = useRef<ReconnectingWebSocket>()

    const router = useRouter()
    const [user, setUser] = useState("")
    const [users, setUsers] = useState<UserData[]>([])
    const [selectedTurn, setSelectedTurn] = useState<number>()
    const [selectedGroupNumber, setSelectedGroupNumber] = useState<number>()
    const [roomFlag, setRoomFlag] = useState(false)
    const [teamcode, setTeamcode] = useState("")
    const [isPopUpWindow, setIsPopUpWindow] = useState(false)

    const groups = ["redButton", "blueButton", "greenButton"]
    const selectedGroups = ["selectedRedButton", "selectedBlueButton", "selectedGreenButton"]

    const handleDeleteUser = () => {
        usersSocket.current?.send(deleteUserData(getLocalStorage(STORAGE_KEYS.TEAM_CODE)))
    }

    useEffect(() => {
        initLocalStorage(STORAGE_KEYS.ROOM_SELECT)
        initLocalStorage(STORAGE_KEYS.TURN)
        initLocalStorage(STORAGE_KEYS.USER_NAME)
        initLocalStorage(STORAGE_KEYS.USER_GROUP)
        initLocalStorage(STORAGE_KEYS.USERS)

        setLocalStorage(STORAGE_KEYS.TURN, "1")
        setRoomFlag(getLocalStorage(STORAGE_KEYS.ROOM_SELECT) === ROOM_SELECT.HOLD)
        setTeamcode(getLocalStorage(STORAGE_KEYS.TEAM_CODE))
        setUser(getLocalStorage(STORAGE_KEYS.USER_NAME))

        // localstrageの初期化よりも先に走らせる
        turnSocket.current = new ReconnectingWebSocket(URLS.WEB_SOCKET + SOCKET_KEYS.TURN)
        usersSocket.current = new ReconnectingWebSocket(URLS.WEB_SOCKET + SOCKET_KEYS.USERS)
        transitionSocket.current = new ReconnectingWebSocket(URLS.WEB_SOCKET + SOCKET_KEYS.TRANSITION)
        // userリストの一覧取得
        usersSocket.current?.send("")

        turnSocket.current.onopen = () => {
            console.log("turn open")
            turnSocket.current?.send(getTurnData(getLocalStorage(STORAGE_KEYS.TEAM_CODE)))
        }

        turnSocket.current.onclose = () => {
            console.log("turn close")
        }

        turnSocket.current.onmessage = (e) => {
            console.log("turn:", e.data)

            const tmp = (e.data === "") ? "1" : e.data
            setSelectedTurn(Number(tmp))
            setLocalStorage(STORAGE_KEYS.TURN, e.data)
        }

        usersSocket.current.onopen = () => {
            console.log("users open")
            setSelectedGroupNumber(Number(getLocalStorage(STORAGE_KEYS.USER_GROUP)))
            usersSocket.current?.send(usersSocketMessage(getLocalStorage(STORAGE_KEYS.TEAM_CODE), Number(getLocalStorage(STORAGE_KEYS.USER_GROUP)), getLocalStorage(STORAGE_KEYS.USER_NAME)))
            usersSocket.current?.send(getUsersData(getLocalStorage(STORAGE_KEYS.TEAM_CODE)))
        }

        usersSocket.current.onclose = () => {
            console.log("users close")
        }

        usersSocket.current.onmessage = (e) => {
            console.log("users:", e.data)

            // ユーザーの追加を行いたい
            const usersData = changeUsersMessageToUsersData(e.data)
            console.log("usersData:", usersData)
            console.log("boolean:", Boolean(usersData))

            if (usersData) {
                setUsers(usersData)
                setLocalStorage(STORAGE_KEYS.USERS, createMessageFromUsers(usersData))
            } else {
                setIsPopUpWindow(true)
            }
        }

        transitionSocket.current.onopen = () => {
            console.log("transition open")
            transitionSocket.current?.send(`${getLocalStorage(STORAGE_KEYS.TEAM_CODE)} `)
        }

        transitionSocket.current.onclose = () => {
            console.log("transition close")
        }

        transitionSocket.current.onmessage = () => {
            console.log("transition")
            handleDeleteUser()
            router.replace(URLS.GAME)
        }

        return () => {
            turnSocket.current?.close()
            usersSocket.current?.close()
            transitionSocket.current?.close()
        }
    }, [])

    useEffect(() => {
        window.addEventListener("beforeunload", handleDeleteUser)

        return () => {
            window.removeEventListener("beforeunload", handleDeleteUser)
        }
    }, [handleDeleteUser])

    const handleSelectGroup = (num: number) => {
        setSelectedGroupNumber(num)
        setLocalStorage(STORAGE_KEYS.USER_GROUP, String(num))

        // usersSocketを送信
        usersSocket.current?.send(usersSocketMessage(teamcode, num, user))
    }

    const handleSelectTurn = (num: number) => {
        // turnsocketを送信
        turnSocket.current?.send(turnSocketMessage(teamcode, num))
    }

    const handleFinish = () => {
        handleDeleteUser()
        turnSocket.current?.close()
        usersSocket.current?.close()
        transitionSocket.current?.close()
        router.replace(URLS.HOME)
    }

    const handleContinue = () => {
        transitionSocket.current?.send(teamcode)
    }

    return (
        <main className="flex h-screen justify-center items-center bg-gray-50">
            {isPopUpWindow &&
                <PopUp>
                    チーム人数が上限を超えました
                </PopUp>
            }
            <div className="flex flex-col justify-between h-full w-full">
                <div className="flex flex-row justify-between h-full py-5 pr-5">
                    <div className="flex justify-center h-full w-3/4 md:w-4/5">
                        <div className="flex flex-col justify-between space-y-1 h-full w-5/6">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <User user={users[i]} key={i} />
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col justify-between space-y-3 h-full w-1/4 md:w-1/5">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <button
                                className={
                                    selectedGroupNumber === i ? selectedGroups[i] : groups[i]
                                }
                                key={i}
                                onClick={() => handleSelectGroup(i)}
                            />
                        ))}
                    </div>
                </div>
                <div className="flex flex-col justify-between items-center h-full py-5 px-10">
                    <div className="flex flex-col justify-between items-center h-full w-full py-2 md:py-1 space-y-2">
                        {/* チームコード表示 */}
                        <div className="relative h-full w-full md:w-3/4 rounded-sm border-2 border-slate-400 shadow-md">
                            <div className="absolute top-0.5 left-1 -translate-y-2/3 bg-gray-50 px-2 font-semibold">
                                チームコード
                            </div>
                            <div className="flex justify-center items-center h-full w-full bg-gray-50">
                                <BoldText color={TEXT_COLOR.BLACK}>
                                    {teamcode === "" ? "loading..." : teamcode}
                                </BoldText>
                            </div>
                        </div>
                        <div className="flex justify-between md:px-10 px-2 md:space-x-10 space-x-4 h-full w-full md:w-3/4">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <button
                                    className={
                                        i + 1 === selectedTurn
                                            ?
                                            "bg-slate-300 border border-slate-400 h-full w-full rounded-xl shadow-xl"
                                            :
                                            "bg-white border border-slate-400 h-full w-full rounded-xl shadow-xl"
                                    }
                                    key={i}
                                    onClick={() => handleSelectTurn(i + 1)}
                                >
                                    <BoldText color={TEXT_COLOR.BLACK}>
                                        {String(i + 1)}
                                    </BoldText>
                                    <div className="select-none">ターン</div>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col justify-between items-center h-full w-full">
                        <div className={
                            roomFlag ? "flex justify-center items-center h-full w-full" : "hidden"
                        }>
                            <button
                                className="bg-blue-600 py-2 px-4 rounded-md w-full md:w-1/4 shadow-xl"
                                onClick={handleContinue}
                            >
                                <BoldText color={TEXT_COLOR.WHITE}>
                                    ゲームスタート
                                </BoldText>
                            </button>
                        </div>
                        <div className="flex justify-center items-center h-full w-full">
                            <button
                                className="bg-blue-600 py-2 px-8 rounded-md w-full md:w-1/4 shadow-xl"
                                onClick={handleFinish}
                            >
                                <BoldText color={TEXT_COLOR.WHITE}>
                                    ゲーム終了
                                </BoldText>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
