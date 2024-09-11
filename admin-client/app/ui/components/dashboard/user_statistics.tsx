import {
    UserGroupIcon,
    ChevronRightIcon
} from '@heroicons/react/24/solid';
import Link from 'next/link';

export default async function UserStatistics() {
    function delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    await delay(5000);

    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-y-0 justify-between items-center w-full h-auto place-self-center md:h-32 p-6 bg-white rounded-md shadow-md">
            <div className="flex flex-col gap-y-4 items-center sm:flex-row sm:gap-x-4 grow">
                <div className="flex justify-center items-center w-14 h-14 rounded-full bg-violet-200">
                    <UserGroupIcon className="w-6 text-violet-500"/>
                </div>
                <div className="flex flex-col grow gap-y-1">
                    <p className="text-sm text-center text-gray-500 sm:text-start">Active Users</p>
                    <p className="text-3xl text-center font-bold text-gray-950 sm:text-start">1.000.000.000</p>
                </div>
            </div>

            <Link href="/events" className="flex items-center self-end shrink-0 gap-x-2 font-bold text-violet-500 hover:text-violet-800 transition-colors duration-300 sm:self-center">
                <p>View all</p>
                <ChevronRightIcon className="w-5"/>
            </Link>
        </div>
    )
}