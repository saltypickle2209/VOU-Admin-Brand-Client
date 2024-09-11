import { getFullDateFromObject } from "@/app/lib/utility";
import AreaChart from "../area_chart"
import { getToken } from "@/app/lib/server_utility";
import { baseURL } from "@/app/lib/definition";

export default async function EventChart() {
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
    past30Date.setDate(today.getDate() - 29)
    const startDate = getFullDateFromObject(past30Date)
    const endDate = getFullDateFromObject(today)

    let eventData: any = null

    try{
      const response = await fetch(`${baseURL}/event/events-count-by-day?startDate=${startDate}&endDate=${endDate}`, { 
          cache: 'no-store',
          headers: {
              'Authorization': `Bearer ${getToken()}`
          }
      })
      if(!response.ok){
          throw new Error()
      }
      const data = await response.json()
      eventData = data.eventsCountByDay
    }
    catch (error){
      throw new Error('Something went wrong')
    }

    // fake data fetch
    const data: number[] = eventData.map((item: any) => (Number(item.event_count)))

    // Also change this
    const series = [
      {
        name: "New events",
        data: data,
        color: "#1A56DB",
      },
    ]

    return (
        <div className="flex flex-col w-full h-auto gap-y-4 p-6 bg-white rounded-md shadow-md">
            <div className="flex flex-col gap-y-1">
                <p className="text-sm text-gray-500">Events created by brands during 30-day period</p>
                <p className="text-3xl font-bold text-gray-950">{data.reduce((acc, curr) => acc + curr, 0)}</p>
            </div>
            <AreaChart series={series} categories={categories}/>
        </div>
    )
}