import { baseURL } from "@/app/lib/definition"
import { getToken } from "@/app/lib/server_utility"

export default async function GameType({ game_type_id }: {game_type_id: any}) {
    let data: any = null
    
    try{
        const response = await fetch(`${baseURL}/game/gametype/${game_type_id}`, {
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        })
        if(!response.ok){
            throw new Error()
        }
        data = await response.json()
    }
    catch (error: any){
        throw new Error(error.message)
    }
    return (
        <p className="text-xs font-semibold text-gray-700 sm:text-sm">{data.name}</p>
    )
}