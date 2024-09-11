import { baseURL, Event, Game } from "@/app/lib/definition";
import { getToken } from "@/app/lib/server_utility";
import { getDatePart } from "@/app/lib/utility";
import EventEditForm from "@/app/ui/components/events/event_edit_form";
import LiveQuizEditForm from "@/app/ui/components/games/live_quiz_edit_form";
import { ArrowLeftIcon, FaceFrownIcon } from "@heroicons/react/24/solid";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
    title: 'Update An Event',
};

export default async function Page({ params }: { params: { id: string }}){
    const id = params.id
    // fetch event info
    let data: any = null

    try{
        const response = await fetch(`${baseURL}/event/${id}`, { 
            cache: 'no-store',
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        })
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

    // fetch event's games' data
    let gameData: any = null

    try{
        const response = await fetch(`${baseURL}/game/event/${data.id}`, { 
            cache: 'no-store',
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        })
        if(response.status === 404){
            throw new Error("404")
        }
        if(!response.ok){
            throw new Error("Something went wrong")
        }
        gameData = await response.json()
    }
    catch (error: any){
        if(error.message === "404"){
            gameData = []
        }
        else{
            throw error
        }
    }

    const gameList: Game[] = gameData.map((item: any) => ({
        id: item.id,
        poster: item.poster,
        name: item.name,
        description: item.description,
        start_date: getDatePart(item.start_time),
        end_date: getDatePart(item.end_time),
        game_type_id: item.game_type_id,
        voucher: item.voucher_template_id,
        amount: item.amount
    }))

    const dummyEvent: Event = {
        id: data.id,
        poster: data.poster,
        name: data.name,
        description: data.description,
        start_date: getDatePart(data.start_time),
        end_date: getDatePart(data.end_time),
        games: gameList
    }

    const today = new Date()
    const startDate = new Date(data.start_time)
    today.setHours(0, 0, 0, 0)
    startDate.setHours(0, 0, 0, 0)

    return (
        <>
            {startDate <= today ? (
                <div className="h-full flex flex-col p-16 gap-y-4 items-center justify-center text-gray-950 lg:px-48">
                    <FaceFrownIcon className="w-16"/>
                    <div className="flex flex-col gap-y-2 items-center">
                      <h2 className="font-semibold">You cannot edit this event!</h2>
                      <p className="text-xs text-gray-500 text-center">This event has already started. For security reasons, this item will be no longer available for editing.</p>
                    </div>
                    <Link href="/games" className="flex items-center justify-center gap-2 rounded-md px-4 py-2 bg-gray-950 text-violet-50 text-sm font-bold hover:bg-violet-800 transition-colors duration-300">
                      <ArrowLeftIcon className="w-5"/>
                      <p>Go back</p>
                    </Link>
                </div>
            ): (
                <main className="flex flex-col gap-y-4">
                    <h1 className="text-3xl font-bold text-gray-950">✏️ Edit your event</h1>
                    <p className="text-sm text-gray-500 hidden md:block">Make changes and submit the form below to update this event item</p>
                    <EventEditForm data={dummyEvent} id={id}/>
                </main>
            )}
        </>
    )
}