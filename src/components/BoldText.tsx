import { TEXT_COLOR } from "@/types/color"

const BoldText = ({ color, children }: { color: TEXT_COLOR, children: React.ReactNode }) => {
    switch (color) {
        case TEXT_COLOR.BLACK:
            return (
                <h1 className="select-none text-3xl font-semibold">
                    {children}
                </h1>
            )
        case TEXT_COLOR.WHITE:
            return (
                <h1 className="select-none text-3xl font-semibold text-white">
                    {children}
                </h1>
            )
        case TEXT_COLOR.RED:
            return (
                <h1 className="select-none text-3xl font-semibold text-red-600">
                    {children}
                </h1>
            )
        case TEXT_COLOR.BLUE:
            return (
                <h1 className="select-none text-3xl font-semibold text-blue-600">
                    {children}
                </h1>
            )
        case TEXT_COLOR.GREEN:
            return (
                <h1 className="select-none text-3xl font-semibold text-green-600">
                    {children}
                </h1>
            )



    }
}

export default BoldText
