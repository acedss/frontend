
import PlaylistSkeleton from "@/components/skeleton/PlaylistSkeleton";
import { buttonVariants } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area";

import { cn } from "@/lib/utils"
import { useMusicStore } from "@/stores/useMusicStore"
import { SignedIn } from "@clerk/clerk-react"
import { User, HomeIcon, Library, MessageCircleIcon } from "lucide-react"
import { useEffect } from "react"
import { Link } from "react-router-dom"

export const LeftSidebar = () => {
    const { albums, fetchAlbums, isLoading } = useMusicStore()

    useEffect(() => {
        fetchAlbums()
    }, [fetchAlbums])

    console.log({ albums })

    // const isLoading = true;
    return (
        <div className="flex flex-col h-full gap-2 ">
            {/* Navigation menu */}
            <div className="p-4 rounded-lg bg-zinc-900/30">
                <div className="space-y-2 ">
                    <Link to={"/"} className={cn(buttonVariants(
                        {
                            variant: "ghost",
                            className: "w-full justify-start  hover:scale-105 transition-all text-white hover:bg-zinc-800"
                        }
                    ))}>
                        <HomeIcon className="mr-2 size-5" />
                        <span className="hidden md:inline">Home</span>
                    </Link>
                    <SignedIn>
                        <Link to={"/chat"} className={cn(buttonVariants(
                            {
                                variant: "ghost",
                                className: "w-full justify-start hover:scale-105 transition-all text-white hover:bg-zinc-800"
                            }
                        ))}>
                            <MessageCircleIcon className="mr-2 size-5" />
                            <span className="hidden md:inline">Messages</span>
                        </Link>

                        <Link to={"/chat"} className={cn(buttonVariants(
                            {
                                variant: "ghost",
                                className: "w-full justify-start hover:scale-105 transition-all text-white hover:bg-zinc-800"
                            }
                        ))}>
                            <User className="mr-2 size-5" />
                            <span className="hidden md:inline">Profile</span>
                        </Link>

                    </SignedIn>
                </div>
            </div>
            {/* library section */}
            <div className="flex-1 p-4 rounded-lg bg-zinc-900/30">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center px-2 text-white">
                        <Library className="mr-2 size-5" />
                        <span className="hidden md:inline">Library</span>

                    </div>
                </div>
                <ScrollArea className="h-[calc(100vh-300px)]">
                    <div className="space-y-2">
                        {isLoading ? (
                            <PlaylistSkeleton />
                        ) : (
                            albums.map((album) => (
                                <Link to={`/albums/${album._id}`} key={album._id} className="flex items-center gap-3 p-2 m-5 transition-all cursor-pointer rounded-xl hover:scale-105 hover:bg-purple-800/40">
                                    <img src={album.imageUrl} alt="Playlist img" className="flex-shrink-0 object-cover rounded-md size-12" />
                                    <div className="flex-1 hidden min-w-0 md:block">
                                        <p className="text-sm font-bold truncate text-white-400">{album.title}</p>
                                        <p className="text-sm truncate text-zinc-400">Album • {album.artist} </p>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </ScrollArea>
            </div>
        </div >
    )
}
