import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { axiosInstance } from "@/lib/axios"
import { useMusicStore } from "@/stores/useMusicStore"
import { Plus, Upload } from "lucide-react"
import { useRef, useState } from "react"
import { toast } from "sonner"

interface NewSong {
    title: string;
    artist: string;
    album: string;
    duration: string;
}

export const AddSongDialog = () => {
    const { albums } = useMusicStore()
    const [songDialogOpen, setSongDialogOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [newSong, setNewSong] = useState<NewSong>({
        title: "",
        artist: "",
        album: "",
        duration: "0"
    })

    const [files, setFiles] = useState<{ audio: File | null; image: File | null }>({
        audio: null,
        image: null
    })

    const audioInputRef = useRef<HTMLInputElement>(null)
    const imageInputRef = useRef<HTMLInputElement>(null)

    const handleSubmit = async () => {
        setIsLoading(true)
        try {
            if (!files.audio || !files.image) {
                return toast.error("Please upload both audio and image files");
            }
            const formData = new FormData();
            formData.append("title", newSong.title);
            formData.append("artist", newSong.artist);
            formData.append("duration", newSong.duration.toString());

            if (newSong.album && newSong.album !== "none") {
                formData.append("albumId", newSong.album);
            }

            formData.append("audioFile", files.audio);
            formData.append("imageFile", files.image);

            await axiosInstance.post("/admin/songs", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            setNewSong({
                title: "",
                artist: "",
                album: "",
                duration: "0",
            });
            setFiles({
                audio: null,
                image: null
            });
            toast.success("Song added successfully");

        } catch (error) {
            console.error(error);
            toast.error("Failed to add song");
        } finally {
            setSongDialogOpen(false);
        }
    };


    return (
        <Dialog open={songDialogOpen} onOpenChange={setSongDialogOpen} >
            <DialogTrigger asChild>
                <Button className="text-white bg-violet-500 hover:bg-violet-600 hover:scale-105">
                    <Plus className="w-4 h-4 " />
                    Add Song
                </Button>
            </DialogTrigger>

            <DialogContent className="">
                <DialogHeader>
                    <DialogTitle>Add New Song</DialogTitle>
                    <DialogDescription>Add a new song to your library</DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4">
                    <input type="file"
                        accept="audio/*"
                        hidden
                        ref={audioInputRef} onChange={(e) => setFiles((prev) => ({ ...prev, audio: e.target.files![0] }))}
                    />


                    <input
                        type='file'
                        ref={imageInputRef}
                        className='hidden'
                        accept='image/*'
                        onChange={(e) => setFiles((prev) => ({ ...prev, image: e.target.files![0] }))}
                    />

                    {/* Image upload area */}
                    <div
                        className='flex items-center justify-center p-6 border-2 border-dashed rounded-lg cursor-pointer border-zinc-700'
                        onClick={() => imageInputRef.current?.click()}
                    >
                        <div className='text-center'>
                            {files.image ? (
                                <div className='space-y-2'>
                                    <div className='text-sm text-emerald-500'>Image selected</div>
                                    <img src={files.image.name} alt="" />
                                    <div className='text-xs text-zinc-400'>{files.image.name.slice(0, 20)}</div>
                                </div>
                            ) : (
                                <>
                                    <div className='inline-block p-3 mb-2 rounded-full bg-zinc-800'>
                                        <Upload className='w-6 h-6 text-zinc-400' />
                                    </div>
                                    <div className='mb-2 text-sm text-zinc-400'>Upload artwork</div>
                                    <Button variant='outline' size='sm' className='text-xs'>
                                        Choose File
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Audio upload */}
                    <div className='space-y-2'>
                        <label className='text-sm font-medium'>Audio File</label>
                        <div className='flex items-center gap-2'>
                            <Button variant='outline' onClick={() => audioInputRef.current?.click()} className='w-full'>
                                {files.audio ? files.audio.name.slice(0, 20) : "Choose Audio File"}
                            </Button>
                        </div>
                    </div>

                    {/* other fields */}
                    <div className='space-y-2'>
                        <label className='text-sm font-medium'>Title</label>
                        <Input
                            value={newSong.title}
                            onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
                            className='bg-zinc-800 border-zinc-700'
                        />
                    </div>

                    <div className='space-y-2'>
                        <label className='text-sm font-medium'>Artist</label>
                        <Input
                            value={newSong.artist}
                            onChange={(e) => setNewSong({ ...newSong, artist: e.target.value })}
                            className='bg-zinc-800 border-zinc-700'
                        />
                    </div>

                    <div className='space-y-2'>
                        <label className='text-sm font-medium'>Duration (seconds)</label>
                        <Input
                            type='number'
                            min='0'
                            value={newSong.duration}
                            onChange={(e) => setNewSong({ ...newSong, duration: e.target.value || "0" })}
                            className='bg-zinc-800 border-zinc-700'
                        />
                    </div>

                    <div className='space-y-2'>
                        <label className='text-sm font-medium'>Album (Optional)</label>
                        <Select
                            value={newSong.album}
                            onValueChange={(value) => setNewSong({ ...newSong, album: value })}
                        >
                            <SelectTrigger className='bg-zinc-800 border-zinc-700'>
                                <SelectValue placeholder='Select album' />
                            </SelectTrigger>
                            <SelectContent className='bg-zinc-800 border-zinc-700'>
                                <SelectItem value='none'>No Album (Single)</SelectItem>
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
                    <Button variant='outline' onClick={() => setSongDialogOpen(false)} disabled={isLoading}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} disabled={isLoading}>
                        {isLoading ? "Uploading..." : "Add Song"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
