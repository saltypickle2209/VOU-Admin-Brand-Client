import {
    BuildingStorefrontIcon,
    CalendarDaysIcon,
    ClockIcon
} from '@heroicons/react/24/solid';

export default function BrandStatistics() {
    return (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3 md:grid-cols-2">
            <div className="flex flex-col-reverse gap-4 sm:flex-row sm:gap-y-0 justify-between items-center w-full h-auto place-self-center md:h-32 p-6 bg-white rounded-md shadow-md">
                <div className="flex flex-col grow gap-y-1">
                    <p className="text-3xl text-center font-bold text-gray-950 sm:text-start">1000</p>
                    <p className="text-sm text-center text-gray-500 sm:text-start">Active Brands</p>
                </div>
                <div className="flex justify-center items-center shrink-0 w-14 h-14 rounded-full bg-emerald-200">
                    <BuildingStorefrontIcon className="w-6 text-emerald-500"/>
                </div>
            </div>
            <div className="flex flex-col-reverse gap-4 sm:flex-row sm:gap-y-0 justify-between items-center w-full h-auto place-self-center md:h-32 p-6 bg-white rounded-md shadow-md">
                <div className="flex flex-col grow gap-y-1">
                    <p className="text-3xl text-center font-bold text-gray-950 sm:text-start">1000</p>
                    <p className="text-sm text-center text-gray-500 sm:text-start">Events Created</p>
                </div>
                <div className="flex justify-center items-center shrink-0 w-14 h-14 rounded-full bg-blue-200">
                    <CalendarDaysIcon className="w-6 text-blue-500"/>
                </div>
            </div>
            <div className="flex flex-col-reverse gap-4 sm:flex-row sm:gap-y-0 justify-between items-center w-full h-auto place-self-center md:h-32 p-6 bg-white rounded-md shadow-md">
                <div className="flex flex-col grow gap-y-1">
                    <p className="text-3xl text-center font-bold text-gray-950 sm:text-start">1000</p>
                    <p className="text-sm text-center text-gray-500 sm:text-start">Ongoing Events</p>
                </div>
                <div className="flex justify-center items-center shrink-0 w-14 h-14 rounded-full bg-violet-200">
                    <ClockIcon className="w-6 text-violet-500"/>
                </div>
            </div>
        </div>
    )
}