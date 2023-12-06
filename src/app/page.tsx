'use client'

import { useRouter } from "next/navigation";

export default function Home() {
	const router = useRouter()

	const handleOuterTap = () => {
		router.push('/room-setting')
	}

	return (
		<main>
			<div className=" flex pt-10 bg-lime-600 min-h-screen justify-center items-center " onClick={handleOuterTap}>
				<div className=" flex flex-col pt-10 min-h-fit p-2 h-60 justify-between ">
					<input type="text"className=" py-4 px-2 text-xl " onClick={e => e.stopPropagation()}/>
					<h1 className=" whitespace-nowrap select-none text-4xl font-semibold ">タップしてスタート</h1>
				</div>
			</div>
		</main>
	)
}