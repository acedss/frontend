import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { useMusicStore } from "@/stores/useMusicStore";
import { Calendar, Music, SquarePen, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import EditAlbumDialog from "./editAlbumDialog";

export const AlbumsTable = () => {
    const { albums, deleteAlbum, fetchAlbums } = useMusicStore();
    const [editingAlbum, setEditingAlbum] = useState<null | (typeof albums)[number]>(null);

    useEffect(() => {
        fetchAlbums();
    }, [fetchAlbums]);

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow className="hover:bg-zinc-800/50">
                        <TableHead className="w-[50px]"></TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Artist</TableHead>
                        <TableHead>Release Year</TableHead>
                        <TableHead>Songs</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {albums.map((album) => (
                        <TableRow key={album._id} className="hover:bg-zinc-800/50">
                            <TableCell>
                                <img
                                    src={album.imageUrl}
                                    alt={album.title}
                                    className="object-cover w-10 h-10 rounded"
                                />
                            </TableCell>
                            <TableCell className="font-medium">{album.title}</TableCell>
                            <TableCell>{album.artist}</TableCell>
                            <TableCell>
                                <span className="inline-flex items-center gap-1 text-zinc-400">
                                    <Calendar className="w-4 h-4" />
                                    {album.releaseYear}
                                </span>
                            </TableCell>
                            <TableCell>
                                <span className="inline-flex items-center gap-1 text-zinc-400">
                                    <Music className="w-4 h-4" />
                                    {album.songs.length} songs
                                </span>
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                    {/* EDIT Button */}
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setEditingAlbum(album)}
                                        className="text-yellow-400 hover:text-yellow-200 hover:bg-yellow-400/10 hover:scale-105"
                                    >
                                        <SquarePen className="size-4" />
                                    </Button>

                                    {/* DELETE Button */}
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => deleteAlbum(album._id)}
                                        className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {editingAlbum && (
                <EditAlbumDialog
                    album={editingAlbum}
                    open={!!editingAlbum}
                    onClose={() => setEditingAlbum(null)}
                />
            )}
        </>
    );
};
