import { getFullDateFromObject } from "@/app/lib/utility";
import AreaChart from "../area_chart"
import { baseURL } from "@/app/lib/definition";
import { getToken } from "@/app/lib/server_utility";

export default async function GameChart() {
  const today = new Date();
  const categories: string[] = []

  for (let i = 14; i >= 0; i--) {
    const pastDay = new Date();
    pastDay.setDate(today.getDate() - i); // Subtract i days from today
    const day = pastDay.getDate();
    const month = pastDay.toLocaleString('default', { month: 'long' }); // Get month name
    categories.push(`${day} ${month}`);
  }

  const past15Date = new Date()
  past15Date.setDate(today.getDate() - 14)
  const startDate = getFullDateFromObject(past15Date)
  const endDate = getFullDateFromObject(today)

  let gameData: any = null

  // fake data fetch
  try{
    const response = await fetch(`${baseURL}/game/games-count-by-day?startDate=${startDate}&endDate=${endDate}`, { 
        cache: 'no-store',
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    })
    if(!response.ok){
        throw new Error()
    }
    const data = await response.json()
    gameData = data.gamesCountByDay
  }
  catch (error){
    throw new Error('Something went wrong')
  }

  const data: number[] = gameData.map((item: any) => (Number(item.game_count)))

    // Also change this
    const series = [
      {
        name: "New games",
        data: data,
        color: "#1A56DB",
      },
    ]

    return (
        <div className="flex flex-col w-full h-auto gap-y-4 p-6 bg-white rounded-md shadow-md xl:w-1/2">
            <div className="flex flex-col gap-y-1">
                <p className="text-sm text-gray-500">Games created during 15-day period</p>
                <p className="text-3xl font-bold text-gray-950">{data.reduce((acc, curr) => acc + curr, 0)}</p>
            </div>
            <AreaChart series={series} categories={categories} height={150}/>
        </div>
    )
}