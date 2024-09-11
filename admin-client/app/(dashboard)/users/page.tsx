import { Metadata } from "next";
import {
    ArrowPathIcon,
    PlusIcon
} from '@heroicons/react/24/solid';
import { revalidateUsers } from "@/app/lib/action";
import SearchBar from "@/app/ui/components/search_bar";
import Pagination from "@/app/ui/components/pagination";
import UsersList from "@/app/ui/components/users/users_list";
import { baseURL } from "@/app/lib/definition";
import { getToken } from "@/app/lib/server_utility";

export const metadata: Metadata = {
    title: 'Users',
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
        const response = await fetch(`${baseURL}/auth/users/search?page=${currentPage}&search=${query}`, { 
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
            <h1 className="text-3xl font-bold text-gray-950">💁 Users</h1>
            <div className="flex flex-row justify-end items-center md:justify-between">
                <p className="text-sm text-gray-500 hidden md:block">View and manage your users here</p>
                <form action={revalidateUsers}>
                    <button className="flex items-center justify-center gap-2 rounded-md px-4 py-2 bg-gray-950 text-violet-50 text-sm font-bold hover:bg-violet-800 transition-colors duration-300">
                        <ArrowPathIcon className="w-6 md:w-5"/>
                        <p className="hidden md:block">Refresh</p>
                    </button>
                </form>
            </div>
            <div className="flex justify-end items-center gap-4">
                <SearchBar placeholder="Search for users"/>
            </div>
            <UsersList data={data} />
            <Pagination totalPages={totalPages}/>
        </main>
    )
}