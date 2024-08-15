'use client'

import {
    PhotoIcon,
    InformationCircleIcon,
    QueueListIcon,
    PlusCircleIcon,
    TrashIcon,
    CalendarDaysIcon
} from '@heroicons/react/24/outline';
import { ChangeEvent, FormEvent, useState } from 'react';
import clsx from 'clsx';
import { useFormState } from 'react-dom';
import { Game } from '@/app/lib/definition';
import ChooseGameModal from './choose_game_modal';
import { formatDate } from '@/app/lib/utility';

export default function EventForm() {
    const [poster, setPoster] = useState<File | null>(null)
    const [eventName, setEventName] = useState<string>('')
    const [eventDescription, setEventDescription] = useState<string>('')
    const [startDate, setStartDate] = useState<string>('')
    const [endDate, setEndDate] = useState<string>('')
    const [games, setGames] = useState<Game[]>([])

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        if(event.target.files && event.target.files[0]){
            setPoster(event.target.files[0])
        }
    }

    const handleAddGames = (newGames: Game[]) => {
        setGames(newGames)

        if(newGames.length === 0) {
            setStartDate('')
            setEndDate('')
        }
        else {
            const minStartDateItem = newGames.reduce((min: Game, current: Game) => {
                const minDate = new Date(min.start_date)
                const currentDate = new Date(current.start_date)
    
                return currentDate < minDate ? current : min
            })
            setStartDate(minStartDateItem.start_date)
    
            const maxEndDateItem = newGames.reduce((max: Game, current: Game) => {
                const maxDate = new Date(max.end_date)
                const currentDate = new Date(current.end_date)
    
                return currentDate > maxDate ? current : max
            })
            setEndDate(maxEndDateItem.end_date)
        }
    }

    const handleRemoveGame = (index: number) => {
        setGames(games.filter((_, i) => i !== index))
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        const formData = new FormData()
        if(poster) formData.append('poster', poster)
        formData.append('name', eventName)
        formData.append('description', eventDescription)
        formData.append('startDate', startDate)
        formData.append('endDate', endDate)
        formData.append('games', JSON.stringify(games))
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="w-full px-6 grid grid-cols-1 divide-y-2 divide-gray-300 lg:py-6 lg:px-0 lg:divide-y-0 lg:divide-x-2 lg:grid-cols-2 bg-white rounded-md shadow-md">
                <div className="relative w-full h-full">
                    <div className="sticky top-0 flex flex-col gap-y-4 py-8 lg:px-8 lg:py-0">
                        <div className="flex gap-x-2 text-gray-950">
                            <InformationCircleIcon className="w-5"/>
                            <h2 className="font-semibold">Basic Information</h2>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="poster" className={ clsx(
                                "overflow-hidden flex cursor-pointer w-full aspect-video rounded-md",
                                {
                                    "relative flex-col gap-y-4 items-center justify-center border-2 border-dashed text-violet-500 border-violet-500 hover:border-violet-800 hover:text-violet-800 transition-colors duration-300": !poster
                                }
                            )}>
                                {poster ? (
                                    <img src={URL.createObjectURL(poster)} alt="Image Preview" className="w-full h-full object-cover"/>
                                ) : (
                                    <>
                                        <div className="absolute inset-4 border-2 border-violet-500 rounded-md hover:border-violet-800 transition-colors duration-300"></div>
                                        <PhotoIcon className="w-16"/>
                                        <p className="text-sm font-semibold">Choose your game's poster</p>
                                    </>
                                )}
                                <input id="poster" type="file" className="hidden" accept="image/png, image/jpeg" onChange={handleImageChange}/>
                            </label>
                            {/* {state.errors?.poster && state.errors.poster.map((error: string) => (
                                <p className="text-xs text-red-700 mt-2" key={error}>{error}</p>
                            ))} */}
                        </div>
                        <div className="relative mt-2 flex flex-col">
                            <input type="text" id="name" value={eventName} className="block w-full py-2 px-0.5 text-sm text-gray-950 bg-transparent border-1 border-l-0 border-r-0 border-t-0 border-gray-500 focus:outline-none focus:ring-0 focus:border-violet-800 transition-colors duration-300 peer" placeholder=" " required onChange={(e) => setEventName(e.target.value)}/>
                            <label htmlFor="name" className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-4 left-0.5 origin-top-left z-10 peer-focus:start-0 peer-focus:text-violet-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0.5 after:content-['*'] after:ml-0.5 after:text-red-500 duration-300">Name</label>
                            {/* {state.errors?.name && state.errors.name.map((error: string) => (
                                <p className="text-xs text-red-700 mt-2" key={error}>{error}</p>
                            ))} */}
                        </div>
                        <div className="relative mt-2 flex flex-col">
                            <textarea id="description" value={eventDescription} maxLength={500} rows={8} className="resize-none block w-full p-2 text-sm text-gray-950 bg-transparent rounded-md border-1 border-gray-500 focus:outline-none focus:ring-0 focus:border-violet-800 transition-colors duration-300 peer" placeholder=" " required onChange={(e) => setEventDescription(e.target.value)}/>
                            <label htmlFor="description" className="absolute bg-white px-2 rounded-full text-sm text-gray-500 transform -translate-y-6 scale-75 top-4 left-0.5 origin-top-left z-10 peer-focus:start-0 peer-focus:text-violet-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0.5 after:content-['*'] after:ml-0.5 after:text-red-500 duration-300">Description</label>
                            {/* {state.errors?.description && state.errors.description.map((error: string) => (
                                <p className="text-xs text-red-700 mt-2" key={error}>{error}</p>
                            ))} */}
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <p className="text-xs text-gray-500">The below fields will be automatically adjusted when you add a game</p>
                            <div className="flex gap-x-4 mt-2">
                                <div className="relative w-1/2 flex flex-col">
                                    <input type="date" id="start_date" value={startDate} className="block w-full py-2 px-0.5 text-sm text-gray-950 bg-transparent border-1 border-l-0 border-r-0 border-t-0 border-gray-500 focus:outline-none focus:ring-0 focus:border-violet-800 disabled:bg-gray-100 disabled:rounded-sm disabled:cursor-not-allowed transition-colors duration-300 peer" placeholder=" " required disabled/>
                                    <label htmlFor="start_date" className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-4 left-0.5 origin-top-left z-10 peer-focus:start-0 peer-focus:text-violet-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0.5 peer-disabled:bg-white peer-disabled:px-2 peer-disabled:rounded-full after:content-['*'] after:ml-0.5 after:text-red-500 duration-300">Start date</label>
                                </div>
                                <div className="relative grow flex flex-col">
                                    <input type="date" id="end_date" value={endDate} className="block w-full py-2 px-0.5 text-sm text-gray-950 bg-transparent border-1 border-l-0 border-r-0 border-t-0 border-gray-500 focus:outline-none focus:ring-0 focus:border-violet-800 disabled:bg-gray-100 disabled:rounded-sm disabled:cursor-not-allowed transition-colors duration-300 peer" placeholder=" " required disabled/>
                                    <label htmlFor="end_date" className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-4 left-0.5 origin-top-left z-10 peer-focus:start-0 peer-focus:text-violet-800 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0.5 peer-disabled:bg-white peer-disabled:px-2 peer-disabled:rounded-full after:content-['*'] after:ml-0.5 after:text-red-500 duration-300">End date</label>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="w-full text-violet-50 text-sm font-bold bg-gray-950 py-4 px-2 rounded-md hover:bg-violet-800 transition-colors duration-300">Submit</button>
                        {/* <div className="flex flex-col">
                            {state.message && (
                                <p className="text-xs text-red-700">{state.message}</p>
                            )}
                            {state.errors?.questions?.generalError && state.errors.questions.generalError.map((error: string) => (
                                <p className="text-xs text-red-700 mt-2" key={error}>{error}</p>
                            ))}
                        </div> */}
                    </div>
                </div>
                <div className="flex flex-col gap-y-4 py-8 lg:px-8 lg:py-0">
                    <div className="flex gap-x-2 text-gray-950">
                        <QueueListIcon className="w-5"/>
                        <h2 className="font-semibold">Games</h2>
                    </div>
                    {games.map((game, index) => {
                        return (
                            <div key={index} className="w-full flex rounded-md shadow-md overflow-hidden gap-x-4">
                                <div className="flex w-2/5 bg-slate-50 overflow-hidden shrink-0 md:w-1/3">
                                    <img src={game.poster} alt="" className="object-cover w-full h-full"/>
                                </div>
                                <div className="py-4 flex flex-col gap-y-2 flex-1 overflow-hidden justify-center">
                                    <p className="text-gray-950 font-bold break-words line-clamp-2">{game.name}</p>
                                    <p className="text-xs text-gray-500 line-clamp-3">{game.description}</p>
                                    <div className="flex gap-x-2 items-center">
                                        <CalendarDaysIcon className="w-5 text-gray-500 shrink-0"/>
                                        <div className="flex-1 overflow-hidden flex flex-col gap-y-1 justify-between sm:flex-row sm:gap-x-2 sm:gap-y-0">
                                            <div className="flex truncate flex-col items-start">
                                                <p className="text-xs font-light text-gray-500">From</p>
                                                <p className="text-xs font-semibold text-gray-700">{formatDate(game.start_date)}</p>
                                            </div>
                                            <div className="flex truncate flex-col items-start">
                                                <p className="text-xs font-light text-gray-500">to</p>
                                                <p className="text-xs font-semibold text-gray-700 text-elipsis">{formatDate(game.end_date)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 pl-0 flex items-start">
                                    <button type="button" className="hover:text-red-700 transition-colors duration-300" onClick={() => handleRemoveGame(index)}>
                                        <TrashIcon className="w-5"/>
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                    <button type="button" className="relative flex w-full h-40 rounded-md flex-col gap-y-4 items-center justify-center border-2 border-dashed text-violet-500 border-violet-500 hover:border-violet-800 hover:text-violet-800 transition-colors duration-300" onClick={() => setIsModalOpen(true)}>
                        <PlusCircleIcon className="w-16"/>
                        <p className="text-sm font-semibold">Add games to your event</p>
                    </button>
                </div>
            </form>
            {isModalOpen && <ChooseGameModal selectedGames={games} onClose={() => setIsModalOpen(false)} onAddGames={handleAddGames}/>}
        </>
    )

}