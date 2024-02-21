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