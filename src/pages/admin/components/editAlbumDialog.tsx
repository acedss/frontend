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
import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";
import { Album } from "@/types";

interface EditAlbumDialogProps {
    album: Album;
    open: boolean;
    onClose: () => void;
}

const EditAlbumDialog = ({ album, open, onClose }: EditAlbumDialogProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [editedAlbum, setEditedAlbum] = useState<{
        title: string;
        artist: string;
        releaseYear: number;
    }>({
        title: album.title,
        artist: album.artist,
        releaseYear: album.releaseYear,
    });

    useEffect(() => {
        setEditedAlbum({
            title: album.title,
            artist: album.artist,
            releaseYear: album.releaseYear,
        });
    }, [album]);

    const handleUpdate = async () => {
        setIsLoading(true);
        try {
            await axiosInstance.put(`/admin/albums/${album._id}`, {
                title: editedAlbum.title,
                artist: editedAlbum.artist,
                releaseYear: Number(editedAlbum.releaseYear),
            });

            toast.success("Album updated successfully");
            onClose(); // Close the dialog
        } catch (error) {
            console.error(error);
            toast.error("Failed to update album");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Album</DialogTitle>
                    <DialogDescription>Update this album's information</DialogDescription>
                </DialogHeader>

                <div className="py-4 space-y-4">
                    {/* Title */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Title</label>
                        <Input
                            value={editedAlbum.title}
                            onChange={(e) =>
                                setEditedAlbum({ ...editedAlbum, title: e.target.value })
                            }
                            className="bg-zinc-800 border-zinc-700"
                        />
                    </div>

                    {/* Artist */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Artist</label>
                        <Input
                            value={editedAlbum.artist}
                            onChange={(e) =>
                                setEditedAlbum({ ...editedAlbum, artist: e.target.value })
                            }
                            className="bg-zinc-800 border-zinc-700"
                        />
                    </div>

                    {/* Release Year */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Release Year</label>
                        <Input
                            type="number"
                            min="0"
                            value={editedAlbum.releaseYear}
                            onChange={(e) =>
                                setEditedAlbum({
                                    ...editedAlbum,
                                    releaseYear: Number(e.target.value),
                                })
                            }
                            className="bg-zinc-800 border-zinc-700"
                        />
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

export default EditAlbumDialog;
