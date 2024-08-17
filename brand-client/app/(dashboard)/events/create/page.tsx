import EventForm from "@/app/ui/components/events/event_form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Create An Event',
};

export default function Page() {
    return (
        <main className="flex flex-col gap-y-4">
            <h1 className="text-3xl font-bold text-gray-950">📆 Create an event</h1>
            <p className="text-sm text-gray-500 hidden md:block">Complete the form below to create a new event</p>
            <EventForm/>
        </main>
    )
}