"use client"

import BoldText from "@/components/BoldText"
import DartsButton from "@/components/DartsButton"
import { TEXT_COLOR } from "@/types/color"
import { GameData, GameDisplayData, GameInitData } from "@/types/game"
import { STORAGE_KEYS } from "@/types/localstorage"
import { MARK } from "@/types/message"
import { URLS } from "@/types/urls"
import { SOCKET_KEYS } from "@/types/websocket"
import { getLocalStorage, initLocalStorage, setLocalStorage } from "@/utils/localstorage"
import { plusScore } from "@/utils/plusScore"
import { gameMessageToSplitLength } from "@/utils/receiveWebSocketMessage"
import { gameDisplaySocketInitMessage, gameDisplaySocketMessage, gameSocketInitMessage, gameSocketMessage } from "@/utils/sendWebSocketMessage"
import { useRouter } from "next/navigation"
import React, { useEffect, useRef, useState } from "react"
import ReconnectingWebSocket from "reconnecting-websocket"

export default function Game() {
    const gameSocket = useRef<ReconnectingWebSocket>()
    const gameDisplaySocket = useRef<ReconnectingWebSocket>()

    const router = useRouter()
    const [isActive, setIsActive] = useState(false)
    const [score, setScore] = useState(0)
    const [nowTurn, setNowTurn] = useState(1)
    const [times, setTimes] = useState(1)
    const [playable, setPlayable] = useState(true)
    const [displayUserName, setDisplayUserName] = useState("")
    const [textColor, setTextColor] = useState<TEXT_COLOR>(TEXT_COLOR.BLACK)
    const DARTS_SCORES = [20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5]
    const DARTS_DEGREE = 18

    const resetStrageScore = () => {
        setLocalStorage(STORAGE_KEYS.MY_SCORE, "0")
        setLocalStorage(STORAGE_KEYS.RED_GROUP_SCORE, "")
        setLocalStorage(STORAGE_KEYS.BLUE_GROUP_SCORE, "")
        setLocalStorage(STORAGE_KEYS.GREEN_GROUP_SCORE, "")
    }

    const selectColor = (groupNum: string): TEXT_COLOR => {
        switch (groupNum) {
            case "0":
                return TEXT_COLOR.RED
            case "1":
                return TEXT_COLOR.BLUE
            case "2":
                return TEXT_COLOR.GREEN
            default:
                return TEXT_COLOR.BLACK
        }
    }

    useEffect(() => {
        initLocalStorage(STORAGE_KEYS.TEAM_CODE)
        initLocalStorage(STORAGE_KEYS.TURN)
        initLocalStorage(STORAGE_KEYS.USERS)
        initLocalStorage(STORAGE_KEYS.USER_ID)
        initLocalStorage(STORAGE_KEYS.USER_NAME)
        initLocalStorage(STORAGE_KEYS.USER_GROUP)
        initLocalStorage(STORAGE_KEYS.MY_SCORE)
        initLocalStorage(STORAGE_KEYS.RED_GROUP_SCORE)
        initLocalStorage(STORAGE_KEYS.BLUE_GROUP_SCORE)
        initLocalStorage(STORAGE_KEYS.GREEN_GROUP_SCORE)
        resetStrageScore()

        gameSocket.current = new ReconnectingWebSocket(URLS.WEB_SOCKET + SOCKET_KEYS.GAME)
        gameDisplaySocket.current = new ReconnectingWebSocket(URLS.WEB_SOCKET + SOCKET_KEYS.GAME_DISPLAY)

        gameDisplaySocket.current.onopen = () => {
            console.log("game-display open")
        }
        gameDisplaySocket.current.onclose = () => {
            console.log("game-display close")
        }
        gameDisplaySocket.current.onmessage = (e) => {
            console.log("display", e.data)
            const [groupNum, userName, userScore] = (e.data).split(MARK.CONNECTION)
            setTextColor(selectColor(groupNum))
            setDisplayUserName(userName)
            setScore(userScore)
        }

        gameSocket.current.onopen = () => {
            console.log("game open")

            // groupNum userName score
            const gameDisplayData: GameDisplayData = {
                teamcode: getLocalStorage(STORAGE_KEYS.TEAM_CODE),
                groupNum: getLocalStorage(STORAGE_KEYS.USER_GROUP),
                userName: getLocalStorage(STORAGE_KEYS.USER_NAME),
                score: 0
            }
            gameDisplaySocket.current?.send(gameDisplaySocketInitMessage(gameDisplayData))

            const gameData: GameInitData = {
                teamcode: getLocalStorage(STORAGE_KEYS.TEAM_CODE),
                groupNum: getLocalStorage(STORAGE_KEYS.USER_GROUP),
                userName: getLocalStorage(STORAGE_KEYS.USER_NAME),
                userId: getLocalStorage(STORAGE_KEYS.USER_ID),
            }
            gameSocket.current?.send(gameSocketInitMessage(gameData))
        }

        gameSocket.current.onclose = () => {
            console.log("game close")
        }

        gameSocket.current.onmessage = (e) => {
            console.log(getLocalStorage(STORAGE_KEYS.USER_ID))
            console.log(e.data)
            const msg = e.data
            const len = gameMessageToSplitLength(msg)

            const plusMyScore = (score: string) => {
                plusScore(STORAGE_KEYS.MY_SCORE, Number(score))
            }

            const transferPlayableToNextUser = (msg: string) => {
                const [groupNum, userId, nextUserId, score, isLast] = msg.split(MARK.CONNECTION)
                const myUserId = getLocalStorage(STORAGE_KEYS.USER_ID)

                console.log(groupNum)
                console.log(userId)
                console.log(nextUserId)
                console.log(score)
                console.log(isLast)
                console.log(myUserId === userId)

                if (myUserId === nextUserId) {
                    console.log("debag 1")
                    setPlayable(true)
                    myUserId === userId && plusMyScore(score)
                    const gameDisplayData: GameDisplayData = {
                        teamcode: getLocalStorage(STORAGE_KEYS.TEAM_CODE),
                        groupNum: getLocalStorage(STORAGE_KEYS.USER_GROUP),
                        userName: getLocalStorage(STORAGE_KEYS.USER_NAME),
                        score: 0
                    }
                    gameDisplaySocket.current?.send(gameDisplaySocketMessage(gameDisplayData))
                } else if (myUserId === userId) {
                    console.log("debag 2")
                    setPlayable(false)
                    plusMyScore(score)
                } else {
                    console.log("debag 3")
                    setPlayable(false)
                }

                if (isLast) {
                    console.log("nowturn:", nowTurn, "turn:", getLocalStorage(STORAGE_KEYS.TURN))

                    setNowTurn((prevTurn) => {
                        if (Boolean(isLast) && prevTurn + 1 > Number(getLocalStorage(STORAGE_KEYS.TURN))) {
                            router.replace(URLS.RESULT);
                            return prevTurn;
                        }
                        return prevTurn + 1;
                    })
                }
            }

            const isMyUserId = (userId: string) => {
                const myUserId = getLocalStorage(STORAGE_KEYS.USER_ID)
                if (userId === myUserId) {
                    console.log("playable")
                    setPlayable(true)
                } else {
                    console.log("not playable")
                    setPlayable(false)
                }
            }

            // TODO: 次のユーザーに操作を移す。もし、最後のプレイヤーならリザルト画面へと進む

            console.log("nowturn", nowTurn)
            console.log("limitedturn", getLocalStorage(STORAGE_KEYS.TURN))

            if (len > 1) {
                // TODO: 点数加算の処理と操作権移行の処理
                transferPlayableToNextUser(msg)
            } else {
                console.log("msg:", msg)
                isMyUserId(msg)
            }
        }

        return () => {
            gameSocket.current?.close()
            gameDisplaySocket.current?.close()
        }
    }, [])

    const handleScore = (e: React.MouseEvent, num: number) => {
        // TODO: 誰が何点上欄を押しているのかわかるようにwebsocketに変更する
        const gameDisplayData: GameDisplayData = {
            teamcode: getLocalStorage(STORAGE_KEYS.TEAM_CODE),
            groupNum: getLocalStorage(STORAGE_KEYS.USER_GROUP),
            userName: getLocalStorage(STORAGE_KEYS.USER_NAME),
            score: num * times
        }
        isActive && gameDisplaySocket.current?.send(gameDisplaySocketMessage(gameDisplayData))
        setIsActive(!isActive)
        e.stopPropagation()
    }

    const handleTimes = (num: number) => {
        const gameDisplayData: GameDisplayData = {
            teamcode: getLocalStorage(STORAGE_KEYS.TEAM_CODE),
            groupNum: getLocalStorage(STORAGE_KEYS.USER_GROUP),
            userName: getLocalStorage(STORAGE_KEYS.USER_NAME),
            score: num * (score / times)
        }
        setTimes(num)
        gameDisplaySocket.current?.send(gameDisplaySocketMessage(gameDisplayData))
    }

    const handleDarts = (e: React.MouseEvent) => {
        isActive && setScore(50)
        setIsActive(!isActive)
        e.stopPropagation()
    }

    const handleContinue = () => {
        setTimes(1)
        const gameData: GameData = {
            teamcode: getLocalStorage(STORAGE_KEYS.TEAM_CODE),
            groupNum: getLocalStorage(STORAGE_KEYS.USER_GROUP),
            userName: getLocalStorage(STORAGE_KEYS.USER_NAME),
            userId: getLocalStorage(STORAGE_KEYS.USER_ID),
            score: score
        }
        const msg = gameSocketMessage(gameData)
        gameSocket.current?.send(msg)
    }

    const handleReset = () => {
        setScore(0)
        setTimes(1)
        setIsActive(false)
    }

    return (
        <main>
            <div className="flex h-screen justify-center items-center bg-gray-50">
                <div className="flex flex-col h-full w-full">
                    <div className="flex flex-col h-2/5 w-full">
                        <div className="flex flex-row items-center h-3/5 w-full">
                            <div className="h-fit w-2/5 flex justify-center scale-150">
                                <div className="w-fit flex justify-center items-center p-2 border border-slate-300 bg-white rounded-md shadow-lg">
                                    <div className=" scale-125 mr-1">
                                        <BoldText color={TEXT_COLOR.BLACK}>
                                            {String(nowTurn)}
                                        </BoldText>
                                    </div>
                                    <div className="font-semibold select-none pt-3">ターン</div>
                                </div>
                            </div>
                            <div className="w-3/5 px-2">
                                <BoldText color={textColor}>
                                    {displayUserName.length > 6 ? `${displayUserName.substring(0, 6)}...` : displayUserName}
                                </BoldText>
                            </div>
                        </div>
                        <div className="flex flex-row justify-between space-x-2 md:space-x-4 px-2 md:px-4 h-1/3 md:h-2/5 w-full">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <button
                                    className={
                                        times === (i + 1) ?
                                            "h-full w-full rounded-lg bg-blue-500 border border-blue-400 shadow-md"
                                            :
                                            "h-full w-full rounded-lg bg-white border border-blue-400 shadow-md"
                                    }
                                    onClick={() => handleTimes(i + 1)}
                                    key={i}
                                >
                                    <BoldText color={
                                        times === (i + 1) ?
                                            TEXT_COLOR.WHITE
                                            :
                                            TEXT_COLOR.BLUE
                                    }>
                                        {"x" + String(i + 1)}
                                    </BoldText>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-center items-center h-3/5 w-full">
                        <div className="absolute h-3/5 w-full">
                            <div className="flex flex-col justify-between h-full w-full">
                                <div className="flex flex-row justify-end px-2 md:p-4">
                                    <div className="h-full w-fit flex justify-center items-center p-2 rounded-lg bg-white border border-slate-300 shadow-xl">
                                        <BoldText color={TEXT_COLOR.BLACK}>
                                            {String(score) + "点"}
                                        </BoldText>
                                    </div>
                                </div>
                                <div className="flex flex-row justify-between pb-2 px-3 md:px-6">
                                    <button
                                        className="flex justify-center items-center p-1 rounded-full border-2 border-black shadow-md"
                                        onClick={handleReset}
                                    >
                                        <img
                                            width="50"
                                            height="50"
                                            src="https://img.icons8.com/ios/50/u-turn-to-left.png"
                                            alt="u-turn-to-left"
                                            className="scale-[65%]"
                                        />
                                    </button>
                                    <button
                                        className="flex justify-center items-center p-1 rounded-full border-2 border-black shadow-md"
                                        onClick={handleContinue}
                                    >
                                        <img
                                            width="50"
                                            height="50"
                                            src="https://img.icons8.com/ios/50/forward--v1.png"
                                            alt="forward--v1"
                                            className="scale-[80%]"
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div
                            className={
                                isActive
                                    ? "flex flex-col justify-center items-center h-80 w-80 rounded-full bg-blue-400 shadow-xl visible"
                                    : "flex flex-col justify-center items-center h-80 w-80 invisible"
                            }
                        >
                            {/* ダーツ板のUI */}
                            <div className="relative translate-y-1/4 h-5 w-5">
                                {Array.from({ length: 20 }).map((_, i) => (
                                    <DartsButton rotate={i * DARTS_DEGREE} dartsScore={DARTS_SCORES[i]} clickEvent={handleScore} key={i}>
                                        <BoldText color={TEXT_COLOR.WHITE} key={i}>
                                            {DARTS_SCORES[i]}
                                        </BoldText>
                                    </DartsButton>
                                ))}
                            </div>

                            <div
                                className="absolute flex justify-center items-center visible h-32 w-32 rounded-full bg-red-500 shadow-lg cursor-pointer"
                                onClick={(e) => handleDarts(e)}
                            >
                                <div className="visible bg-slate-800 rounded-full h-1/2 w-1/2" />
                            </div>
                        </div>
                    </div>
                </div>
                {/* 画面操作の無効化 */}
                {!playable && <div className="absolute h-screen w-full z-50" />}
            </div>
        </main>
    )
}
