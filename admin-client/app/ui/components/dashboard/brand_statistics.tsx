import { baseURL } from '@/app/lib/definition';
import { getToken } from '@/app/lib/server_utility';
import {
    BuildingStorefrontIcon,
    CalendarDaysIcon,
    ClockIcon
} from '@heroicons/react/24/solid';

async function getBrandStatistics() {
    try{
        const response = await fetch(`${baseURL}/auth/users/brands`, { 
            cache: 'no-store',
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        })
        if(!response.ok){
            throw new Error()
        }
        const brandData = await response.json()
        return brandData
    }
    catch (error){
        throw new Error('Something went wrong')
    }
}

async function getEventStatistics() {
    try{
        const response = await fetch(`${baseURL}/event/all`, { 
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

async function getOngoingEventStatistics() {
    try{
        const response = await fetch(`${baseURL}/event/active-events-count`, { 
            cache: 'no-store',
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        })
        if(!response.ok){
            throw new Error()
        }
        const eventData = await response.json()
        return eventData.activeEventsCount
    }
    catch (error){
        throw new Error('Something went wrong')
    }
}

export default async function BrandStatistics() {
    const [brandData, eventData, ongoingEventData] = await Promise.all([
        getBrandStatistics(),
        getEventStatistics(),
        getOngoingEventStatistics()
    ])

    return (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3 md:grid-cols-2">
            <div className="flex flex-col-reverse gap-4 sm:flex-row sm:gap-y-0 justify-between items-center w-full h-auto place-self-center md:h-32 p-6 bg-white rounded-md shadow-md">
                <div className="flex flex-col grow gap-y-1">
                    <p className="text-3xl text-center font-bold text-gray-950 sm:text-start">{brandData.length}</p>
                    <p className="text-sm text-center text-gray-500 sm:text-start">Active Brands</p>
                </div>
                <div className="flex justify-center items-center shrink-0 w-14 h-14 rounded-full bg-emerald-200">
                    <BuildingStorefrontIcon className="w-6 text-emerald-500"/>
                </div>
            </div>
            <div className="flex flex-col-reverse gap-4 sm:flex-row sm:gap-y-0 justify-between items-center w-full h-auto place-self-center md:h-32 p-6 bg-white rounded-md shadow-md">
                <div className="flex flex-col grow gap-y-1">
                    <p className="text-3xl text-center font-bold text-gray-950 sm:text-start">{eventData.length}</p>
                    <p className="text-sm text-center text-gray-500 sm:text-start">Events Created</p>
                </div>
                <div className="flex justify-center items-center shrink-0 w-14 h-14 rounded-full bg-blue-200">
                    <CalendarDaysIcon className="w-6 text-blue-500"/>
                </div>
            </div>
            <div className="flex flex-col-reverse gap-4 sm:flex-row sm:gap-y-0 justify-between items-center w-full h-auto place-self-center md:h-32 p-6 bg-white rounded-md shadow-md">
                <div className="flex flex-col grow gap-y-1">
                    <p className="text-3xl text-center font-bold text-gray-950 sm:text-start">{ongoingEventData}</p>
                    <p className="text-sm text-center text-gray-500 sm:text-start">Ongoing Events</p>
                </div>
                <div className="flex justify-center items-center shrink-0 w-14 h-14 rounded-full bg-violet-200">
                    <ClockIcon className="w-6 text-violet-500"/>
                </div>
            </div>
        </div>
    )
}