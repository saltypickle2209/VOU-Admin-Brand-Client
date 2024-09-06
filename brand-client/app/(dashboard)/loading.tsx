export default function Loading() {
    return (
        <main className="flex flex-col gap-y-4 animate-pulse">
            <div className="h-10 w-72 bg-gray-300 rounded-md"/>
            <div className="flex flex-row items-center justify-between">
                <div className="h-3.5 w-36 bg-gray-300 rounded-sm md:w-72"/>
                <div className="h-10 w-12 bg-gray-300 rounded-md md:w-24"/>
            </div>
            <div className="flex flex-row items-center justify-between">
                <div className="h-10 w-16 bg-gray-300 rounded-md md:w-24"/>
                <div className="h-10 w-52 bg-gray-300 rounded-md md:w-80"/>
            </div>
            <div className="h-48 w-full bg-gray-300 rounded-md"/>
            <div className="h-10 w-72 bg-gray-300 rounded-md"/>
            <div className="h-3.5 w-full bg-gray-300 rounded-sm"/>
        </main>
    )
}