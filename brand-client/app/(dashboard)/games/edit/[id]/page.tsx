import { baseURL, ItemCollecting, LiveQuiz } from "@/app/lib/definition";
import { getToken } from "@/app/lib/server_utility";
import { getDatePart, getDateTime } from "@/app/lib/utility";
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

    const gameTypeId = data.game_type_id

    let gameData: any = null
    let gameFullData: any = null
    // fetch game_data
    if(gameTypeId === 1) {
        try{
            const response = await fetch(`${baseURL}/quiz/${data.game_data_id}`, { 
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
            gameData = await response.json()
        }
        catch (error: any){
            if(error.message === "404"){
                notFound()
            }
            else{
                throw error
            }
        }

        const questions = gameData.quizzes.map((quiz: any) => ({
            question: quiz.question,
            answerA: quiz.options[0],
            answerB: quiz.options[1],
            answerC: quiz.options[2],
            answerD: quiz.options[3],
            correctAnswer: quiz.options.indexOf(quiz.correctAnswer).toString(),
            scriptPostQuestion: quiz.scriptQuestion.text,
            scriptAnswer: quiz.scriptAnswer.text
        }))

        gameFullData = {
            poster: data.poster,
            name: data.name,
            description: data.description,
            voucher: "2",
            amount: data.amount,
            startDate: getDateTime(data.start_time),
            endDate: getDateTime(data.end_time),
            questions: questions,
            scriptQuizIntroduction: gameData.scriptIntro.text
        }
    }
    else if(gameTypeId === 2){
        gameData = {
            items: [],
            itemSets: []
        }

        try{
            const response = await fetch(`${baseURL}/gacha/itemsByGame/${data.game_data_id}`, { 
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
            const items = await response.json()
            gameData.items = items.items
        }
        catch (error: any){
            if(error.message === "404"){
                notFound()
            }
            else{
                throw error
            }
        }

        try{
            const response = await fetch(`${baseURL}/gacha/itemSetByGameID/${data.game_data_id}`, { 
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
            const itemSets = await response.json()
            gameData.itemSets = itemSets.itemSets
        }
        catch (error: any){
            if(error.message === "404"){
                notFound()
            }
            else{
                throw error
            }
        }

        const gameIds = gameData.items.map((item: any) => (item._id))
        const items = gameData.items.map((item: any) => ({
            _id: item._id,
            image: item.img,
            name: item.name,
            description: item.description,
            ratio: item.ratio
        }))
        const itemSets = gameData.itemSets.map((set: any) => {
            const itemIndexes = set.items.map((id: any) => (gameIds.indexOf(id).toString()))
            return ({
                _id: set._id,
                name: set.name,
                description: set.description,
                items: itemIndexes
            })
        })

        gameFullData = {
            poster: data.poster,
            name: data.name,
            description: data.description,
            voucher: "2",
            amount: data.amount,
            startDate: getDatePart(data.start_time),
            endDate: getDatePart(data.end_time),
            items: items,
            itemSets: itemSets
        }
    }

    const today = new Date()
    const startDate = new Date(data.start_time)
    today.setHours(0, 0, 0, 0)
    startDate.setHours(0, 0, 0, 0)

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
                    {gameTypeId === 1 && <LiveQuizEditForm data={gameFullData} id={id} gameDataId={data.game_data_id}/>}
                    {gameTypeId === 2 && <ItemCollectingEditForm data={gameFullData} id={id} gameDataId={data.game_data_id}/>}
                </main>
            )}
        </>
    )
}