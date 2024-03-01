export interface GameInitData {
    teamcode: string
    groupNum: string
    userName: string
    userId: string
}

export interface GameData extends GameInitData {
    score: number
}