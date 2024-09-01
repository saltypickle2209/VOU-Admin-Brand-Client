'use client'

import dynamic from "next/dynamic"
const Chart = dynamic(() => import("react-apexcharts"), { ssr:false })

export default function AreaChart({series, categories, options, height} : {series: any, categories: any, options?: any, height?: any}){
    const chartOptions = options? options : {
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
            shade: "#1C64F2",
            gradientToColors: ["#1C64F2"],
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

    return (
        <Chart options={chartOptions} series={series} type="area" height={height? height : 250}/>
    )
}