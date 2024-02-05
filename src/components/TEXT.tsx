import { COLOR } from "@/types/color"

const Text = ({ text, color }: { text: string, color: COLOR }) => {
    return (
        <div className={`text-${color}`}>
            <h1 className="whitespace-nowrap select-none text-4xl font-semibold">
                {text}
            </h1>
        </div>
    )
}

export default Text
