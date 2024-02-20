import { UserData } from "@/types/user";
import React from "react";

const User = ({ user }: { user: UserData }) => {
    if (user === undefined) {
        return (
            <div className="flex  bg-white w-full justify-center items-center rounded-xl border text-lg font-semibold border-gray-300 h-full" />
        );
    }
    switch (user.groupNum) {
        case "0":
            return (
                <div className="flex  bg-red-200 w-full justify-center items-center rounded-xl border text-lg font-semibold border-red-500 h-full">
                    {user.userName}
                </div>
            );
        case "1":
            return (
                <div className="flex  bg-blue-200 w-full justify-center items-center rounded-xl border text-lg font-semibold border-blue-500 h-full">
                    {user.userName}
                </div>
            );
        case "2":
            return (
                <div className="flex  bg-green-200 w-full justify-center items-center rounded-xl border text-lg font-semibold border-green-500 h-full">
                    {user.userName}
                </div>
            );
    }
}

export default User;