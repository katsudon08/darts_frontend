'use client'

import React from "react";
import { useRouter } from "next/navigation";

export default function Home() {
	const router = useRouter()

	const handleClick = (e: React.TouchEvent) => {
		// stopPropagationが動かない
		e.stopPropagation()
		// router.push('/room-setting')
		console.log("route")
	}

	return (
		<main>
			<div className=" flex pt-10 bg-lime-600 min-h-screen justify-center items-center " onTouchEnd={(e: React.TouchEvent) => handleClick(e)}>
				<div className=" flex flex-col pt-10 min-h-fit p-2 h-60 justify-between ">
					<input type="text"className=" py-4 px-2 text-xl "/>
					<h1 className=" whitespace-nowrap text-4xl font-semibold ">タップしてスタート</h1>
				</div>
			</div>
		</main>
	)
}
