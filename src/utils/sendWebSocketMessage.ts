export const turnSocketMessage = (teamcode: string, msg: number): string => {
    const result = `${teamcode}[:::]${msg}`
    return result
}

export const usersSocketMessage = (teamcode: string, msg: string): string => {
    const result = ""
    return result
}