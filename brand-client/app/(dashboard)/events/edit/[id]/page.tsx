import { baseURL, Event, Game } from "@/app/lib/definition";
import { getDatePart } from "@/app/lib/utility";
import EventEditForm from "@/app/ui/components/events/event_edit_form";
import LiveQuizEditForm from "@/app/ui/components/games/live_quiz_edit_form";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
    title: 'Update An Event',
};

export default async function Page({ params }: { params: { id: string }}){
    const id = params.id
    // fetch event info
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

    // fetch event's games' data
    let gameData: any = null

    try{
        const response = await fetch(`${baseURL}/game/event/${data.id}`, { cache: 'no-store' })
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

    return (
        <main className="flex flex-col gap-y-4">
            <h1 className="text-3xl font-bold text-gray-950">✏️ Edit your event</h1>
            <p className="text-sm text-gray-500 hidden md:block">Make changes and submit the form below to update this event item</p>
            <EventEditForm data={dummyEvent}/>
        </main>
    )
}