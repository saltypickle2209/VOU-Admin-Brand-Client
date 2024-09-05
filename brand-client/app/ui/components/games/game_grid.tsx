import Link from "next/link";
import {
    CalendarDaysIcon,
    PuzzlePieceIcon,
    TicketIcon
} from '@heroicons/react/24/outline';
import GameType from "./game_type";
import Voucher from "./voucher";
import clsx from "clsx";
import { formatDate } from "@/app/lib/utility";
import { Suspense } from "react";
import TextSkeleton from "./text_skeleton";

export default function GamesGrid({ data }: { data: any }){
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {data.map((game: any) => {
                const startDate = new Date(game.start_time)
                const endDate = new Date(game.end_time)
                startDate.setHours(0, 0, 0, 0)
                endDate.setHours(0, 0, 0, 0)
                return (
                    <Link key={game.id} href={`/games/details/${game.id}`} className="relative flex flex-col h-full gap-y-2 p-4 bg-white rounded-md shadow-md overflow-hidden hover:bg-gray-100 transition-colors duration-300">
                        <div className="flex w-full aspect-video rounded-md bg-slate-50 overflow-hidden">
                            <img src={game.poster} alt="" className="object-cover w-full h-full"/>
                        </div>
                        <p className="text-gray-950 font-bold break-words line-clamp-2">{game.name}</p>
                        <div className="flex gap-x-4 items-center">
                            <CalendarDaysIcon className="w-5 text-gray-500 shrink-0"/>
                            <div className="flex-1 overflow-hidden flex flex-col gap-y-1 justify-between sm:flex-row sm:gap-x-2 sm:gap-y-0">
                                <div className="flex truncate flex-col items-start">
                                    <p className="text-xs font-light text-gray-500">From</p>
                                    <p className="text-xs font-semibold text-gray-700 sm:text-sm">{formatDate(game.start_time)}</p>
                                </div>
                                <div className="flex truncate flex-col items-start">
                                    <p className="text-xs font-light text-gray-500">to</p>
                                    <p className="text-xs font-semibold text-gray-700 text-elipsis sm:text-sm">{formatDate(game.end_time)}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-x-4 items-center">
                            <PuzzlePieceIcon className="w-5 text-gray-500 shrink-0"/>
                            <div className="grow flex flex-col">
                                <p className="text-xs font-light text-gray-500">Game type</p>
                                <Suspense fallback={<TextSkeleton />}>
                                    <GameType game_type_id={game.game_type_id}/>
                                </Suspense>
                            </div>
                        </div>
                        <div className="flex gap-x-4 items-center">
                            <TicketIcon className="w-5 text-gray-500 shrink-0"/>
                            <div className="grow flex flex-col">
                                <p className="text-xs font-light text-gray-500">Voucher</p>
                                <Suspense fallback={<TextSkeleton />}>
                                    <Voucher voucher_template_id={game.voucher_template_id}/>
                                </Suspense>
                            </div>
                        </div>
                        <div className="w-full h-2 mt-auto bg-gray-300 rounded-full relative overflow-hidden after:absolute after:content-[''] after:left-0 after:w-[60%] after:bg-violet-500 after:inset-y-0 after:rounded-md"/>

                        <div className={clsx(
                            "absolute top-2 right-0 flex items-center justify-center min-w-24 px-3 py-1.5 font-semibold text-xs text-white rounded-s-md mt-auto shadow",
                            {
                                "bg-green-700": startDate <= today && endDate >= today,
                                "bg-red-700": endDate < today,
                                "bg-amber-500": startDate > today
                            }
                        )}>
                            {startDate > today ? "Upcoming" : endDate < today ? "Completed" : "Ongoing"}
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}