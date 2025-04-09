import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { axiosInstance } from "@/lib/axios";
import { useMusicStore } from "@/stores/useMusicStore";
import { toast } from "sonner";

import { Song } from "@/types";

interface EditSongDialogProps {
    song: Song;
    open: boolean;
    onClose: () => void;
}

const EditSongDialog = ({ song, open, onClose }: EditSongDialogProps) => {
    const { albums } = useMusicStore();
    const [isLoading, setIsLoading] = useState(false);

    const [editedSong, setEditedSong] = useState<{
        title: string;
        artist: string;
        albumId: string | null;
        duration: number;
    }>({
        title: song.title,
        artist: song.artist,
        albumId: song.albumId || "none",
        duration: song.duration,
    });

    useEffect(() => {
        setEditedSong({
            title: song.title,
            artist: song.artist,
            albumId: song.albumId || "none",
            duration: song.duration,
        });
    }, [song]);

    const handleUpdate = async () => {
        setIsLoading(true);
        try {
            await axiosInstance.put(`/admin/songs/${song._id}`, {
                title: editedSong.title,
                artist: editedSong.artist,
                duration: Number(editedSong.duration),
                albumId: editedSong.albumId === "none" ? null : editedSong.albumId,
            });

            toast.success("Song updated successfully");
            onClose(); // Close the dialog
        } catch (error) {
            console.error(error);
            toast.error("Failed to update song");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Song</DialogTitle>
                    <DialogDescription>Update this song's information</DialogDescription>
                </DialogHeader>


                <div className="py-4 space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Title</label>
                        <Input
                            value={editedSong.title}
                            onChange={(e) => setEditedSong({ ...editedSong, title: e.target.value })}
                            className="bg-zinc-800 border-zinc-700"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Artist</label>
                        <Input
                            value={editedSong.artist}
                            onChange={(e) => setEditedSong({ ...editedSong, artist: e.target.value })}
                            className="bg-zinc-800 border-zinc-700"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Duration (seconds)</label>
                        <Input
                            type="number"
                            min="0"
                            value={editedSong.duration}
                            onChange={(e) => setEditedSong({ ...editedSong, duration: Number(e.target.value) })}
                            className="bg-zinc-800 border-zinc-700"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Album (Optional)</label>
                        <Select
                            value={editedSong.albumId || "none"}
                            onValueChange={(value) =>
                                setEditedSong({ ...editedSong, albumId: value === "none" ? null : value })
                            }
                        >
                            <SelectTrigger className="bg-zinc-800 border-zinc-700">
                                <SelectValue placeholder="Select album" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-800 border-zinc-700">
                                <SelectItem value="none">No Album (Single)</SelectItem>
                                {albums.map((album) => (
                                    <SelectItem key={album._id} value={album._id}>
                                        {album.title}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose} disabled={isLoading}>
                        Cancel
                    </Button>
                    <Button onClick={handleUpdate} disabled={isLoading}>
                        {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    );
};

export default EditSongDialog;