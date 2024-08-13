import LiveQuizForm from "@/app/ui/components/games/live_quiz_form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Create A Game',
};

export default function Page() {
    // fetch voucher list
    return (
        <main className="flex flex-col gap-y-4">
            <h1 className="text-3xl font-bold text-gray-950">🎤 Create a live quiz game</h1>
            <p className="text-sm text-gray-500 hidden md:block">Complete the form below to create a new live quiz game</p>
            <LiveQuizForm/>
        </main>
    )
}