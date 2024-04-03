import { TEXT_COLOR } from "@/types/color";
import BoldText from "./BoldText";

const ResultDisplay = ({ index, group, value }: { index: number, group: number, value: string }) => {
    switch (group) {
        case 0:
            return (
                <div className="h-1/3 w-full flex flex-row">
                    <div className="h-full w-1/2 mr-1 bg-red-200 border-slate-200 flex justify-center items-center rounded-md shadow-md" >
                        <BoldText color={TEXT_COLOR.BLACK}>
                            {index + 1}
                        </BoldText>
                    </div>
                    <div className="h-full w-1/2 ml-1 bg-red-200 border-slate-200 flex justify-center items-center rounded-md shadow-md" >
                        <BoldText color={TEXT_COLOR.BLACK}>
                            {value}
                        </BoldText>
                    </div>
                </div>
            )
        case 1:
            return (
                <div className="h-1/3 w-full flex flex-row">
                    <div className="h-full w-1/2 mr-1 bg-blue-200 border-slate-200 flex justify-center items-center rounded-md shadow-md" >
                        <BoldText color={TEXT_COLOR.BLACK}>
                            {index + 1}
                        </BoldText>
                    </div>
                    <div className="h-full w-1/2 ml-1 bg-blue-200 border-slate-200 flex justify-center items-center rounded-md shadow-md" >
                        <BoldText color={TEXT_COLOR.BLACK}>
                            {value}
                        </BoldText>
                    </div>
                </div>
            )
        case 2:
            return (
                <div className="h-1/3 w-full flex flex-row">
                    <div className="h-full w-1/2 mr-1 bg-green-200 border-slate-200 flex justify-center items-center rounded-md shadow-md" >
                        <BoldText color={TEXT_COLOR.BLACK}>
                            {index + 1}
                        </BoldText>
                    </div>
                    <div className="h-full w-1/2 ml-1 bg-green-200 border-slate-200 flex justify-center items-center rounded-md shadow-md" >
                        <BoldText color={TEXT_COLOR.BLACK}>
                            {value}
                        </BoldText>
                    </div>
                </div>
            )
    }
}

export default ResultDisplay;