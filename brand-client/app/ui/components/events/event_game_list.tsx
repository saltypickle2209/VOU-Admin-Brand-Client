import { baseURL } from "@/app/lib/definition"
import { formatDate } from "@/app/lib/utility"
import { ChevronRightIcon, CubeTransparentIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

export default async function EventGameList({ eventId }: { eventId: string }){
    let data: any = null
    let isEmpty: boolean = false

    try{
        const response = await fetch(`${baseURL}/game/event/${eventId}`, { cache: 'no-store' })
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
            isEmpty = true
        }
        else{
            throw error
        }
    }

    return (
        <>
            {isEmpty ? (
                <div className="flex flex-col gap-y-2">
                    <p className="text-gray-950 font-semibold">Games (?🤔?)</p>
                    <div className="h-full flex flex-col p-16 gap-y-4 items-center justify-center text-gray-950">
                        <CubeTransparentIcon className="w-16"/>
                        <div className="flex flex-col gap-y-2 items-center">
                            <h2 className="font-semibold">It's empty here!</h2>
                            <p className="text-xs text-gray-500 text-center">Pretty sure this event is a part of the dummy data :3</p>
                        </div>
                    </div>
                </div>
            ): (
                <div className="flex flex-col gap-y-2">
                    <p className="text-gray-950 font-semibold">{`Games (${data.length})`}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                        {data.map((item: any) => (
                            <Link key={item.id} href={`/games/details/${item.id}`} className="relative group w-full aspect-video rounded-md overflow-hidden flex items-end">
                                <img src={item.poster} alt="Image Preview" className="absolute h-full w-full object-cover group-hover:scale-110 transition-all duration-300"/>
                                <div className="grow flex gap-x-2 p-2 text-white opacity-0 transform translate-y-4 rounded-t-md group-hover:opacity-100 group-hover:translate-y-0 group-hover:bg-gray-700 group-hover:bg-opacity-70 transition-all duration-300">
                                    <div className="grow flex flex-col gap-y-2">
                                        <p className="text-sm font-semibold line-clamp-1">{item.name}</p>
                                        <p className="text-xs">{`${formatDate(item.start_time)} ~ ${formatDate(item.end_time)}`}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <ChevronRightIcon className="w-5"/>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}