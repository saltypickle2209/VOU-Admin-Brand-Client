import { baseURL } from "@/app/lib/definition";
import { getToken } from "@/app/lib/server_utility";
import ItemCollectingForm from "@/app/ui/components/games/item_collecting_form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Create A Game',
};

export default async function Page() {
    // fetch voucher list
    let voucherData: any = null

    try{
        const response = await fetch(`${baseURL}/voucher/voucherTemplate/getAll`, { 
            cache: 'no-store',
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        })
        if(!response.ok){
            throw new Error()
        }
        voucherData = await response.json()
    }
    catch (error){
        throw new Error('Something went wrong')
    }

    return (
        <main className="flex flex-col gap-y-4">
            <h1 className="text-3xl font-bold text-gray-950">🎰 Create an item collecting game</h1>
            <p className="text-sm text-gray-500 hidden md:block">Complete the form below to add a new item collecting game</p>
            <ItemCollectingForm voucherData={voucherData}/>
        </main>
    )
}