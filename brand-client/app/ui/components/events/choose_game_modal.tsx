import { Game } from '@/app/lib/definition';
import {
    XMarkIcon,
    CubeTransparentIcon,
    ArrowLongRightIcon
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import GameList from './game_list';

export default function ChooseGameModal({
    selectedGames,
    onClose,
    onAddGames
}: {
    selectedGames: Game[],
    onClose: () => void,
    onAddGames: (games: Game[]) => void
}) {
    // fetch game's data and parse to Game[]
    const data: Game[] = [
        {
            id: "1",
            poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmUbXIH85ZcmIpMRatVL08HSbZSWVdDP5nnw&s",
            name: "Event 1 bla bla bla bla bla bla bla bla bla bla bla bla",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum doloremque autem est, quo temporibus error iste quis minus ut officiis? Sed illum maxime dolorum aspernatur placeat sint pariatur delectus, nulla neque ipsum.",
            start_date: "2024-08-14",
            end_date: "2024-08-15",
            game_type_id: "1",
            voucher: "1",
            amount: "500"
        },
        {
            id: "2",
            poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmUbXIH85ZcmIpMRatVL08HSbZSWVdDP5nnw&s",
            name: "Event 2",
            description: "Something here",
            start_date: "2024-08-16",
            end_date: "2024-08-20",
            game_type_id: "1",
            voucher: "1",
            amount: "500"
        },
        {
            id: "3",
            poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmUbXIH85ZcmIpMRatVL08HSbZSWVdDP5nnw&s",
            name: "Event 3",
            description: "Something fishy here",
            start_date: "2024-08-20",
            end_date: "2024-08-30",
            game_type_id: "1",
            voucher: "1",
            amount: "500"
        },
        {
            id: "4",
            poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmUbXIH85ZcmIpMRatVL08HSbZSWVdDP5nnw&s",
            name: "Event 4",
            description: "Something fishy here",
            start_date: "2024-08-20",
            end_date: "2024-08-30",
            game_type_id: "1",
            voucher: "1",
            amount: "500"
        },
        {
            id: "5",
            poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmUbXIH85ZcmIpMRatVL08HSbZSWVdDP5nnw&s",
            name: "Event 5",
            description: "Something fishy here",
            start_date: "2024-08-20",
            end_date: "2024-08-30",
            game_type_id: "1",
            voucher: "1",
            amount: "500"
        },
    ] 

    // check if data is empty
    const empty: boolean = false

    return (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 z-50 flex justify-center items-center">
            <div className="absolute inset-0 -z-10" onClick={onClose}></div>
            <div className="w-11/12 h-4/5 rounded-md shadow-md bg-violet-50 md:w-3/5">
                <div className="flex flex-col gap-y-4 h-full w-full p-6">
                    <div className="flex justify-between items-center">
                        <p className="text-gray-950 text-xl font-semibold">Select games to add</p>
                        <button onClick={onClose}>
                            <XMarkIcon className="w-5 md:w-6"/>
                        </button>   
                    </div>
                    <div className="grow flex flex-col gap-y-2 justify-center items-center overflow-y-auto overflow-x-hidden">
                        {empty ? (
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
                            <GameList data={data} selectedGames={selectedGames} onClose={onClose} onAddGames={onAddGames}/>
                        )}
                    </div>    
                </div>
            </div>
        </div>
    )
}