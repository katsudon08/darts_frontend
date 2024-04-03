import { GameData, GameDisplayData, GameInitData } from "@/types/game"
import { MARK } from "@/types/message"
import { ResultData } from "@/types/result"

export const turnSocketMessage = (teamcode: string, msg: number): string => {
    const result = `${teamcode}${MARK.CONNECTION}${msg}`
    return result
}

export const getTurnData = (teamcode: string): string => {
    return teamcode
}

export const usersSocketMessage = (teamcode: string, num: number, msg: string): string => {
    const result = `${teamcode}${MARK.CONNECTION}${num}${MARK.CONNECTION}${msg}`
    return result
}

export const getUsersData = (teamcode: string): string => {
    return teamcode
}

export const deleteUserData = (teamcode: string): string => {
    const result = `${teamcode}${MARK.CONNECTION}`
    return result
}

export const gameSocketInitMessage = (gameInitData: GameInitData) => {
    const result = `${gameInitData.teamcode}${MARK.CONNECTION}${gameInitData.groupNum}${MARK.CONNECTION}${gameInitData.userName}${MARK.CONNECTION}${gameInitData.userId}`
    return result
}

export const gameSocketMessage = (gameData: GameData): string => {
    const result = `${gameData.teamcode}${MARK.CONNECTION}${gameData.groupNum}${MARK.CONNECTION}${gameData.userName}${MARK.CONNECTION}${gameData.userId}${MARK.CONNECTION}${gameData.score}`
    return result
}

export const gameDisplaySocketMessage = (gameDisplayData: GameDisplayData): string => {
    const result = `${gameDisplayData.teamcode}${MARK.CONNECTION}${gameDisplayData.groupNum}${MARK.CONNECTION}${gameDisplayData.userName}${MARK.CONNECTION}${gameDisplayData.score}`
    return result
}

export const resultSocketMessage = (resultData: ResultData): string => {
    const result = `${resultData.teamcode}${MARK.CONNECTION}${resultData.groupNum}${MARK.CONNECTION}${resultData.score}`
    return result
}