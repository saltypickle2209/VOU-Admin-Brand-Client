import { baseURL, Game } from "@/app/lib/definition";
import Link from 'next/link';
import GameList from './game_list';
import { getClientSideToken, getDatePart } from '@/app/lib/utility';
import {
    CubeTransparentIcon,
    ArrowLongRightIcon
} from '@heroicons/react/24/outline';
import { useEffect, useState } from "react";
import GameListSkeleton from "./game_list_skeleton";

export default function ChooseGameModalContent({
    selectedGames,
    onClose,
    onAddGames
}: {
    selectedGames: Game[],
    onClose: () => void,
    onAddGames: (games: Game[]) => void
}) {
    const [gameData, setGameData] = useState<Game[]>([])
    const [isEmpty, setIsEmpty] = useState<boolean>(false)
    const [isFetching, setIsFetching] = useState<boolean>(true)

    // client component can't be an async function, so useEffect should be used instead
    // fetch game's data and parse to Game[]
    useEffect(() => {
        async function fetchGames() {
            let res = await fetch(`${baseURL}/game/noEvent/upcoming`, {
                headers: {
                    'Authorization': `Bearer ${getClientSideToken()}`
                }
            })

            if(!res.ok) {
                setIsEmpty(true)
                setIsFetching(false)
            }
            else {
                let data = await res.json()
    
                const formattedData: Game[] = data.games.map((item: any) => ({
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

                setGameData(formattedData)
                setIsEmpty(data.length === 0)
                setIsFetching(false)
            }
        }
        fetchGames()
    }, [])
    
    return (
        <>
            {isFetching ? (
                <GameListSkeleton/>
            ): isEmpty ? (
                <>
                    <CubeTransparentIcon className="w-16 text-gray-950"/>
                    <p className="text-gray-950 font-semibold">Oops! It's empty here!</p>
                    <p className="text-sm text-gray-500">You can create a new game before continuing</p>
                    <Link href="/games/create" className="mt-2 flex gap-x-2 justify-center items-center text-violet-50 text-sm font-bold bg-gray-950 py-3 md:py-4 px-8 rounded-md hover:bg-violet-800 transition-colors duration-300">
                        <span>Create a new game</span>
                        <ArrowLongRightIcon className="w-5 md:w-6"/>
                    </Link>
                </>
            ) : (
                <GameList data={gameData} selectedGames={selectedGames} onClose={onClose} onAddGames={onAddGames}/>
            )}
        </>
    )
}