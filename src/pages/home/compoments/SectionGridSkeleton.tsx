const SectionGridSkeleton = () => {
    return (
        <div className='mb-8'>
            <div className='w-48 h-8 mb-4 rounded bg-zinc-800 animate-pulse' />
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className='p-4 rounded-md bg-zinc-800/40 animate-pulse'>
                        <div className='mb-4 rounded-md aspect-square bg-zinc-700' />
                        <div className='w-3/4 h-4 mb-2 rounded bg-zinc-700' />
                        <div className='w-1/2 h-4 rounded bg-zinc-700' />
                    </div>
                ))}
            </div>
        </div>
    );
};
export default SectionGridSkeleton;
