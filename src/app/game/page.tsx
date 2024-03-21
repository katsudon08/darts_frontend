"use client"

import BoldText from "@/components/BoldText"
import DartsButton from "@/components/DartsButton"
import { TEXT_COLOR } from "@/types/color"
import { GameData, GameInitData } from "@/types/game"
import { STRAGE_KEYS } from "@/types/localstrage"
import { MARK } from "@/types/message"
import { URLS } from "@/types/urls"
import { SOCKET_KEYS } from "@/types/websocket"
import { getLocalStrage, initLocalStrage, setLocalStrage } from "@/utils/localstrage"
import { gameMessageToSplitLength } from "@/utils/receiveWebSocketMessage"
import { gameSocketInitMessage, gameSocketMessage } from "@/utils/sendWebSocketMessage"
import { useRouter } from "next/navigation"
import React, { useEffect, useRef, useState } from "react"
import ReconnectingWebSocket from "reconnecting-websocket"

export default function () {
    const gameScoket = useRef<ReconnectingWebSocket>()
    const gameDisplaySocket = useRef<ReconnectingWebSocket>()

    const router = useRouter()
    const [isActive, setIsActive] = useState(false)
    const [score, setScore] = useState(0)
    const [nowTurn, setNowTurn] = useState(1)
    const [times, setTimes] = useState(1)
    const [playable, setPlayable] = useState(false)
    const DARTS_SCORES = [20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5]
    const DARTS_DEGREE = 18

    const resetStrageScore = () => {
        setLocalStrage(STRAGE_KEYS.MY_SCORE, "0")
        setLocalStrage(STRAGE_KEYS.RED_GROUP_SCORE, "0")
        setLocalStrage(STRAGE_KEYS.BLUE_GROUP_SCORE, "0")
        setLocalStrage(STRAGE_KEYS.GREEN_GROUP_SCORE, "0")
    }

    useEffect(() => {
        initLocalStrage(STRAGE_KEYS.TEAM_CODE)
        initLocalStrage(STRAGE_KEYS.TURN)
        initLocalStrage(STRAGE_KEYS.USERS)
        initLocalStrage(STRAGE_KEYS.USER_ID)
        initLocalStrage(STRAGE_KEYS.USER_NAME)
        initLocalStrage(STRAGE_KEYS.USER_GROUP)
        initLocalStrage(STRAGE_KEYS.MY_SCORE)
        initLocalStrage(STRAGE_KEYS.RED_GROUP_SCORE)
        initLocalStrage(STRAGE_KEYS.BLUE_GROUP_SCORE)
        initLocalStrage(STRAGE_KEYS.GREEN_GROUP_SCORE)
        setLocalStrage(STRAGE_KEYS.TURN, "1")
        resetStrageScore()

        gameScoket.current = new ReconnectingWebSocket(URLS.WEB_SOCKET + SOCKET_KEYS.GAME)
        gameDisplaySocket.current = new ReconnectingWebSocket(URLS.WEB_SOCKET + SOCKET_KEYS.GAME_DISPLAY)

        gameScoket.current.onopen = () => {
            console.log("game open")
            const gameData: GameInitData = {
                teamcode: getLocalStrage(STRAGE_KEYS.TEAM_CODE),
                groupNum: getLocalStrage(STRAGE_KEYS.USER_GROUP),
                userName: getLocalStrage(STRAGE_KEYS.USER_NAME),
                userId: getLocalStrage(STRAGE_KEYS.USER_ID),
            }
            const msg = gameSocketInitMessage(gameData)
            gameScoket.current?.send(msg)
        }

        gameScoket.current.onclose = () => {
            console.log("game close")
        }

        gameScoket.current.onmessage = (e) => {
            console.log(getLocalStrage(STRAGE_KEYS.USER_ID))
            console.log(e.data)
            const msg = e.data
            const len = gameMessageToSplitLength(msg)

            const plusScore = (key: STRAGE_KEYS, score: number) => {
                const strageScore = Number(getLocalStrage(key))
                const newScore = strageScore + score
                setLocalStrage(key, String(newScore))
            }

            const plusMyScore = (score: string) => {
                plusScore(STRAGE_KEYS.MY_SCORE, Number(score))
            }

            const plusGroupScore = (groupNum: string, score: string) => {
                switch (groupNum) {
                    case "0":
                        plusScore(STRAGE_KEYS.RED_GROUP_SCORE, Number(score))
                        break
                    case "1":
                        plusScore(STRAGE_KEYS.BLUE_GROUP_SCORE, Number(score))
                        break
                    case "2":
                        plusScore(STRAGE_KEYS.GREEN_GROUP_SCORE, Number(score))
                        break
                }
            }

            const transferPlayableToNextUser = (msg: string) => {
                const [groupNum, userId, nextUserId, score, isLast] = msg.split(MARK.CONNECTION)
                const myUserId = getLocalStrage(STRAGE_KEYS.USER_ID)

                console.log(groupNum)
                console.log(userId)
                console.log(nextUserId)
                console.log(score)
                console.log(isLast)
                console.log(myUserId===userId)

                if (myUserId === userId) {
                    console.log("debag 1")
                    setPlayable(false)
                    plusMyScore(score)
                    plusGroupScore(groupNum, score)
                } else if (myUserId === nextUserId) {
                    console.log("debag 2")
                    setPlayable(false)
                } else {
                    console.log("debag 3")
                    setPlayable(false)
                }

                if (Boolean(isLast) && nowTurn >= Number(getLocalStrage(STRAGE_KEYS.TURN))) {
                    router.replace(URLS.RESULT)
                } else {
                    setNowTurn(nowTurn + 1)
                }
            }

            const isMyUserId = (userId: string) => {
                const myUserId = getLocalStrage(STRAGE_KEYS.USER_ID)
                if (userId === myUserId) {
                    setPlayable(true)
                } else {
                    setPlayable(false)
                }
            }

            // TODO: 次のユーザーに操作を移す。もし、最後のプレイヤーならリザルト画面へと進む

            console.log("nowturn", nowTurn)
            console.log("limitedturn", getLocalStrage(STRAGE_KEYS.TURN))

            if (len > 1) {
                // TODO: 点数加算の処理と操作権移行の処理
                transferPlayableToNextUser(msg)
            } else {
                isMyUserId(msg[0])
            }
        }

        gameDisplaySocket.current.onopen = () => {
            console.log("game-display open")
        }
        gameDisplaySocket.current.onclose = () => {
            console.log("game-display close")
        }
        gameDisplaySocket.current.onmessage = (e) => {
            console.log(e.data)
        }

        return () => {
            gameScoket.current?.close()
        }
    }, [])

    const handleScore = (e: React.MouseEvent, num: number) => {
        // TODO: 誰が何点上欄を押しているのかわかるようにwebsocketに変更する
        isActive && setScore(num * times)
        setIsActive(!isActive)
        e.stopPropagation()
    }

    const handleTimes = (num: number) => {
        setTimes(num)
    }

    const handleDarts = (e: React.MouseEvent) => {
        isActive && setScore(50)
        setIsActive(!isActive)
        e.stopPropagation()
    }

    const handleContinue = () => {
        const gameData: GameData = {
            teamcode: getLocalStrage(STRAGE_KEYS.TEAM_CODE),
            groupNum: getLocalStrage(STRAGE_KEYS.USER_GROUP),
            userName: getLocalStrage(STRAGE_KEYS.USER_NAME),
            userId: getLocalStrage(STRAGE_KEYS.USER_ID),
            score: score
        }
        const msg = gameSocketMessage(gameData)
        gameScoket.current?.send(msg)
    }

    const handleReset = () => {
        setScore(0)
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
                                <BoldText color={TEXT_COLOR.BLACK}>
                                    {"まつばらあきひこ".length > 6 ? "まつばらあき..." : "まつばらあき"}
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
                {playable && <div className="absolute h-screen w-full z-50" />}
            </div>
        </main>
    )
}
