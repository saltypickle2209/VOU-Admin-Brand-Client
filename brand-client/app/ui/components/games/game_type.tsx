import { baseURL } from "@/app/lib/definition"

export default async function GameType({ game_type_id }: {game_type_id: any}) {
    let data: any = null
    
    try{
        const response = await fetch(`${baseURL}/game/gametype/${game_type_id}`)
        if(!response.ok){
            throw new Error()
        }
        data = await response.json()
    }
    catch (error){
        throw new Error('Something went wrong')
    }
    return (
        <p className="text-xs font-semibold text-gray-700 sm:text-sm">{data.name}</p>
    )
}