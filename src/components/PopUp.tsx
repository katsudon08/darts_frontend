import { TEXT_COLOR } from "@/types/color";
import BoldText from "./BoldText";
import { useRouter } from "next/navigation";
import { URLS } from "@/types/urls";

const PopUp = ({ children, hidePopUpWindow }: { children: React.ReactNode, hidePopUpWindow?: () => void }) => {
    const router = useRouter()

    const handleReset = () => {
        if (hidePopUpWindow !== undefined) {
            hidePopUpWindow()
        } else {
            router.replace(URLS.HOME)
        }
    }

    return (
        <>
            <div className="absolute h-full w-full bg-gray-900 opacity-70 z-40 flex justify-center items-center" />
            <div className="absolute flex justify-center items-center h-2/6 md:h-3/5 w-5/6 md:w-4/5 rounded-md bg-white px-4 z-50">
                <div className="flex flex-col justify-between space-y-4 items-center h-3/5 w-full">
                    <div className="flex h-full w-full justify-center items-center text-center">
                        <BoldText color={TEXT_COLOR.BLACK}>
                            {children}
                        </BoldText>
                    </div>
                    <button
                        className="bg-gray-100 w-2/5 md:w-1/3 py-2 rounded-md border border-slate-400 shadow-md"
                        onClick={handleReset}
                    >
                        <BoldText color={TEXT_COLOR.BLACK}>
                            閉じる
                        </BoldText>
                    </button>
                </div>
            </div>
        </>
    );
}

export default PopUp;