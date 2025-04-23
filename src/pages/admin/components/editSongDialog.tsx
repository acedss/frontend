import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { axiosInstance } from "@/lib/axios";
import { useMusicStore } from "@/stores/useMusicStore";
import { toast } from "sonner";
import { Upload } from "lucide-react";
import { Song } from "@/types";

interface EditSongDialogProps {
    song: Song;
    open: boolean;
    onClose: () => void;
}

const EditSongDialog = ({ song, open, onClose }: EditSongDialogProps) => {
    const { albums } = useMusicStore();
    const [isLoading, setIsLoading] = useState(false);
    const imageInputRef = useRef<HTMLInputElement>(null);
    const audioInputRef = useRef<HTMLInputElement>(null);

    const [editedSong, setEditedSong] = useState({
        title: song.title,
        artist: song.artist,
        albumId: song.albumId || null,
        duration: song.duration,
    });

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [audioFile, setAudioFile] = useState<File | null>(null);

    useEffect(() => {
        setEditedSong({
            title: song.title,
            artist: song.artist,
            albumId: song.albumId || "none",
            duration: song.duration,
        });
        setImageFile(null);
        setAudioFile(null);
    }, [song]);

    const handleUpdate = async () => {
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append("title", editedSong.title);
            formData.append("artist", editedSong.artist);
            formData.append("duration", editedSong.duration.toString());
            formData.append("albumId", editedSong.albumId === null ? "" : editedSong.albumId);

            if (imageFile) {
                formData.append("imageFile", imageFile);
            }
            if (audioFile) {
                formData.append("audioFile", audioFile);
            }

            await axiosInstance.put(`/admin/songs/${song._id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            toast.success("Song updated successfully");
            onClose();
        } catch (error) {
            console.error(error);
            toast.error("Failed to update song");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
            <DialogContent className="bg-zinc-900 border-zinc-700">
                <DialogHeader>
                    <DialogTitle>Edit Song</DialogTitle>
                    <DialogDescription>Update this song's information</DialogDescription>
                </DialogHeader>

                <div className="py-4 space-y-4">
                    {/* Image Upload Section */}
                    <input
                        type="file"
                        accept="image/*"
                        ref={imageInputRef}
                        onChange={(e) => e.target.files?.[0] && setImageFile(e.target.files[0])}
                        className="hidden"
                    />
                    <div
                        className="flex items-center justify-center p-4 border-2 border-dashed rounded-lg cursor-pointer border-zinc-700"
                        onClick={() => imageInputRef.current?.click()}
                    >
                        <div className="text-center">
                            <div className="inline-block p-2 mb-2 rounded-full bg-zinc-800">
                                <Upload className="w-5 h-5 text-zinc-400" />
                            </div>
                            <div className="mb-2 text-sm text-zinc-400">
                                {imageFile ? imageFile.name : "Change artwork (optional)"}
                            </div>
                            <Button variant="outline" size="sm" className="text-xs">
                                Choose Image
                            </Button>
                        </div>
                    </div>

                    {/* Audio Upload Section */}
                    <input
                        type="file"
                        accept="audio/*"
                        ref={audioInputRef}
                        onChange={(e) => e.target.files?.[0] && setAudioFile(e.target.files[0])}
                        className="hidden"
                    />
                    <div
                        className="flex items-center justify-center p-4 border-2 border-dashed rounded-lg cursor-pointer border-zinc-700"
                        onClick={() => audioInputRef.current?.click()}
                    >
                        <div className="text-center">
                            <div className="inline-block p-2 mb-2 rounded-full bg-zinc-800">
                                <Upload className="w-5 h-5 text-zinc-400" />
                            </div>
                            <div className="mb-2 text-sm text-zinc-400">
                                {audioFile ? audioFile.name : "Change audio file (optional)"}
                            </div>
                            <Button variant="outline" size="sm" className="text-xs">
                                Choose Audio
                            </Button>
                        </div>
                    </div>

                    {/* Other Fields */}
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
