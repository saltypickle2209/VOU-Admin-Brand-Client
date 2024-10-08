import Link from "next/link";
import {
    CalendarDaysIcon
} from '@heroicons/react/24/outline';
import clsx from "clsx";
import { formatDate } from "@/app/lib/utility";

export default function EventsGrid({ data }: { data: any }){
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {data.map((event: any) => {
                const startDate = new Date(event.start_time)
                const endDate = new Date(event.end_time)
                startDate.setHours(0, 0, 0, 0)
                endDate.setHours(0, 0, 0, 0)
                return (
                    <Link key={event.id} href={`/events/details/${event.id}`} className="relative flex flex-col h-full gap-y-2 p-4 bg-white rounded-md shadow-md overflow-hidden hover:bg-gray-100 transition-colors duration-300">
                        <div className="flex w-full aspect-video rounded-md bg-slate-50 overflow-hidden">
                            <img src={event.poster} alt="" className="object-cover w-full h-full"/>
                        </div>
                        <p className="text-gray-950 font-bold break-words line-clamp-2">{event.name}</p>
                        
                        <div className="flex gap-x-4 items-center mt-auto">
                            <CalendarDaysIcon className="w-5 text-gray-500 shrink-0"/>
                            <div className="flex-1 overflow-hidden flex flex-col gap-y-1 justify-between sm:flex-row sm:gap-x-2 sm:gap-y-0">
                                <div className="flex truncate flex-col items-start">
                                    <p className="text-xs font-light text-gray-500">From</p>
                                    <p className="text-xs font-semibold text-gray-700 sm:text-sm">{formatDate(event.start_time)}</p>
                                </div>
                                <div className="flex truncate flex-col items-start">
                                    <p className="text-xs font-light text-gray-500">to</p>
                                    <p className="text-xs font-semibold text-gray-700 sm:text-sm">{formatDate(event.end_time)}</p>
                                </div>
                            </div>
                        </div>

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