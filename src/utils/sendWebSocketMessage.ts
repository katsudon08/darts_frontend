import { GameData } from "@/types/game"
import { MARK } from "@/types/message"

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

export const gameSocketMessage = (gameData: GameData): string => {
    const result = `${gameData.groupNum}${MARK.CONNECTION}${gameData.userName}${MARK.CONNECTION}${gameData.userId}${MARK.CONNECTION}${gameData.score}`
    return result
}