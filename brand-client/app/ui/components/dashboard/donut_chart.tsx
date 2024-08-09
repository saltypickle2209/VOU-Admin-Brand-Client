'use client'

import dynamic from "next/dynamic"
import { useEffect, useState } from "react";
const Chart = dynamic(() => import("react-apexcharts"), { ssr:false })

export default function DonutChart() {
    // fake data fetch
    const series: number[] = []
    for (let i = 0; i < 5; i++){
      const randomInt = Math.floor(Math.random() * 5001) + 3000;
      series.push(randomInt)
    }

    const colors: string[] = ["#1C64F2", "#16BDCA", "#FDBA8C", "#E74694", "#9061F9"]

    const labels: string[] = ["Event A", "Event B", "Event C", "Event D", "Event E"]

    const options = {
        chart: {
            width: "100%",
            fontFamily: "Inter, sans-serif",
        },
        stroke: {
            colors: ["transparent"],
            linecap: ""
        },
        plotOptions: {
            pie: {
                donut: {
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            fontFamily: "Inter, sans-serif",
                            offsetY: 20,
                        },
                        total: {
                            showAlways: true,
                            show: true,
                            label: "Vouchers",
                            fontFamily: "Inter, sans-serif",
                            formatter: function (w: any) {
                              const sum = w.globals.seriesTotals.reduce((a: any, b: any) => {
                                return a + b
                              }, 0)
                              return sum
                            }
                        },
                        value: {
                            show: true,
                            fontFamily: "Inter, sans-serif",
                            offsetY: -20
                        }
                    },
                    size: "65%",
                }
            }
        },
        labels: labels,
        dataLabels: {
            enabled: false,
        },
        legend: {
            fontFamily: "Inter, sans-serif"
        },
        xaxis: {
            axisTicks: {
              show: false,
            },
            axisBorder: {
              show: false,
            }
        }
    }

    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
      setIsClient(true)
    }, [])

    return (
        <div className="flex flex-col w-full h-auto space-y-4 p-6 bg-white rounded-md shadow-md xl:w-2/5">
            <div className="flex flex-col space-y-1">
                <p className="text-sm text-gray-500">Vouchers published this month</p>
                <p className="text-3xl font-extrabold text-gray-950">{isClient && series.reduce((acc, curr) => acc + curr, 0)}</p>
            </div>
            <Chart options={options} series={series} type="donut" height={250}/>
        </div>
    )

}