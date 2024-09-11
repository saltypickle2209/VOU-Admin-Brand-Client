import { baseURL } from "@/app/lib/definition";
import { getToken } from "@/app/lib/server_utility";
import ItemCollectingDetail from "@/app/ui/components/games/item_collecting_detail";
import LiveQuizDetail from "@/app/ui/components/games/live_quiz_detail";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
    title: 'Games',
};

export default async function Page({ params }: { params: { id: string}}) {
    const id = params.id
    // fetch game data
    let data: any = null

    try{
        const response = await fetch(`${baseURL}/game/${id}`, { 
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

    const gameTypeId = data.game_type_id

    let gameData: any = null
    // fetch game_data
    if(gameTypeId === 1) {
        try{
            const response = await fetch(`${baseURL}/quiz/${data.game_data_id}`, { 
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
                notFound()
            }
            else{
                throw error
            }
        }
    }

    
    
    return (
        <main className="flex flex-col gap-y-4">
            <h1 className="text-3xl font-bold text-gray-950">🎮 Game's detail</h1>
            <p className="text-sm text-gray-500 hidden md:block">You can view some basic information of your created game here</p>
            {gameTypeId === 1 && <LiveQuizDetail data={data} gameData={gameData}/>}
            {gameTypeId === 2 && <ItemCollectingDetail data={data}/>}
        </main>
    )
}