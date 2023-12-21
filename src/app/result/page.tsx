export default function () {
    return (
        <main className="flex h-screen justify-center items-center py-10 bg-lime-600">
            <div className="flex flex-col justify-between h-full w-full bg-red-100">
                <div className="flex flex-col md:flex-row justify-between h-4/5 w-full px-4 bg-blue-100">
                    <div className="h-full w-full bg-red-500"></div>
                    <div className="h-full w-full bg-white"></div>
                </div>
                <div className="flex justify-center items-center h-1/5 w-full bg-slate-500"></div>
            </div>
        </main>
    )
}
