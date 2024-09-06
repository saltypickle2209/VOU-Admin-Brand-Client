import { formatDate } from '@/app/lib/utility';
import {
    InformationCircleIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function BasicInformation({ data }: { data: any }) {
    const today = new Date()
    const startDate = new Date(data.start_time)
    today.setHours(0, 0, 0, 0)
    startDate.setHours(0, 0, 0, 0)

    return (
        <div className="relative w-full h-full">
            <div className="sticky top-0 flex flex-col gap-y-4 py-8 lg:px-8 lg:py-0">
                <div className="flex gap-x-2 items-center text-gray-950">
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
                <div className="flex flex-col gap-y-2">
                    <p className="text-gray-950 font-semibold">Voucher</p>
                    <div className="rounded-md flex overflow-hidden shadow-md h-32">
                        <div className="overflow-hidden flex h-full w-40 shrink-0">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmUbXIH85ZcmIpMRatVL08HSbZSWVdDP5nnw&s" alt="Image Preview" className="w-full h-full object-cover"/> 
                        </div>
                        <div className="grow h-full p-4 flex flex-col gap-y-2">
                            <p className="text-gray-950 font-semibold line-clamp-1">Voucher's name</p>
                            <p className="text-gray-500 text-xs line-clamp-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus ut accusantium praesentium suscipit adipisci porro. Cumque hic sunt qui eligendi.</p>
                            <div className="w-full h-2 mt-auto bg-gray-300 rounded-full relative overflow-hidden after:absolute after:content-[''] after:left-0 after:w-[60%] after:bg-violet-500 after:inset-y-0 after:rounded-md"/>
                        </div>
                    </div>
                </div>
                {startDate <= today ? (
                    <div className="w-full mt-2 cursor-not-allowed text-center text-violet-50 text-sm font-bold bg-gray-500 py-4 px-2 rounded-md">Edit</div>
                ): (
                    <Link href={`/games/edit/${data.id}`} className="w-full mt-2 text-center text-violet-50 text-sm font-bold bg-gray-950 py-4 px-2 rounded-md hover:bg-violet-800 transition-colors duration-300">Edit</Link>
                )}
            </div> 
        </div>
    )
}