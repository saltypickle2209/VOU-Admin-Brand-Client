export default function EventGameListSkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            <div className="w-full aspect-video rounded-md animate-pulse bg-gray-300"/>
            <div className="w-full aspect-video rounded-md animate-pulse bg-gray-300"/>
            <div className="w-full aspect-video rounded-md animate-pulse bg-gray-300"/>
        </div>
    )
}