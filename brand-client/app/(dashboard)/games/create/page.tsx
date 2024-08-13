import { Metadata } from "next";
import Link from "next/link"

export const metadata: Metadata = {
    title: 'Create A Game',
};

export default function Page() {    
    return (
        <main className="flex flex-col gap-y-8">
            <h1 className="text-3xl font-bold text-gray-950">👉 Choose a type of game</h1>
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <Link href="/games/create/live-quiz" className="flex flex-col h-full gap-y-2 p-4 bg-white rounded-md shadow-md overflow-hidden hover:bg-gray-100 transition-colors duration-300">
                    <div className="flex w-full aspect-video rounded-md bg-slate-50 overflow-hidden">
                        <img src="" alt="" className="object-cover"/>
                    </div>
                    <p className="text-gray-950 font-bold text-center">Live Quiz</p>
                </Link>
                <Link href="/games/create/item-collecting" className="flex flex-col h-full gap-y-2 p-4 bg-white rounded-md shadow-md overflow-hidden hover:bg-gray-100 transition-colors duration-300">
                    <div className="flex w-full aspect-video rounded-md bg-slate-50 overflow-hidden">
                        <img src="" alt="" className="object-cover"/>
                    </div>
                    <p className="text-gray-950 font-bold text-center">Item Collecting</p>
                </Link>
            </div>
        </main>
    )
}