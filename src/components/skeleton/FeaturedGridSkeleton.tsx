const FeaturedGridSkeleton = () => {
    return (
        <div className='grid grid-cols-1 gap-4 mb-8 sm:grid-cols-2 lg:grid-cols-3'>
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className='flex items-center overflow-hidden rounded-md bg-zinc-800/50 animate-pulse'>
                    <div className='flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 bg-zinc-700' />
                    <div className='flex-1 p-4'>
                        <div className='w-3/4 h-4 mb-2 rounded bg-zinc-700' />
                    </div>
                </div>
            ))}
        </div>
    );
};
export default FeaturedGridSkeleton;
