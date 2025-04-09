import FeaturedGridSkeleton from "@/components/skeleton/FeaturedGridSkeleton"
import { useMusicStore } from "@/stores/useMusicStore"
import PlayButton from "./PlayButton"

const FeaturedSection = () => {
    const { isLoading, featuredSongs, error } = useMusicStore()
    if (isLoading) return <FeaturedGridSkeleton />

    if (error) return <p className="mb-4 text-lg text-red-500">{error}</p>
    return (
        <div className="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredSongs.map((song) => (
                <div
                    className="relative flex items-center overflow-hidden transition-colors rounded-md cursor-pointer bg-zinc-800/50 hover:bg-zinc-700/50 group"
                    key={song._id}>
                    <img src={song.imageUrl} alt={song.title} className="flex-shrink-0 object-cover w-16 sm:w-20" />
                    <div className="flex-1 p-4">
                        <p className="font-medium truncate">{song.title}</p>
                        <p className="text-sm truncate text-zinc-400">{song.artist}</p>
                    </div>
                    {/* // Add playbtn */}
                    <PlayButton song={song}/>
                </div>
            ))}
        </div>
    )
}
export default FeaturedSection