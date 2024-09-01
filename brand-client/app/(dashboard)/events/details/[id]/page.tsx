import EventDetail from "@/app/ui/components/events/event_detail";
import LiveQuizDetail from "@/app/ui/components/games/live_quiz_detail";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Events',
};

export default function Page({ params }: { params: { id: string}}) {
    const id = params.id
    // fetch game data

    // check existence
    // if(!data) {
    //     notFound()
    // }
    return (
        <main className="flex flex-col gap-y-4">
            <h1 className="text-3xl font-bold text-gray-950">🗃️ Event's detail</h1>
            <p className="text-sm text-gray-500 hidden md:block">You can view some basic information of your created event here</p>
            <EventDetail eventId={id}/>
        </main>
    )
}