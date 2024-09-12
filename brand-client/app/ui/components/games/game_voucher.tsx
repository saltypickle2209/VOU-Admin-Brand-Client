import { baseURL } from "@/app/lib/definition"
import { getToken } from "@/app/lib/server_utility"

export default async function GameVoucher({ data }: {data: any}) {
    return (
        <div className="flex flex-col gap-y-2">
            <p className="text-gray-950 font-semibold">Voucher</p>
            <div className="rounded-md flex overflow-hidden shadow-md h-32">
                <div className="overflow-hidden flex h-full w-40 shrink-0">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmUbXIH85ZcmIpMRatVL08HSbZSWVdDP5nnw&s" alt="Image Preview" className="w-full h-full object-cover"/> 
                </div>
                <div className="grow h-full p-4 flex flex-col gap-y-2">
                    <p className="text-gray-950 font-semibold line-clamp-1">{data.name}</p>
                    <p className="text-gray-500 text-xs line-clamp-2">{data.description}</p>
                    <div className="w-full h-2 mt-auto bg-gray-300 rounded-full relative overflow-hidden after:absolute after:content-[''] after:left-0 after:w-[60%] after:bg-violet-500 after:inset-y-0 after:rounded-md"/>
                </div>
            </div>
        </div>
    )
}