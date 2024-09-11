import { baseURL, ItemCollecting, LiveQuiz } from "@/app/lib/definition";
import { getToken } from "@/app/lib/server_utility";
import { getDatePart } from "@/app/lib/utility";
import ItemCollectingEditForm from "@/app/ui/components/games/item_collecting_edit_form";
import LiveQuizEditForm from "@/app/ui/components/games/live_quiz_edit_form";
import { ArrowLeftIcon, FaceFrownIcon } from "@heroicons/react/24/solid";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
    title: 'Update A Game',
};

//remember to add props
export default async function Page({ params }: { params: { id: string }}){
    const id = params.id
    // fetch game info
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

    // fetch game data

    // fetch voucher list

    const gameTypeId = data.game_type_id

    const today = new Date()
    const startDate = new Date(data.start_time)
    today.setHours(0, 0, 0, 0)
    startDate.setHours(0, 0, 0, 0)

    const dummyLiveQuiz: LiveQuiz = {
        poster: data.poster,
        name: data.name,
        description: data.description,
        voucher: "2",
        amount: data.amount,
        startDate: getDatePart(data.start_time),
        endDate: getDatePart(data.end_time),
        questions: [
            {
                question: "What is the capital of France",
                answerA: "Paris",
                answerB: "Melbourne",
                answerC: "Coconut",
                answerD: "Nah",
                correctAnswer: "2",
                scriptPostQuestion: "This is some post question comment",
                scriptAnswer: "This is some answer comment"
            }
        ],
        scriptQuizIntroduction: "This is some quiz's instruction"
    }

    const dummyItemCollecting: ItemCollecting = {
        poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmUbXIH85ZcmIpMRatVL08HSbZSWVdDP5nnw&s",
        name: "Some text",
        description: "Something",
        voucher: "2",
        amount: "500",
        startDate: "2024-08-13",
        endDate: "2024-10-13",
        items: [
            {
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmUbXIH85ZcmIpMRatVL08HSbZSWVdDP5nnw&s",
                name: "Item 1",
                description: "Description 1",
                ratio: "25"
            },
            {
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmUbXIH85ZcmIpMRatVL08HSbZSWVdDP5nnw&s",
                name: "Item 2",
                description: "Description 2",
                ratio: "50"
            },
            {
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmUbXIH85ZcmIpMRatVL08HSbZSWVdDP5nnw&s",
                name: "Item 3",
                description: "Description 3",
                ratio: "50"
            },
            {
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmUbXIH85ZcmIpMRatVL08HSbZSWVdDP5nnw&s",
                name: "Item 4",
                description: "Description 4",
                ratio: "50"
            },
            {
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmUbXIH85ZcmIpMRatVL08HSbZSWVdDP5nnw&s",
                name: "Item 5",
                description: "Description 5",
                ratio: "100"
            },
            {
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmUbXIH85ZcmIpMRatVL08HSbZSWVdDP5nnw&s",
                name: "Item 6",
                description: "Description 6",
                ratio: "1000"
            }
        ],
        itemSets: [
            {
                name: "Item set 1",
                description: "Description meo meo meo",
                items: ['0', '1', '5']
            }
        ]
    }

    return (
        <>
            {startDate <= today ? (
                <div className="h-full flex flex-col p-16 gap-y-4 items-center justify-center text-gray-950 lg:px-48">
                    <FaceFrownIcon className="w-16"/>
                    <div className="flex flex-col gap-y-2 items-center">
                      <h2 className="font-semibold">You cannot edit this game!</h2>
                      <p className="text-xs text-gray-500 text-center">This game has already started. For security reasons, this item will be no longer available for editing.</p>
                    </div>
                    <Link href="/games" className="flex items-center justify-center gap-2 rounded-md px-4 py-2 bg-gray-950 text-violet-50 text-sm font-bold hover:bg-violet-800 transition-colors duration-300">
                      <ArrowLeftIcon className="w-5"/>
                      <p>Go back</p>
                    </Link>
                </div>
            ): (
                <main className="flex flex-col gap-y-4">
                    <h1 className="text-3xl font-bold text-gray-950">✏️ Edit your game</h1>
                    <p className="text-sm text-gray-500 hidden md:block">Make changes and submit the form below to update this game item</p>
                    {gameTypeId === 1 && <LiveQuizEditForm data={dummyLiveQuiz} id={id}/>}
                    {gameTypeId === 2 && <ItemCollectingEditForm data={dummyItemCollecting} id={id} gameDataId={data.game_data_id}/>}
                </main>
            )}
        </>
    )
}