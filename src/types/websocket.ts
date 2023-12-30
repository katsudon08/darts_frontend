export interface DATA {
    Key: KEY
    Detail: DETAIL
    Value: string
}

export const enum KEY {
    ROOM_SETTING = "room-setting"
}

export const enum DETAIL {
    GROUP = "group",
    TURN = "turn",
}