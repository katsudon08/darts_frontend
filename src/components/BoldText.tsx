import { COLOR } from "@/types/color"

const BoldText = ({ text, color }: { text: string, color: COLOR }) => {
    switch (color) {
        case COLOR.BLACK:
            return (
                <h1 className="whitespace-nowrap select-none text-3xl font-semibold">
                    {text}
                </h1>
            )
        case COLOR.WHITE:
            return (
                <h1 className="whitespace-nowrap select-none text-3xl font-semibold text-white">
                    {text}
                </h1>
            )
    }
}

export default BoldText
