import { URLS } from "@/types/urls"
import { useRouter } from "next/navigation"

export default function () {
    const router = useRouter()

    const handleClick = () => {
        console.log(URLS.GAME)
        // router.push(URLS.GAME)
    }

    return (
        <main>
            <div className="flex h-screen justify-center items-center p-10  bg-lime-600">
                <div className="flex flex-col justify-between h-full w-full  bg-red-700">
                    <div className="flex flex-row justify-between h-3/5">
                        <div className="bg-yellow-100 h-full w-1/5"></div>
                        <div className="bg-yellow-200 h-full w-3/5"></div>
                        <div className="bg-yellow-300 h-full w-1/5"></div>
                    </div>
                    <div className="flex flex-col justify-between h-2/5 pt-10 bg-blue-200">
                        <div className="bg-green-300 h-full w-full"></div>
                        <div className="bg-green-400 h-full w-full"></div>
                    </div>
                </div>
            </div>
        </main>
    )
}
