import { MARK } from "@/types/message";
import { UserData } from "@/types/user";

export const changeUsersMessageToUsersData = (msg: string): UserData[] => {
    const usersData: UserData[] = Array(6).map(() => (
        {
            groupNum: "",
            userName: ""
        }
    ))
    const tmp = msg.split(" ")
    tmp.pop()

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