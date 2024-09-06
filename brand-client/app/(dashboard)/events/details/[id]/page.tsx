import { baseURL } from "@/app/lib/definition";
import EventDetail from "@/app/ui/components/events/event_detail";
import LiveQuizDetail from "@/app/ui/components/games/live_quiz_detail";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
    title: 'Events',
};

export default async function Page({ params }: { params: { id: string}}) {
    const id = params.id
    // fetch game data
    let data: any = null

    try{
        const response = await fetch(`${baseURL}/event/${id}`, { cache: 'no-store' })
        if(response.status === 404){
            throw new Error("404")
        }
        if(!response.ok){
            throw new Error("Something went wrong")
        }
        data = await response.json()
    }
    catch (error: any){
        if(error.message === "404"){
            notFound()
        }
        else{
            throw error
        }
    }
    return (
        <main className="flex flex-col gap-y-4">
            <h1 className="text-3xl font-bold text-gray-950">🗃️ Event's detail</h1>
            <p className="text-sm text-gray-500 hidden md:block">You can view some basic information of your created event here</p>
            <EventDetail data={data}/>
        </main>
    )
}