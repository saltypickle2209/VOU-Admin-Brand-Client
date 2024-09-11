import { Metadata } from "next";
import {
    ArrowPathIcon,
    PlusIcon
} from '@heroicons/react/24/solid';
import { revalidateGames } from "@/app/lib/action";
import Link from "next/link";
import SearchBar from "@/app/ui/components/search_bar";
import GamesGrid from "@/app/ui/components/games/game_grid";
import Pagination from "@/app/ui/components/pagination";
import { baseURL, Game } from "@/app/lib/definition";
import EmptyGrid from "@/app/ui/components/empty_grid";
import { getToken } from "@/app/lib/server_utility";

export const metadata: Metadata = {
    title: 'Games',
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
        const response = await fetch(`${baseURL}/game/search?page=${currentPage}&search=${query}`, { 
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

    const totalPages = data.games.totalPages

    return (
        <main className="flex flex-col gap-y-4">
            <h1 className="text-3xl font-bold text-gray-950">🕹️ Games</h1>
            <div className="flex flex-row justify-end items-center md:justify-between">
                <p className="text-sm text-gray-500 hidden md:block">Create, customize and manage all your games here</p>
                <form action={revalidateGames}>
                    <button className="flex items-center justify-center gap-2 rounded-md px-4 py-2 bg-gray-950 text-violet-50 text-sm font-bold hover:bg-violet-800 transition-colors duration-300">
                        <ArrowPathIcon className="w-6 md:w-5"/>
                        <p className="hidden md:block">Refresh</p>
                    </button>
                </form>
            </div>
            <div className="flex justify-between items-center gap-4">
                <Link href="/games/create" className="flex shrink-0 items-center justify-center gap-2 rounded-md px-4 py-2 bg-violet-500 text-violet-50 text-sm font-bold hover:bg-violet-800 transition-colors duration-300">
                    <PlusIcon className="w-6 md:w-5"/>
                    <p className="hidden md:block">New</p>
                </Link>
                <SearchBar placeholder="Search for games"/>
            </div>
            {data.games.data.length === 0 ? (
                <EmptyGrid url="/games/create"/>
            ): (
                <>
                    <GamesGrid data={data.games.data}/>
                    <Pagination totalPages={totalPages}/>
                </>
            )}
        </main>
    )
}