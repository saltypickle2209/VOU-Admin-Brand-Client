import { Metadata } from "next";
import {
    ArrowPathIcon
} from '@heroicons/react/24/solid';
import { revalidateDashboard } from "@/app/lib/action";

export const metadata: Metadata = {
    title: 'Dashboard',
};

export default function Page() {
    return (
        <main className="flex flex-col gap-y-4">
            <h1 className="text-3xl font-bold text-gray-950">👋 Hello there!</h1>
            <div className="flex flex-row justify-end items-center md:justify-between">
                <p className="text-sm text-gray-500 hidden md:block">Your data will be automatically refreshed every 1 hour</p>
                <form action={revalidateDashboard}>
                    <button className="flex items-center justify-center gap-2 rounded-md px-4 py-2 bg-gray-950 text-violet-50 text-sm font-bold hover:bg-violet-800 transition-colors duration-300">
                        <ArrowPathIcon className="w-6 md:w-5"/>
                        <p className="hidden md:block">Refresh</p>
                    </button>
                </form>
            </div>
        </main>
    )
}