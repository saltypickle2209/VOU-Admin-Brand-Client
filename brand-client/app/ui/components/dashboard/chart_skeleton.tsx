export default function ChartSkeleton({ widthClass, chartHeight }: { widthClass: string, chartHeight: string }){
    const className = `flex flex-col w-full h-auto gap-y-4 p-6 bg-white rounded-md shadow-md xl:${widthClass}`
    const chartClass = `w-full ${chartHeight} rounded-md bg-gray-300 animate-pulse`
    return (
        <div className={className}>
            <div className="flex flex-col gap-y-2">
                <div className="h-3.5 w-32 rounded-sm bg-gray-300 animate-pulse"/>
                <div className="h-8 w-24 rounded-md bg-gray-300 animate-pulse"/>
            </div>
            <div className={chartClass}/>
        </div>
    )
}