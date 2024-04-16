export interface GameInitData {
    teamcode: string
    groupNum: string
    userName: string
    userId: string
}

export interface GameData extends GameInitData {
    score: number
}

export interface GameDisplayData {
    teamcode: string,
    groupNum: string,
    userName: string,
    score: number,
}