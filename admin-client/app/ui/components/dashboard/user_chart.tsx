import { getFullDateFromObject } from "@/app/lib/utility";
import AreaChart from "../area_chart"
import { baseURL } from "@/app/lib/definition";
import { getToken } from "@/app/lib/server_utility";

export default async function UserChart() {
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

    let userData: any = null

    // fake data fetch
    try{
      const response = await fetch(`${baseURL}/auth/users/new-users-count?startDate=${startDate}&endDate=${endDate}`, { 
          cache: 'no-store',
          headers: {
              'Authorization': `Bearer ${getToken()}`
          }
      })
      if(!response.ok){
          throw new Error()
      }
      const data = await response.json()
      userData = data.count
    }
    catch (error){
      throw new Error('Something went wrong')
    }

    const data: number[] = userData.map((item: any) => (Number(item.user_count)))

    const options = {
      chart: {
        width: "100%",
        fontFamily: "Inter, sans-serif",
        dropShadow: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      tooltip: {
        enabled: true,
        x: {
          show: false,
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          opacityFrom: 0.55,
          opacityTo: 0,
          shade: "#ddd6fe",
          gradientToColors: ["#ddd6fe"],
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 4,
      },
      grid: {
        show: false,
        strokeDashArray: 4,
        padding: {
          left: 2,
          right: 2,
          top: 0
        },
      },
      xaxis: {
        // Change this categories later
        categories: categories,
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        show: false,
      },
    };

    // Also change this
    const series = [
      {
        name: "New events",
        data: data,
        color: "#8b5cf6",
      },
    ]

    return (
        <div className="flex flex-col w-full h-auto gap-y-4 p-6 bg-white rounded-md shadow-md">
            <div className="flex flex-col gap-y-1">
                <p className="text-sm text-gray-500">New users during 30-day period</p>
                <p className="text-3xl font-bold text-gray-950">{data.reduce((acc, curr) => acc + curr, 0)}</p>
            </div>
            <AreaChart series={series} categories={categories} options={options}/>
        </div>
    )
}