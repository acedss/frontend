import { axiosInstance } from "@/lib/axios";
import { Album, Song, Stats } from "@/types";
import { toast } from "sonner";

import { create } from "zustand";

interface MusicStore {
    songs: Song[];
    albums: Album[];
    isLoading: boolean;
    error: string | null;
    currentAlbum: Album | null;
    featuredSongs: Song[];
    madeForYouSongs: Song[];
    trendingSongs: Song[];
    stats: Stats;

    fetchAlbums: () => Promise<void>;
    fetchAlbumById: (id: string) => Promise<void>;
    fetchFeaturedSongs: () => Promise<void>;
    fetchMadeForYouSongs: () => Promise<void>;
    fetchTrendingSongs: () => Promise<void>;
    fetchStats: () => Promise<void>;
    fetchSongs: () => Promise<void>;
    deleteSong: (id: string) => Promise<void>;
    deleteAlbum: (id: string) => Promise<void>;
    editSong: (songId: string, updatedData: Partial<Song>) => Promise<void>;
    editAlbum: (albumId: string, updatedData: Partial<Album>) => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => ({
    albums: [],
    songs: [],
    isLoading: false,
    error: null,
    currentAlbum: null,
    madeForYouSongs: [],
    featuredSongs: [],
    trendingSongs: [],
    stats: {
        totalSongs: 0,
        totalAlbums: 0,
        totalUsers: 0,
        totalArtists: 0,
    },

    deleteSong: async (id) => {
        set({ isLoading: true, error: null });
        try {
            await axiosInstance.delete(`/admin/songs/${id}`);

            set((state) => ({
                songs: state.songs.filter((song) => song._id !== id),
            }));
            toast.success("Song deleted successfully");
        } catch (error: any) {
            console.log("Error in deleteSong", error);
            toast.error("Error deleting song");
        } finally {
            set({ isLoading: false });
        }
    },

    deleteAlbum: async (id) => {
        set({ isLoading: true, error: null });
        try {
            await axiosInstance.delete(`/admin/albums/${id}`);
            set((state) => ({
                albums: state.albums.filter((album) => album._id !== id),
                songs: state.songs.map((song) =>
                    song.albumId === state.albums.find((a) => a._id === id)?.title ? { ...song, album: null } : song
                ),
            }));
            toast.success("Album deleted successfully");
        } catch (error: any) {
            toast.error("Failed to delete album: " + error.message);
        } finally {
            set({ isLoading: false });
        }
    },

    fetchSongs: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get("/songs");
            set({ songs: response.data });
        } catch (error: any) {
            set({ error: error.message });
        } finally {
            set({ isLoading: false });
        }
    },

    fetchStats: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get("/stats");
            set({ stats: response.data });
        } catch (error: any) {
            set({ error: error.message });
        } finally {
            set({ isLoading: false });
        }
    },

    fetchAlbums: async () => {
        set({ isLoading: true, error: null });

        try {
            const response = await axiosInstance.get("/albums");
            set({ albums: response.data });
        } catch (error: any) {
            set({ error: error.response.data.message });
        } finally {
            set({ isLoading: false });
        }
    },

    fetchAlbumById: async (id) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get(`/albums/${id}`);
            set({ currentAlbum: response.data });
        } catch (error: any) {
            set({ error: error.response.data.message });
        } finally {
            set({ isLoading: false });
        }
    },

    fetchFeaturedSongs: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get("/songs/featured");
            set({ featuredSongs: response.data });
        } catch (error: any) {
            set({ error: error.response.data.message });
        } finally {
            set({ isLoading: false });
        }
    },

    fetchMadeForYouSongs: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get("/songs/made-for-you");
            set({ madeForYouSongs: response.data });
        } catch (error: any) {
            set({ error: error.response.data.message });
        } finally {
            set({ isLoading: false });
        }
    },

    fetchTrendingSongs: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get("/songs/trending");
            set({ trendingSongs: response.data });
        } catch (error: any) {
            set({ error: error.response.data.message });
        } finally {
            set({ isLoading: false });
        }
    },
    editSong: async (songId, updatedData) => {
        set({ isLoading: true, error: null });
        try {
            await axiosInstance.put(`/admin/songs/${songId}`, updatedData);
            set((state) => ({
                songs: state.songs.map((song) =>
                    song._id === songId ? { ...song, ...updatedData } : song
                ),
            }));
            toast.success("Song updated successfully");
        } catch (error: any) {
            console.error("Error editing song", error);
            toast.error("Failed to update song");
        } finally {
            set({ isLoading: false });
        }
    },

    editAlbum: async (albumId, updatedData) => {
        set({ isLoading: true, error: null });
        try {
            // Make the PUT request
            await axiosInstance.put(`/admin/albums/${albumId}`, updatedData);

            // Update store: merge new data into the existing album
            set((state) => ({
                albums: state.albums.map((album) =>
                    album._id === albumId ? { ...album, ...updatedData } : album
                ),
            }));

            toast.success("Album updated successfully");
        } catch (error: any) {
            console.error("Error editing album", error);
            toast.error("Failed to update album");
        } finally {
            set({ isLoading: false });
        }
    },
}));
