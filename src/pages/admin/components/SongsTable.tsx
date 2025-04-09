import { useState } from "react";
import { useMusicStore } from "@/stores/useMusicStore";
import {
    Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Calendar, SquarePen, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import EditSongDialog from "./editSongDialog";


export const SongsTable = () => {
    const { songs, isLoading, error, deleteSong } = useMusicStore();
    const [editingSong, setEditingSong] = useState<null | (typeof songs)[number]>(null);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-8">
                <div className="text-zinc-400">Loading songs...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-between py-8">
                <div className="text-red-400">{error}</div>
            </div>
        );
    }

    return (
        <>
            <Table>
                <TableCaption>A list of your songs.</TableCaption>
                <TableHeader>
                    <TableRow className="hover:bg-purple-800/50">
                        <TableHead className="w-[50px]"></TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Artist</TableHead>
                        <TableHead>Release Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {songs.map((song) => (
                        <TableRow key={song._id} className="hover:bg-purple-800/50">
                            <TableCell>
                                <img src={song.imageUrl} alt={song.title} className="object-cover rounded size-10" />
                            </TableCell>
                            <TableCell className="font-medium">{song.title}</TableCell>
                            <TableCell>{song.artist}</TableCell>
                            <TableCell>
                                <span className="inline-flex items-center gap-1 text-zinc-400">
                                    <Calendar className="w-4 h-4" />
                                    {song.createdAt?.split("T")[0]}
                                </span>
                            </TableCell>
                            <TableCell>
                                <div className="flex justify-end gap-2">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-yellow-400 hover:text-yellow-200 hover:bg-yellow-400/10 hover:scale-105"
                                        onClick={() => setEditingSong(song)}
                                    >
                                        <SquarePen className="size-4" />
                                    </Button>

                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-red-400 hover:text-red-300 hover:bg-red-400/10 hover:scale-105"
                                        onClick={() => deleteSong(song._id)}
                                    >
                                        <Trash2 className="size-4" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {editingSong && (
                <EditSongDialog
                    song={editingSong}
                    open={!!editingSong}
                    onClose={() => setEditingSong(null)}
                />
            )}

        </>
    );
};
