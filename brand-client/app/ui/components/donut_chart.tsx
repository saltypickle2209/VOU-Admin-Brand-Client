'use client'

import dynamic from "next/dynamic"
const Chart = dynamic(() => import("react-apexcharts"), { ssr:false })

export default function DonutChart({ series, labels } : {series: any, labels: any}){
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
                        show: false,
                        // name: {
                        //     show: true,
                        //     fontFamily: "Inter, sans-serif",
                        //     offsetY: 20,
                        // },
                        // total: {
                        //     showAlways: true,
                        //     show: true,
                        //     label: "Vouchers",
                        //     fontFamily: "Inter, sans-serif",
                        //     formatter: function (w: any) {
                        //       const sum = w.globals.seriesTotals.reduce((a: any, b: any) => {
                        //         return a + b
                        //       }, 0)
                        //       return sum
                        //     }
                        // },
                        // value: {
                        //     show: true,
                        //     fontFamily: "Inter, sans-serif",
                        //     offsetY: -20
                        // }
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

    return (
        <Chart options={options} series={series} type="donut" height={250}/>
    )
}