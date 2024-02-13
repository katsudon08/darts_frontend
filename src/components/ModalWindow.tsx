"use client"

import { TEXT_COLOR } from "@/types/color";
import BoldText from "./BoldText";
import { useState } from "react";

const ModalWindow = ({ hideModalWindowDisplay, clickEvent }: { hideModalWindowDisplay: () => void, clickEvent: (data: string) => void }) => {
    const [text, setText] = useState("")

    return (
        <>
            <div className="absolute h-full w-full bg-gray-900 opacity-70 cursor-pointer" onClick={hideModalWindowDisplay} />
            <div className="absolute flex justify-center items-center h-2/6 md:h-3/5 w-5/6 md:w-4/5 rounded-md bg-white px-4">
                <div className="flex flex-col justify-between items-center h-3/5 w-full">
                    <input
                        id="teamcode"
                        type="text"
                        className="border border-slate-500 w-full md:w-3/4 p-2 rounded-md text-xl"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <button
                        className="bg-blue-700 w-2/5 md:w-1/3 py-2 rounded-md"
                        onClick={() => clickEvent(text)}
                    >
                        <BoldText color={TEXT_COLOR.WHITE}>
                            参加
                        </BoldText>
                    </button>
                </div>
            </div>
        </>
    );
}

export default ModalWindow;