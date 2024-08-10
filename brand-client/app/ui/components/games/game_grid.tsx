import Link from "next/link";
import Image from 'next/image';
import {
    CalendarDaysIcon,
    PuzzlePieceIcon,
    TicketIcon
} from '@heroicons/react/24/outline';
import GameType from "./game_type";
import Voucher from "./voucher";

const data = [
    {
        id: "1",
        name: "Something",
        poster: "https://homepage.momocdn.net/blogscontents/momo-upload-api-220422091342-637862156227500692.jpg",
        start_time: "10/08/2024",
        end_time: "20/08/2024",
        game_type_id: "",
        voucher_template_id: ""
    },
    {
        id: "2",
        name: "This is a really really long title so you should see it being ellipsised",
        poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDwmTgq-HCJZfeskytZ1MAJqkjXdBqQi5wVQ&s",
        start_time: "12/08/2024",
        end_time: "13/08/2024",
        game_type_id: "",
        voucher_template_id: ""
    },
    {
        id: "3",
        name: "Game 1",
        poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmUbXIH85ZcmIpMRatVL08HSbZSWVdDP5nnw&s",
        start_time: "15/08/2024",
        end_time: "31/08/2024",
        game_type_id: "",
        voucher_template_id: ""
    },
    {
        id: "4",
        name: "Game 2",
        poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmUbXIH85ZcmIpMRatVL08HSbZSWVdDP5nnw&s",
        start_time: "dd/mm/yyyy",
        end_time: "dd/mm/yyyy",
        game_type_id: "",
        voucher_template_id: ""
    },
    {
        id: "5",
        name: "Game 3",
        poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmUbXIH85ZcmIpMRatVL08HSbZSWVdDP5nnw&s",
        start_time: "dd/mm/yyyy",
        end_time: "dd/mm/yyyy",
        game_type_id: "",
        voucher_template_id: ""
    },
    {
        id: "6",
        name: "Game 4",
        poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmUbXIH85ZcmIpMRatVL08HSbZSWVdDP5nnw&s",
        start_time: "dd/mm/yyyy",
        end_time: "dd/mm/yyyy",
        game_type_id: "",
        voucher_template_id: ""
    }
]

export default function GamesGrid({ query, currentPage }: { query: string, currentPage: number }){
    // fetch data using query & currentPage
    return (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {data.map((game) => {
                return (
                    <Link key={game.id} href="/" className="flex flex-col h-full gap-y-2 p-4 bg-white rounded-md shadow-md overflow-hidden hover:bg-gray-100 transition-colors duration-300">
                        <div className="flex w-full aspect-video rounded-md bg-slate-50 overflow-hidden">
                            <img src={game.poster} alt="" className="object-cover"/>
                        </div>
                        <p className="text-gray-950 font-bold break-words line-clamp-2">{game.name}</p>
                        <div className="flex gap-x-4 items-center">
                            <CalendarDaysIcon className="w-5 text-gray-500 shrink-0"/>
                            <div className="grow flex flex-col gap-y-1 justify-between sm:flex-row sm:gap-x-2 sm:gap-y-0">
                                <div className="flex flex-row items-center gap-x-2 sm:flex-col sm:items-start sm:gap-x-0">
                                    <p className="text-xs font-light text-gray-500">From</p>
                                    <p className="text-sm font-semibold text-gray-700 text-ellipsis">{game.start_time}</p>
                                </div>
                                <div className="flex flex-row items-center gap-x-2 sm:flex-col sm:items-start sm:gap-x-0">
                                    <p className="text-xs font-light text-gray-500">to</p>
                                    <p className="text-sm font-semibold text-gray-700 text-elipsis">{game.end_time}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-x-4 items-center">
                            <PuzzlePieceIcon className="w-5 text-gray-500 shrink-0"/>
                            <div className="grow flex flex-col">
                                <p className="text-xs font-light text-gray-500">Game type</p>
                                <GameType game_type_id={game.game_type_id}/>
                            </div>
                        </div>
                        <div className="flex gap-x-4 items-center">
                            <TicketIcon className="w-5 text-gray-500 shrink-0"/>
                            <div className="grow flex flex-col">
                                <p className="text-xs font-light text-gray-500">Voucher</p>
                                <Voucher voucher_template_id={game.voucher_template_id}/>
                            </div>
                        </div>
                        <div className="w-full h-2 mt-auto bg-gray-300 rounded-full relative overflow-hidden after:absolute after:content-[''] after:left-0 after:w-[60%] after:bg-violet-500 after:inset-y-0 after:rounded-md"/>
                    </Link>
                )
            })}
        </div>
    )
}