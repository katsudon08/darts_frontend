import { UserData } from "@/types/user";

export const createMessageFromUsers = (users: UserData[]): string => {
    let msg = ""
    users.map((user, i) => {
        if (i === users.length - 1) {
            msg += `${user.groupNum}:${user.userName}`
        } else {
            msg += `${user.groupNum}:${user.userName} `
        }
    })

    return msg
}