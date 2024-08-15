import Link from "next/link";
import {
    CalendarDaysIcon
} from '@heroicons/react/24/outline';

const data = [
    {
        id: "1",
        name: "Something",
        poster: "https://homepage.momocdn.net/blogscontents/momo-upload-api-220422091342-637862156227500692.jpg",
        start_time: "10/08/2024",
        end_time: "20/08/2024"
    },
    {
        id: "2",
        name: "This is a really really long title so you should see it being ellipsised",
        poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDwmTgq-HCJZfeskytZ1MAJqkjXdBqQi5wVQ&s",
        start_time: "12/08/2024",
        end_time: "13/08/2024"
    },
    {
        id: "3",
        name: "Event 1",
        poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmUbXIH85ZcmIpMRatVL08HSbZSWVdDP5nnw&s",
        start_time: "15/08/2024",
        end_time: "31/08/2024"
    },
    {
        id: "4",
        name: "Event 2",
        poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmUbXIH85ZcmIpMRatVL08HSbZSWVdDP5nnw&s",
        start_time: "dd/mm/yyyy",
        end_time: "dd/mm/yyyy"
    },
    {
        id: "5",
        name: "Event 3",
        poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmUbXIH85ZcmIpMRatVL08HSbZSWVdDP5nnw&s",
        start_time: "dd/mm/yyyy",
        end_time: "dd/mm/yyyy",
        event_type_id: "",
        voucher_template_id: ""
    },
    {
        id: "6",
        name: "Event 4",
        poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmUbXIH85ZcmIpMRatVL08HSbZSWVdDP5nnw&s",
        start_time: "dd/mm/yyyy",
        end_time: "dd/mm/yyyy"
    }
]

export default function EventsGrid({ query, currentPage }: { query: string, currentPage: number }){
    // fetch data using query & currentPage
    return (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {data.map((event) => {
                return (
                    <Link key={event.id} href="/" className="flex flex-col h-full gap-y-2 p-4 bg-white rounded-md shadow-md overflow-hidden hover:bg-gray-100 transition-colors duration-300">
                        <div className="flex w-full aspect-video rounded-md bg-slate-50 overflow-hidden">
                            <img src={event.poster} alt="" className="object-cover w-full h-full"/>
                        </div>
                        <p className="text-gray-950 font-bold break-words line-clamp-2">{event.name}</p>
                        <div className="flex gap-x-4 items-center mt-auto">
                            <CalendarDaysIcon className="w-5 text-gray-500 shrink-0"/>
                            <div className="flex-1 overflow-hidden flex flex-col gap-y-1 justify-between sm:flex-row sm:gap-x-2 sm:gap-y-0">
                                <div className="flex truncate flex-col items-start">
                                    <p className="text-xs font-light text-gray-500">From</p>
                                    <p className="text-xs font-semibold text-gray-700 sm:text-sm">{event.start_time}</p>
                                </div>
                                <div className="flex truncate flex-col items-start">
                                    <p className="text-xs font-light text-gray-500">to</p>
                                    <p className="text-xs font-semibold text-gray-700 sm:text-sm">{event.end_time}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}