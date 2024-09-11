import { Metadata } from "next";
import {
    ArrowPathIcon,
    PlusIcon
} from '@heroicons/react/24/solid';
import { revalidateEvents } from "@/app/lib/action";
import Link from "next/link";
import SearchBar from "@/app/ui/components/search_bar";
import Pagination from "@/app/ui/components/pagination";
import EventsGrid from "@/app/ui/components/events/events_grid";
import { baseURL } from "@/app/lib/definition";
import EmptyGrid from "@/app/ui/components/empty_grid";
import { getToken } from "@/app/lib/server_utility";

export const metadata: Metadata = {
    title: 'Events',
};

export default async function Page({
    searchParams 
}: {
    searchParams?: { 
        query?:string;
        page?:string 
}}) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    let data: any = null

    try{
        const response = await fetch(`${baseURL}/event/search?page=${currentPage}&search=${query}`, { 
            cache: 'no-store',
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        })
        if(!response.ok){
            throw new Error()
        }
        data = await response.json()
    }
    catch (error){
        throw new Error('Something went wrong')
    }

    const totalPages = data.totalPages

    return (
        <main className="flex flex-col gap-y-4">
            <h1 className="text-3xl font-bold text-gray-950">🎉 Events</h1>
            <div className="flex flex-row justify-end items-center md:justify-between">
                <p className="text-sm text-gray-500 hidden md:block">Create and schedule your events here</p>
                <form action={revalidateEvents}>
                    <button className="flex items-center justify-center gap-2 rounded-md px-4 py-2 bg-gray-950 text-violet-50 text-sm font-bold hover:bg-violet-800 transition-colors duration-300">
                        <ArrowPathIcon className="w-6 md:w-5"/>
                        <p className="hidden md:block">Refresh</p>
                    </button>
                </form>
            </div>
            <div className="flex justify-between items-center gap-4">
                <Link href="/events/create" className="flex shrink-0 items-center justify-center gap-2 rounded-md px-4 py-2 bg-violet-500 text-violet-50 text-sm font-bold hover:bg-violet-800 transition-colors duration-300">
                    <PlusIcon className="w-6 md:w-5"/>
                    <p className="hidden md:block">New</p>
                </Link>
                <SearchBar placeholder="Search for events"/>
            </div>
            {data.data.length === 0 ? (
                <EmptyGrid url="/events/create"/>
            ): (
                <>
                    <EventsGrid data={data.data}/>
                    <Pagination totalPages={totalPages}/>
                </> 
            )}
        </main>
    )
}