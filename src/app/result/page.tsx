"use client"

import BoldText from "@/components/BoldText"
import ResultDisplay from "@/components/ResultDisplay"
import { TEXT_COLOR } from "@/types/color"
import { STORAGE_KEYS } from "@/types/localstorage"
import { MARK } from "@/types/message"
import { DisplayData, ResultData } from "@/types/result"
import { URLS } from "@/types/urls"
import { SOCKET_KEYS } from "@/types/websocket"
import { getLocalStorage, initLocalStorage } from "@/utils/localstorage"
import { plusScore } from "@/utils/plusScore"
import { resultSocketMessage } from "@/utils/sendWebSocketMessage"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import ReconnectingWebSocket from "reconnecting-websocket"

export default function Result() {
    const [groupScoreList, setGroupScoreList] = useState<string[]>(["", "", ""])
    const [diplayList, setDisplayList] = useState<DisplayData[]>([])

    const resultSocket = useRef<ReconnectingWebSocket>()
    const router = useRouter()

    const plusGroupScore = (groupNum: string, score: string) => {
        const updateGroupScore = (index: number, key: STORAGE_KEYS) => {
            plusScore(key, Number(score))
            setGroupScoreList((prevList) => {
                const newList = [...prevList]
                newList.splice(index, 1, getLocalStorage(key))
                console.log("newList:", newList)
                return newList
            })
        }

        switch (Number(groupNum)) {
            case 0:
                updateGroupScore(0, STORAGE_KEYS.RED_GROUP_SCORE)
                break
            case 1:
                updateGroupScore(1, STORAGE_KEYS.BLUE_GROUP_SCORE)
                break
            case 2:
                updateGroupScore(2, STORAGE_KEYS.GREEN_GROUP_SCORE)
                break
            default:
                console.log("failed")
        }
    }

    const sortByScore = () => {
        const compareNumbers = (a: DisplayData, b: DisplayData) => {
            return Number(b.score) - Number(a.score)
        }

        const tmpList = [...groupScoreList]
        console.log("tmpList:", tmpList)
        const displayData: DisplayData[] = [
            {
                groupNum: 0,
                score: tmpList[0]
            },
            {
                groupNum: 1,
                score: tmpList[1]
            },
            {
                groupNum: 2,
                score: tmpList[2]
            }
        ]
        displayData.sort(compareNumbers)

        console.log("displayData:", displayData)
        setDisplayList(displayData)
    }

    const handleContinue = () => {
        router.replace(URLS.ROOM_SETTING)
    }

    useEffect(() => {
        initLocalStorage(STORAGE_KEYS.USER_GROUP)
        initLocalStorage(STORAGE_KEYS.MY_SCORE)
        initLocalStorage(STORAGE_KEYS.RED_GROUP_SCORE)
        initLocalStorage(STORAGE_KEYS.BLUE_GROUP_SCORE)
        initLocalStorage(STORAGE_KEYS.GREEN_GROUP_SCORE)

        resultSocket.current = new ReconnectingWebSocket(URLS.WEB_SOCKET + SOCKET_KEYS.RESULT)

        resultSocket.current.onopen = () => {
            console.log("result open")
            const resultData: ResultData = {
                teamcode: getLocalStorage(STORAGE_KEYS.TEAM_CODE),
                groupNum: getLocalStorage(STORAGE_KEYS.USER_GROUP),
                score: getLocalStorage(STORAGE_KEYS.MY_SCORE)
            }
            resultSocket.current?.send(resultSocketMessage(resultData))
        }
        resultSocket.current.onclose = () => {
            console.log("result close")
        }
        resultSocket.current.onmessage = (e) => {
            console.log(e.data)
            const [groupNum, score] = (e.data).split(MARK.CONNECTION)
            plusGroupScore(groupNum, score)
        }

        return () => {
            resultSocket.current?.close()
        }
    }, [])

    useEffect(() => {
        console.log("re-rendering:", groupScoreList)
        sortByScore()
    }, [groupScoreList])

    return (
        <main>
            <div className="h-screen w-full flex flex-col p-2 bg-gradient-to-b from-blue-400 to-purple-800">
                <div className="h-[87%] md:h-4/5 w-full flex flex-col md:flex-row space-y-2 md:space-y-0 py-3 px-3">
                    <div className="h-full w-full flex flex-col justify-between space-y-4 md:space-y-2 md:py-2">
                        <div className="h-fit w-full flex flex-row bg-gray-50 rounded-md border border-slate-400 shadow-md">
                            <div className="h-full w-1/2 text-center select-none font-semibold border-r border-slate-200">RANK</div>
                            <div className="h-full w-1/2 text-center select-none font-semibold border-l border-slate-200">POINT</div>
                        </div>
                        <div className="h-full w-full flex flex-col space-y-4 justify-center">
                            {diplayList.map((v, i) => (
                                v.score !== "" && <ResultDisplay index={i} group={v.groupNum} value={v.score} key={i}/>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="h-[13%] md:h-1/5 w-full flex justify-end items-center px-2">
                    <button className="p-2 bg-gray-100 w-1/3 md:w-1/5 rounded-lg shadow-xl" onClick={handleContinue}>
                        <BoldText color={TEXT_COLOR.BLACK}>
                            終了
                        </BoldText>
                    </button>
                </div>
            </div>
        </main>
    )
}
