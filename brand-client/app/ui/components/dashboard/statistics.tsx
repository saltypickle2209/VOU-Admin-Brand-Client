import { baseURL } from '@/app/lib/definition';
import { getToken } from '@/app/lib/server_utility';
import {
    GlobeAltIcon,
    CubeIcon,
    UserGroupIcon,
    TicketIcon
} from '@heroicons/react/24/solid';

async function getEventStatistics() {
    try{
        const response = await fetch(`${baseURL}/event/by-brand-id`, { 
            cache: 'no-store',
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        })
        if(!response.ok){
            throw new Error()
        }
        const eventData = await response.json()
        return eventData
    }
    catch (error){
        throw new Error('Something went wrong')
    }
}

async function getGameStatistics() {
    try{
        const response = await fetch(`${baseURL}/game/by-brand-id`, { 
            cache: 'no-store',
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        })
        if(!response.ok){
            throw new Error()
        }
        const eventData = await response.json()
        return eventData
    }
    catch (error){
        throw new Error('Something went wrong')
    }
}

async function getPlayerStatistics() {
    try{
        const response = await fetch(`${baseURL}/event/participation/by-brand-id`, { 
            cache: 'no-store',
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        })
        if(!response.ok){
            throw new Error()
        }
        const eventData = await response.json()
        return eventData
    }
    catch (error){
        throw new Error('Something went wrong')
    }
}

export default async function Statistics() {
    // fetch data
    const [eventData, gameData, playerData] = await Promise.all([
        getEventStatistics(),
        getGameStatistics(),
        getPlayerStatistics()
    ])
    
    return (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-4 md:grid-cols-2">
            <div className="flex flex-col-reverse gap-4 sm:flex-row sm:gap-y-0 justify-between items-center w-3/4 h-auto place-self-center md:w-full md:h-32 p-6 bg-white rounded-md shadow-md">
                <div className="flex flex-col grow gap-y-1">
                    <p className="text-3xl text-center font-bold text-gray-950 sm:text-start">{eventData.length}</p>
                    <p className="text-sm text-center text-gray-500 sm:text-start">Events Created</p>
                </div>
                <div className="flex justify-center items-center shrink-0 w-14 h-14 rounded-full bg-emerald-200">
                    <GlobeAltIcon className="w-6 text-emerald-500"/>
                </div>
            </div>
            <div className="flex flex-col-reverse gap-4 sm:flex-row sm:gap-y-0 justify-between items-center w-3/4 h-auto place-self-center md:w-full md:h-32 p-6 bg-white rounded-md shadow-md">
                <div className="flex flex-col grow gap-y-1">
                    <p className="text-3xl text-center font-bold text-gray-950 sm:text-start">{gameData.length}</p>
                    <p className="text-sm text-center text-gray-500 sm:text-start">Game Created</p>
                </div>
                <div className="flex justify-center items-center shrink-0 w-14 h-14 rounded-full bg-blue-200">
                    <CubeIcon className="w-6 text-blue-500"/>
                </div>
            </div>
            <div className="flex flex-col-reverse gap-4 sm:flex-row sm:gap-y-0 justify-between items-center w-3/4 h-auto place-self-center md:w-full md:h-32 p-6 bg-white rounded-md shadow-md">
                <div className="flex flex-col grow gap-y-1">
                    <p className="text-3xl text-center font-bold text-gray-950 sm:text-start">{playerData.length}</p>
                    <p className="text-sm text-center text-gray-500 sm:text-start">Players</p>
                </div>
                <div className="flex justify-center items-center shrink-0 w-14 h-14 rounded-full bg-violet-200">
                    <UserGroupIcon className="w-6 text-violet-500"/>
                </div>
            </div>
            <div className="flex flex-col-reverse gap-4 sm:flex-row sm:gap-y-0 justify-between items-center w-3/4 h-auto place-self-center md:w-full md:h-32 p-6 bg-white rounded-md shadow-md">
                <div className="flex flex-col grow gap-y-1">
                    <p className="text-3xl text-center font-bold text-gray-950 sm:text-start">1000</p>
                    <p className="text-sm text-center text-gray-500 sm:text-start">Vouchers Published</p>
                </div>
                <div className="flex justify-center items-center shrink-0 w-14 h-14 rounded-full bg-rose-200">
                    <TicketIcon className="w-6 text-rose-500"/>
                </div>
            </div>
        </div>
    )
}