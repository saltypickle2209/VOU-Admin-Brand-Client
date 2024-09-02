import { LiveQuiz } from "@/app/lib/definition";
import LiveQuizEditForm from "@/app/ui/components/games/live_quiz_edit_form";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
    title: 'Update A Game',
};

//remember to add props
export default function Page({ params }: { params: { id: string }}){
    const id = params.id
    // fetch game info

    // check existence
    // if(!data) {
    //     notFound()
    // }

    // fetch game data

    // fetch voucher list

    const dummyLiveQuiz: LiveQuiz = {
        poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmUbXIH85ZcmIpMRatVL08HSbZSWVdDP5nnw&s",
        name: "Some text",
        description: "Something",
        voucher: "2",
        amount: "500",
        startDate: "2024-08-13",
        endDate: "2024-10-13",
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

    return (
        <main className="flex flex-col gap-y-4">
            <h1 className="text-3xl font-bold text-gray-950">✏️ Edit your game</h1>
            <p className="text-sm text-gray-500 hidden md:block">Make changes and submit the form below to update this game item</p>
            <LiveQuizEditForm data={dummyLiveQuiz}/>
        </main>
    )
}