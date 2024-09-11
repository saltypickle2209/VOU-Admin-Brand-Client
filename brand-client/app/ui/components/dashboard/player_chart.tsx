import { getFullDateFromObject } from "@/app/lib/utility";
import AreaChart from "../area_chart"
import { baseURL } from "@/app/lib/definition";
import { getToken } from "@/app/lib/server_utility";

export default async function PlayerChart() {
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
    let playerData: any = null

    try{
      const response = await fetch(`${baseURL}/event/participation/count-by-date?startDate=${startDate}&endDate=${endDate}`, { 
          cache: 'no-store',
          headers: {
              'Authorization': `Bearer ${getToken()}`
          }
      })
      if(!response.ok){
          throw new Error()
      }
      playerData = await response.json()
    }
    catch (error){
      throw new Error('Something went wrong')
    }

    const data: number[] = playerData.data.map((item: any) => (Number(item.count)))

    // Also change this
    const series = [
      {
        name: "New players",
        data: data,
        color: "#1A56DB",
      },
    ]

    return (
        <div className="flex flex-col w-full h-auto gap-y-4 p-6 bg-white rounded-md shadow-md xl:w-1/2">
            <div className="flex flex-col gap-y-1">
                <p className="text-sm text-gray-500">Player count during 30-day period</p>
                <p className="text-3xl font-bold text-gray-950">{data.reduce((acc, curr) => acc + curr, 0)}</p>
            </div>
            <AreaChart series={series} categories={categories}/>
        </div>
    )
}