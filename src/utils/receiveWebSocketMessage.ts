import { MARK } from "@/types/message";
import { UserData } from "@/types/user";

export const changeUsersMessageToUsersData = (msg: string): (UserData[] | false) => {
    const usersData: UserData[] = Array(6).map(() => (
        {
            groupNum: "",
            userName: ""
        }
    ))
    const tmp = msg.split(" ")

    if (!Boolean(tmp[1]) && typeof tmp[1] === "string") {
        return false
    }

    tmp.map((user, key) => {
        const [groupNum, userName] = user.split(MARK.CONNECTION)
        const userData: UserData = {
            groupNum: groupNum,
            userName: userName
        }
        usersData[key] = userData
    })

    return usersData
}

export const gameMessageToSplitLength = (msg: string): number => {
    const splittedMsg = msg.split(MARK.CONNECTION)

    return splittedMsg.length
}