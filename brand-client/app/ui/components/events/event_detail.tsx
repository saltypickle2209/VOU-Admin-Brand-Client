import { formatDate } from '@/app/lib/utility';
import {
    InformationCircleIcon,
    ChevronRightIcon,
    FireIcon
} from '@heroicons/react/24/outline';
import {
    PlayIcon,
    TicketIcon,
    BanknotesIcon
} from '@heroicons/react/24/solid';
import Link from 'next/link';
import { Suspense } from 'react';
import EventGameList from './event_game_list';
import EventGameListSkeleton from './event_game_list_skeleton';

export default function EventDetail({ data }: { data: any }) {
    const today = new Date()
    const startDate = new Date(data.start_time)
    today.setHours(0, 0, 0, 0)
    startDate.setHours(0, 0, 0, 0)

    return (
        <div className="w-full px-6 grid grid-cols-1 divide-y-2 divide-gray-300 lg:py-6 lg:px-0 lg:divide-y-0 lg:divide-x-2 lg:grid-cols-[minmax(0,_2fr)_minmax(0,_1fr)] bg-white rounded-md shadow-md">
            <div className="flex flex-col gap-y-4 py-8 lg:px-8 lg:py-0">
                <div className="flex gap-x-2 text-gray-950">
                    <InformationCircleIcon className="w-5"/>
                    <h2 className="font-semibold">Basic Information</h2>
                </div>
                <div className="overflow-hidden flex w-full aspect-video rounded-md">
                    <img src={data.poster} alt="Image Preview" className="w-full h-full object-cover"/>
                </div>
                <p className="text-xl text-gray-950 font-bold break-words">{data.name}</p>
                <div className="flex flex-col gap-y-2">
                    <p className="text-gray-950 font-semibold">Duration</p>
                    <div className="grid grid-cols-2 my-2 divide-x-2 divide-gray-300">
                        <div className="px-4 flex flex-col gap-y-2 items-center">
                            <p className="text-gray-950 font-semibold">Start date</p>
                            <p className="text-gray-500 text-sm">{formatDate(data.start_time)}</p>
                        </div>
                        <div className="px-4 flex flex-col gap-y-2 items-center">
                            <p className="text-gray-950 font-semibold">End date</p>
                            <p className="text-gray-500 text-sm">{formatDate(data.end_time)}</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-y-2">
                    <p className="text-gray-950 font-semibold">Description</p>
                    <p className="text-sm text-gray-500">{data.description}</p>
                </div>
                <Suspense fallback={<EventGameListSkeleton/>}>
                    <EventGameList eventId={data.id}/>
                </Suspense>
                {startDate <= today ? (
                    <div className="w-full mt-2 cursor-not-allowed text-center text-violet-50 text-sm font-bold bg-gray-500 py-4 px-2 rounded-md">Edit</div>
                ): (
                    <Link href={`/events/edit/${data.id}`} className="w-full mt-2 text-center text-violet-50 text-sm font-bold bg-gray-950 py-4 px-2 rounded-md hover:bg-violet-800 transition-colors duration-300">Edit</Link>
                )}
            </div>
            <div className="relative w-full h-full">
                <div className="sticky top-0 flex flex-col gap-y-4 py-8 lg:px-8 lg:py-0">
                    <div className="flex gap-x-2 text-gray-950">
                        <FireIcon className="w-5"/>
                        <h2 className="font-semibold">Overview</h2>
                    </div>

                    {/* TODO: wait for those things' APIs and separate them into a new component */}

                    <div className="flex flex-col gap-y-4 items-center lg:flex-row lg:gap-x-4">
                        <div className="flex justify-center items-center shrink-0 w-16 h-16 rounded-full lg:w-12 lg:h-12 bg-red-200">
                            <PlayIcon className="w-8 text-red-500 lg:w-5"/>
                        </div>
                        <div className="grow flex flex-col gap-y-1 items-center lg:items-start">
                            <p className="text-sm text-gray-950 font-semibold">Play count</p>
                            <p className="text-sm text-gray-500">123.456.789</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-4 items-center lg:flex-row lg:gap-x-4">
                        <div className="flex justify-center items-center shrink-0 w-16 h-16 rounded-full lg:w-12 lg:h-12 bg-amber-200">
                            <TicketIcon className="w-8 text-amber-500 lg:w-5"/>
                        </div>
                        <div className="grow flex flex-col gap-y-1 items-center lg:items-start">
                            <p className="text-sm text-gray-950 font-semibold">Published vouchers</p>
                            <p className="text-sm text-gray-500">123.456.789</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-4 items-center lg:flex-row lg:gap-x-4">
                        <div className="flex justify-center items-center shrink-0 w-16 h-16 rounded-full lg:w-12 lg:h-12 bg-emerald-200">
                            <BanknotesIcon className="w-8 text-emerald-500 lg:w-5"/>
                        </div>
                        <div className="grow flex flex-col gap-y-1 items-center lg:items-start">
                            <p className="text-sm text-gray-950 font-semibold">Total expense</p>
                            <p className="text-sm text-gray-500">123.456.789đ</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}