import {
    ArrowLeftIcon,
    CubeTransparentIcon
  } from '@heroicons/react/24/solid';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="h-full flex flex-col p-16 gap-y-4 items-center justify-center text-gray-950 lg:px-48">
          <CubeTransparentIcon className="w-16"/>
          <div className="flex flex-col gap-y-2 items-center">
            <h2 className="font-semibold">Oops! Not found!</h2>
            <p className="text-xs text-gray-500 text-center">The page you are looking for does not exist.</p>
          </div>
          <Link href="/games" className="flex items-center justify-center gap-2 rounded-md px-4 py-2 bg-gray-950 text-violet-50 text-sm font-bold hover:bg-violet-800 transition-colors duration-300">
            <ArrowLeftIcon className="w-5"/>
            <p>Go back</p>
          </Link>
        </div>
      )
}