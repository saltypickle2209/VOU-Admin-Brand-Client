export default function TopEventsSkeleton(){
    return (
        <div className="flex flex-col w-full gap-y-4 p-6 bg-white rounded-md shadow-md">
            <div className="flex justify-between items-center">
                <div className="h-5 w-32 rounded-md bg-gray-300 animate-pulse"/>
                <div className="h-5 w-24 rounded-md bg-gray-300 animate-pulse"/>
            </div>
            <div className="w-full h-64 rounded-md bg-gray-300 animate-pulse"/>
        </div>
    )
}