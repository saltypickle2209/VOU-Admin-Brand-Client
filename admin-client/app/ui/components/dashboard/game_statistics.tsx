import { baseURL } from '@/app/lib/definition';
import { getToken } from '@/app/lib/server_utility';
import {
    CalendarDaysIcon,
    GlobeAltIcon,
    FireIcon,
    TicketIcon
} from '@heroicons/react/24/solid';

async function getGameStatistics() {
    try{
        const response = await fetch(`${baseURL}/game/all`, { 
            cache: 'no-store',
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        })
        if(!response.ok){
            throw new Error()
        }
        const gameData = await response.json()
        return gameData
    }
    catch (error){
        throw new Error('Something went wrong')
    }
}

async function getOngoingGameStatistics() {
    try{
        const response = await fetch(`${baseURL}/game/active-games-count`, { 
            cache: 'no-store',
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        })
        if(!response.ok){
            throw new Error()
        }
        const gameData = await response.json()
        return gameData.activeGamesCount
    }
    catch (error){
        throw new Error('Something went wrong')
    }
}

export default async function GameStatistics() {
    const [gameData, ongoingGameData] = await Promise.all([
        getGameStatistics(),
        getOngoingGameStatistics()
    ])

    return (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3 md:grid-cols-2">
            <div className="flex flex-col-reverse gap-4 sm:flex-row sm:gap-y-0 justify-between items-center w-full h-auto place-self-center md:h-32 p-6 bg-white rounded-md shadow-md">
                <div className="flex flex-col grow gap-y-1">
                    <p className="text-3xl text-center font-bold text-gray-950 sm:text-start">{gameData.length}</p>
                    <p className="text-sm text-center text-gray-500 sm:text-start">Games Created</p>
                </div>
                <div className="flex justify-center items-center shrink-0 w-14 h-14 rounded-full bg-emerald-200">
                    <GlobeAltIcon className="w-6 text-emerald-500"/>
                </div>
            </div>
            <div className="flex flex-col-reverse gap-4 sm:flex-row sm:gap-y-0 justify-between items-center w-full h-auto place-self-center md:h-32 p-6 bg-white rounded-md shadow-md">
                <div className="flex flex-col grow gap-y-1">
                    <p className="text-3xl text-center font-bold text-gray-950 sm:text-start">{ongoingGameData}</p>
                    <p className="text-sm text-center text-gray-500 sm:text-start">Ongoing Games</p>
                </div>
                <div className="flex justify-center items-center shrink-0 w-14 h-14 rounded-full bg-blue-200">
                    <FireIcon className="w-6 text-blue-500"/>
                </div>
            </div>
            <div className="flex flex-col-reverse gap-4 sm:flex-row sm:gap-y-0 justify-between items-center w-full h-auto place-self-center md:h-32 p-6 bg-white rounded-md shadow-md">
                <div className="flex flex-col grow gap-y-1">
                    <p className="text-3xl text-center font-bold text-gray-950 sm:text-start">1000</p>
                    <p className="text-sm text-center text-gray-500 sm:text-start">Vouchers Published</p>
                </div>
                <div className="flex justify-center items-center shrink-0 w-14 h-14 rounded-full bg-violet-200">
                    <TicketIcon className="w-6 text-violet-500"/>
                </div>
            </div>
        </div>
    )
}