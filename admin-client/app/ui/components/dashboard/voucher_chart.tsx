import AreaChart from "../area_chart"

export default async function VoucherChart() {
  function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

await delay(5000);

    // fake data fetch
    const data: number[] = []
    for (let i = 0; i < 31; i++){
      const randomInt = Math.floor(Math.random() * 101) + 20;
      data.push(randomInt)
    }

    const categories: string[] = []
    for (let i = 0; i < 31; i++){
      const date = `${i + 1} August`
      categories.push(date)
    }

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
        name: "Vouchers",
        data: data,
        color: "#8b5cf6",
      },
    ]

    return (
        <div className="flex flex-col w-full h-auto gap-y-4 p-6 bg-white rounded-md shadow-md xl:w-1/2">
            <div className="flex flex-col gap-y-1">
                <p className="text-sm text-gray-500">Vouchers published this month</p>
                <p className="text-3xl font-bold text-gray-950">{data.reduce((acc, curr) => acc + curr, 0)}</p>
            </div>
            <AreaChart series={series} categories={categories} options={options} height={150}/>
        </div>
    )
}