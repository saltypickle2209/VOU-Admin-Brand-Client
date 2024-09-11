export default function SingleStatisticsSkeleton(){
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-y-0 justify-between items-center w-full h-auto place-self-center md:h-32 p-6 bg-white rounded-md shadow-md">
            <div className="flex flex-col gap-y-4 items-center sm:flex-row sm:gap-x-4 grow w-full">
                <div className="w-14 h-14 shrink-0 rounded-md bg-gray-300 animate-pulse"/>
                <div className="flex flex-col grow gap-y-2 w-full">
                    <div className="h-3.5 w-16 rounded-sm bg-gray-300 self-center animate-pulse sm:self-start"/>
                    <div className="h-8 w-full rounded-md bg-gray-300 self-center animate-pulse sm:self-start"/>
                </div>
            </div>
        </div>
    )
}