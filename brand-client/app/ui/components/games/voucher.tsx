import { baseURL } from "@/app/lib/definition"
import { getToken } from "@/app/lib/server_utility"

export default async function Voucher({ voucher_template_id }: {voucher_template_id: any}) {
    let data: any = null
    
    try{
        const response = await fetch(`${baseURL}/voucher/voucherTemplate/getByID?id=${voucher_template_id}`, {
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        })
        if(!response.ok){
            throw new Error(await response.text())
        }
        data = await response.json()
    }
    catch (error: any){
        data = {
            name: "Voucher something"
        }
    }
    
    return (
        <p className="text-xs font-semibold text-gray-700 line-clamp-1 sm:text-sm">{data.name}</p>
    )
}