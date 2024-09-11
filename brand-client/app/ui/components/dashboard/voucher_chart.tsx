import { getFullDateFromObject } from "@/app/lib/utility";
import { baseURL } from "@/app/lib/definition";
import { getToken } from "@/app/lib/server_utility";
import AreaChart from "../area_chart";

export default async function VoucherChart() {
    const today = new Date();
    const categories: string[] = []

    for (let i = 29; i >= 0; i--) {
      const pastDay = new Date();
      pastDay.setDate(today.getDate() - i); // Subtract i days from today
      const day = pastDay.getDate();
      const month = pastDay.toLocaleString('default', { month: 'long' }); // Get month name
      categories.push(`${day} ${month}`);
    }

    const past30Date = new Date()
    past30Date.setDate(today.getDate() - 30)
    const startDate = getFullDateFromObject(past30Date)
    const endDate = getFullDateFromObject(today)

    // fetch data 
    let voucherData: any = null

    try{
      const response = await fetch(`${baseURL}/voucher/voucher/getVouchersCountByDay?startDate=${startDate}&endDate=${endDate}`, { 
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

    const data: number[] = voucherData.map((item: any) => (Number(item.voucher_count)))

    // Also change this
    const series = [
        {
          name: "New vouchers",
          data: data,
          color: "#1A56DB",
        },
    ]

    return (
        <div className="flex flex-col w-full h-auto gap-y-4 p-6 bg-white rounded-md shadow-md xl:w-1/2">
            <div className="flex flex-col gap-y-1">
                <p className="text-sm text-gray-500">Vouchers published this month</p>
                <p className="text-3xl font-bold text-gray-950">{data.reduce((acc, curr) => acc + curr, 0)}</p>
            </div>
            <AreaChart series={series} categories={categories}/>
        </div>
    )

}