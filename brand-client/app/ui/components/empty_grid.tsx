import {
    ArrowRightIcon,
    CubeTransparentIcon
  } from '@heroicons/react/24/solid';
import Link from 'next/link';

export default function EmptyGrid({ url }: {url: string}) {
    return (
        <div className="h-full flex flex-col p-16 gap-y-4 items-center justify-center text-gray-950 lg:px-48">
            <CubeTransparentIcon className="w-16"/>
            <div className="flex flex-col gap-y-2 items-center">
                <h2 className="font-semibold">It's empty here!</h2>
                <p className="text-xs text-gray-500 text-center">There are no results matched your search or you haven't created any items.</p>
            </div>
            <Link href={url} className="flex items-center justify-center gap-2 rounded-md px-4 py-2 bg-gray-950 text-violet-50 text-sm font-bold hover:bg-violet-800 transition-colors duration-300">
                <p>Create a new item</p>
                <ArrowRightIcon className="w-5"/>
            </Link>
        </div>
    )
}