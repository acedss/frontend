const PlaylistSkeleton = () => {
    return Array.from({ length: 7 }).map((_, i) => (
        <div key={i} className='flex items-center gap-3 p-2 rounded-md'>
            <div className='flex-shrink-0 w-12 h-12 rounded-md bg-zinc-800 animate-pulse' />
            <div className='flex-1 hidden min-w-0 space-y-2 md:block'>
                <div className='w-3/4 h-4 rounded bg-zinc-800 animate-pulse' />
                <div className='w-1/2 h-3 rounded bg-zinc-800 animate-pulse' />
            </div>
        </div>
    ));
};
export default PlaylistSkeleton;