'use client'

import { Game } from "@/app/lib/definition";
import { useState } from "react";
import {
    CalendarDaysIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { formatDate } from "@/app/lib/utility";

export default function GameList({ 
    data,
    selectedGames,
    onClose,
    onAddGames
}: { 
    data: Game[],
    selectedGames: Game[],
    onClose: () => void,
    onAddGames: (games: Game[]) => void
}){
    const [selectedItems, setSelectedItems] = useState<Game[]>(selectedGames)

    // update this to check id only
    const areEqualObject = (obj1: Game, obj2: Game): boolean => {
        if (obj1 === undefined || obj2 === undefined)
            return false
        return JSON.stringify(obj1) === JSON.stringify(obj2)
    }

    const toggleItemSelection = (item: Game) => {
        setSelectedItems((prevSelectedItems) =>
            prevSelectedItems.some(i => areEqualObject(item, i))
              ? prevSelectedItems.filter((i) => !areEqualObject(item, i))
              : [...prevSelectedItems, item]
        );
    }

    const handleAddGames = () => {
        onAddGames(selectedItems)
        onClose()
    }
    
    return (
        <>
            <div className="grow w-full overflow-y-auto">
                <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 px-1 pb-4">
                    {data.map((game) => {
                        return (
                            <div key={game.id} className={clsx(
                                "flex flex-col h-full gap-y-2 p-4 rounded-md shadow-md overflow-hidden hover:cursor-pointer transition-colors duration-300",
                                {
                                    "bg-white hover:bg-gray-100": !selectedItems.some(i => areEqualObject(game, i)),
                                    "bg-violet-200": selectedItems.some(i => areEqualObject(game, i))
                                }
                             )} onClick={() => toggleItemSelection(game)}>
                                <div className="flex w-full aspect-video rounded-md bg-slate-50 overflow-hidden">
                                    <img src={game.poster} alt="" className="object-cover w-full h-full"/>
                                </div>
                                <p className="text-gray-950 font-bold break-words line-clamp-2">{game.name}</p>
                                <div className="flex gap-x-4 items-center mt-auto">
                                    <CalendarDaysIcon className="w-5 text-gray-500 shrink-0"/>
                                    <div className="grow flex flex-col gap-y-1 justify-between sm:flex-row sm:gap-x-2 sm:gap-y-0">
                                        <div className="flex flex-row items-center gap-x-2 sm:flex-col sm:items-start sm:gap-x-0">
                                            <p className="text-xs font-light text-gray-500">From</p>
                                            <p className="text-xs font-semibold text-gray-700 text-ellipsis sm:text-sm">{formatDate(game.start_date)}</p>
                                        </div>
                                        <div className="flex flex-row items-center gap-x-2 sm:flex-col sm:items-start sm:gap-x-0">
                                            <p className="text-xs font-light text-gray-500">to</p>
                                            <p className="text-xs font-semibold text-gray-700 text-elipsis sm:text-sm">{formatDate(game.end_date)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="flex flex-col pt-2 justify-between w-full gap-2 md:items-center md:flex-row">
                <span className="text-sm text-gray-500">{`Selected ${selectedItems.length} games`}</span>
                <div className="flex gap-x-2">
                    <button className="text-gray-950 w-1/2 text-xs font-bold bg-transparent border-2 border-gray-950 py-3 px-4 rounded-md hover:border-red-700 hover:text-red-700 md:w-36 transition-colors duration-300" onClick={() => setSelectedItems([])}>Clear</button>
                    <button className="text-violet-50 w-1/2 text-xs font-bold bg-gray-950 py-3 px-4 rounded-md hover:bg-violet-800 md:w-36 transition-colors duration-300" onClick={handleAddGames}>{`Save changes`}</button>
                </div>
            </div> 
        </>
    )
}