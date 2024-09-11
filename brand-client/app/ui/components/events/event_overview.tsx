import { baseURL } from '@/app/lib/definition';
import { getToken } from '@/app/lib/server_utility';
import {
    PlayIcon,
    TicketIcon,
    BanknotesIcon
} from '@heroicons/react/24/solid';

async function getEventPlayCounrStatistics(eventId: any) {
    try{
        const response = await fetch(`${baseURL}/event/participation/event/${eventId}`, { 
            cache: 'no-store',
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        })
        if(!response.ok){
            throw new Error()
        }
        const data = await response.json()
        return data
    }
    catch (error){
        throw new Error('Something went wrong')
    }
}

export default async function EventOverview({ eventId }: { eventId: any }){
    const [playCountData] = await Promise.all([
        getEventPlayCounrStatistics(eventId)
    ])

    return (
        <>
            <div className="flex flex-col gap-y-4 items-center lg:flex-row lg:gap-x-4">
                <div className="flex justify-center items-center shrink-0 w-16 h-16 rounded-full lg:w-12 lg:h-12 bg-red-200">
                    <PlayIcon className="w-8 text-red-500 lg:w-5"/>
                </div>
                <div className="grow flex flex-col gap-y-1 items-center lg:items-start">
                    <p className="text-sm text-gray-950 font-semibold">Play count</p>
                    <p className="text-sm text-gray-500">{playCountData.length}</p>
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
        </>
    )
}