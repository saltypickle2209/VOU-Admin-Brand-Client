import { baseURL, ItemCollecting, LiveQuiz } from "@/app/lib/definition";
import { getDatePart } from "@/app/lib/utility";
import ItemCollectingEditForm from "@/app/ui/components/games/item_collecting_edit_form";
import LiveQuizEditForm from "@/app/ui/components/games/live_quiz_edit_form";
import { Metadata } from "next";
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
        const response = await fetch(`${baseURL}/game/${id}`, { cache: 'no-store' })
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
        <main className="flex flex-col gap-y-4">
            <h1 className="text-3xl font-bold text-gray-950">✏️ Edit your game</h1>
            <p className="text-sm text-gray-500 hidden md:block">Make changes and submit the form below to update this game item</p>
            {gameTypeId === 1 && <LiveQuizEditForm data={dummyLiveQuiz}/>}
            {gameTypeId === 2 && <ItemCollectingEditForm data={dummyItemCollecting}/>}
        </main>
    )
}