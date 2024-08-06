import Link from 'next/link';
import Image from 'next/image';
import NavLinks from './navlinks';
import { PowerIcon } from '@heroicons/react/24/solid';

export default function SideNav() {
    return (
        <div className="flex h-full flex-col p-4 md:p-2">
            <Link href="/dashboard" className="mb-2 flex h-20 items-center justify-start rounded-md bg-violet-600 p-4 md:h-40 md:items-end">
                <Image src="/vou_large_icon_white.png" width={142} height={53.333} alt="App Icon" className="scale-75 md:scale-100"/>
            </Link>
            <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
                <NavLinks/>
                <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
                <form>
                    <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-violet-100 hover:text-violet-800 md:flex-none md:justify-start md:p-2 md:px-3">
                        <PowerIcon className="w-6 md:w-5"/>
                        <p className="hidden md:block">Log out</p>
                    </button>
                </form>
            </div>
        </div>
    );
}