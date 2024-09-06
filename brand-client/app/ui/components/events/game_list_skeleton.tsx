export default function GameListSkeleton() {
    return (
        <div className="grow w-full overflow-y-auto">
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 px-1 pb-4">
                <div className="flex flex-col h-full gap-y-2 p-4 rounded-md overflow-hidden animate-pulse">
                    <div className="w-full aspect-video rounded-md bg-gray-300"/>
                    <div className="w-full h-4 rounded-sm bg-gray-300"/>
                    <div className="flex gap-x-4 items-center mt-auto">
                        <div className="w-5 h-5 shrink-0 bg-gray-300 rounded-sm"/>
                        <div className="grow flex flex-col gap-y-1 justify-between sm:flex-row sm:gap-x-2 sm:gap-y-0">
                            <div className="flex flex-row items-center gap-x-2 sm:flex-col sm:items-start sm:gap-x-0 sm:gap-y-1">
                                <div className="h-3 w-8 bg-gray-300 rounded-sm"/>
                                <div className="h-3 w-16 font-semibold bg-gray-300 rounded-sm sm:h-3.5"/>
                            </div>
                            <div className="flex flex-row items-center gap-x-2 sm:flex-col sm:items-start sm:gap-x-0 sm:gap-y-1">
                                <div className="h-3 w-8 bg-gray-300 rounded-sm"/>
                                <div className="h-3 w-16 font-semibold bg-gray-300 rounded-sm sm:h-3.5"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hidden flex-col h-full gap-y-2 p-4 rounded-md overflow-hidden animate-pulse lg:flex">
                    <div className="w-full aspect-video rounded-md bg-gray-300"/>
                    <div className="w-full h-4 rounded-sm bg-gray-300"/>
                    <div className="flex gap-x-4 items-center mt-auto">
                        <div className="w-5 h-5 shrink-0 bg-gray-300 rounded-sm"/>
                        <div className="grow flex flex-col gap-y-1 justify-between sm:flex-row sm:gap-x-2 sm:gap-y-0">
                            <div className="flex flex-row items-center gap-x-2 sm:flex-col sm:items-start sm:gap-x-0 sm:gap-y-1">
                                <div className="h-3 w-8 bg-gray-300 rounded-sm"/>
                                <div className="h-3 w-16 font-semibold bg-gray-300 rounded-sm sm:h-3.5"/>
                            </div>
                            <div className="flex flex-row items-center gap-x-2 sm:flex-col sm:items-start sm:gap-x-0 sm:gap-y-1">
                                <div className="h-3 w-8 bg-gray-300 rounded-sm"/>
                                <div className="h-3 w-16 font-semibold bg-gray-300 rounded-sm sm:h-3.5"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hidden flex-col h-full gap-y-2 p-4 rounded-md overflow-hidden animate-pulse xl:flex">
                    <div className="w-full aspect-video rounded-md bg-gray-300"/>
                    <div className="w-full h-4 rounded-sm bg-gray-300"/>
                    <div className="flex gap-x-4 items-center mt-auto">
                        <div className="w-5 h-5 shrink-0 bg-gray-300 rounded-sm"/>
                        <div className="grow flex flex-col gap-y-1 justify-between sm:flex-row sm:gap-x-2 sm:gap-y-0">
                            <div className="flex flex-row items-center gap-x-2 sm:flex-col sm:items-start sm:gap-x-0 sm:gap-y-1">
                                <div className="h-3 w-8 bg-gray-300 rounded-sm"/>
                                <div className="h-3 w-16 font-semibold bg-gray-300 rounded-sm sm:h-3.5"/>
                            </div>
                            <div className="flex flex-row items-center gap-x-2 sm:flex-col sm:items-start sm:gap-x-0 sm:gap-y-1">
                                <div className="h-3 w-8 bg-gray-300 rounded-sm"/>
                                <div className="h-3 w-16 font-semibold bg-gray-300 rounded-sm sm:h-3.5"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}