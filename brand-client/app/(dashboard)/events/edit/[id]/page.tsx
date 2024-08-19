import { Event } from "@/app/lib/definition";
import EventEditForm from "@/app/ui/components/events/event_edit_form";
import LiveQuizEditForm from "@/app/ui/components/games/live_quiz_edit_form";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
    title: 'Update An Event',
};

//remember to add props
export default function Page({ params }: { params: { id: string }}){
    const id = params.id
    // fetch event info

    // check existence
    // if(!data) {
    //     notFound()
    // }

    //fectch event's game's info

    const dummyEvent: Event = {
        id: "1",
        poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmUbXIH85ZcmIpMRatVL08HSbZSWVdDP5nnw&s",
        name: "Event name",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident pariatur ut voluptatum ipsam laboriosam quam maxime dolores, error sint quo fugiat minima, quod, obcaecati enim. Nisi accusamus fugit quam similique, tempore quasi.",
        start_date: "2024-08-13",
        end_date: "2024-08-25",
        games: [
            {
                id: "6",
                poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmUbXIH85ZcmIpMRatVL08HSbZSWVdDP5nnw&s",
                name: "Event 6",
                description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum doloremque autem est, quo temporibus error iste quis minus ut officiis? Sed illum maxime dolorum aspernatur placeat sint pariatur delectus, nulla neque ipsum.",
                start_date: "2024-08-13",
                end_date: "2024-08-21",
                game_type_id: "1",
                voucher: "1",
                amount: "500"
            },
            {
                id: "7",
                poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmUbXIH85ZcmIpMRatVL08HSbZSWVdDP5nnw&s",
                name: "Event 7",
                description: "Something fishy here",
                start_date: "2024-08-15",
                end_date: "2024-08-25",
                game_type_id: "1",
                voucher: "1",
                amount: "500"
            }
        ]
    }

    return (
        <main className="flex flex-col gap-y-4">
            <h1 className="text-3xl font-bold text-gray-950">✏️ Edit your event</h1>
            <p className="text-sm text-gray-500 hidden md:block">Make changes and submit the form below to update this event item</p>
            <EventEditForm data={dummyEvent}/>
        </main>
    )
}