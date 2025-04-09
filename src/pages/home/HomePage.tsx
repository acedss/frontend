import TopBar from "@/components/TopBar"
import { useMusicStore } from "@/stores/useMusicStore"
import { useEffect } from "react";
import FeaturedSection from "./compoments/FeaturedSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import SectionGrid from "./compoments/SectionGrid";
import { usePlayerStore } from "@/stores/usePlayerStore";


const HomePage = () => {
    const { fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs, isLoading, madeForYouSongs, featuredSongs, trendingSongs } = useMusicStore();

    const { initializeQueue } = usePlayerStore()

    useEffect(() => {
        fetchFeaturedSongs();
        fetchMadeForYouSongs();
        fetchTrendingSongs();
    }, [fetchMadeForYouSongs, fetchFeaturedSongs, fetchTrendingSongs]);

    useEffect(() => {
        if (madeForYouSongs.length > 0 && featuredSongs.length > 0 && trendingSongs.length > 0) {
            const allSongs = [...featuredSongs, ...madeForYouSongs, ...trendingSongs]
            initializeQueue(allSongs)
        }
    }, [initializeQueue, madeForYouSongs, featuredSongs, trendingSongs])


    return (
        <main className="h-full overflow-hidden rounded-md ">
            <TopBar />
            <ScrollArea className="h-[calc(100vh-180px)]">
                <div className="p-4 sm:p-6">
                    <h1 className="mb-6 text-2xl font-bold sm:text-3xl">Good afternoon</h1>
                    <FeaturedSection></FeaturedSection>

                    <div className="space-y-8">
                        <SectionGrid title="Made For You" songs={madeForYouSongs} isLoading={isLoading}></SectionGrid>
                        <SectionGrid title="Trending Songs " songs={trendingSongs} isLoading={isLoading}></SectionGrid>
                    </div>
                </div>
            </ScrollArea>
        </main>
    )
}

export default HomePage

