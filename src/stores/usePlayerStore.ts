import { create } from "zustand";
import { Song } from "@/types";
import { useChatStore } from "./useChatStore";
import { useUser } from "@clerk/clerk-react";

// NOTE: This hook needs to be used **inside a React component or effect**
// to access the authenticated Clerk user
let clerkUserId: string | null = null;

export const setClerkUserId = (id: string) => {
    clerkUserId = id;
};

interface PlayerStore {
    currentSong: Song | null;
    isPlaying: boolean;
    queue: Song[];
    currentIndex: number;

    initializeQueue: (songs: Song[]) => void;
    playAlbum: (songs: Song[], startIndex?: number) => void;
    setCurrentSong: (song: Song | null) => void;
    togglePlay: () => void;
    playNext: () => void;
    playPrevious: () => void;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
    currentSong: null,
    isPlaying: false,
    queue: [],
    currentIndex: -1,

    initializeQueue: (songs: Song[]) => {
        set({
            queue: songs,
            currentSong: get().currentSong || songs[0],
            currentIndex: get().currentIndex === -1 ? 0 : get().currentIndex
        });
    },

    playAlbum: (songs: Song[], startIndex = 0) => {
        if (songs.length === 0) return;

        const song = songs[startIndex];
        const { updateActivity } = useChatStore.getState();

        if (clerkUserId) {
            updateActivity(clerkUserId, song.title, song.artist);
        }

        set({
            queue: songs,
            currentSong: song,
            currentIndex: startIndex,
            isPlaying: true,
        });
    },

    setCurrentSong: (song: Song | null) => {
        if (!song) return;

        const songIndex = get().queue.findIndex(s => s._id === song._id);
        const { updateActivity } = useChatStore.getState();

        if (clerkUserId) {
            updateActivity(clerkUserId, song.title, song.artist);
        }

        set({
            currentSong: song,
            isPlaying: true,
            currentIndex: songIndex !== -1 ? songIndex : get().currentIndex
        });
    },

    togglePlay: () => {
        const { isPlaying, currentSong } = get();
        const { updateActivity } = useChatStore.getState();
        const willStartPlaying = !isPlaying;

        if (clerkUserId && currentSong) {
            if (willStartPlaying) {
                updateActivity(clerkUserId, currentSong.title, currentSong.artist);
            } else {
                updateActivity(clerkUserId, "", "");
            }
        }

        set({ isPlaying: willStartPlaying });
    },

    playNext: () => {
        const { currentIndex, queue } = get();
        const nextIndex = currentIndex + 1;

        if (nextIndex < queue.length) {
            const nextSong = queue[nextIndex];
            const { updateActivity } = useChatStore.getState();

            if (clerkUserId) {
                updateActivity(clerkUserId, nextSong.title, nextSong.artist);
            }

            set({
                currentSong: nextSong,
                currentIndex: nextIndex,
                isPlaying: true,
            });
        } else {
            if (clerkUserId) {
                useChatStore.getState().updateActivity(clerkUserId, "", "");
            }
            set({ isPlaying: false });
        }
    },

    playPrevious: () => {
        const { currentIndex, queue } = get();
        const prevIndex = currentIndex - 1;

        if (prevIndex >= 0) {
            const prevSong = queue[prevIndex];
            const { updateActivity } = useChatStore.getState();

            if (clerkUserId) {
                updateActivity(clerkUserId, prevSong.title, prevSong.artist);
            }

            set({
                currentSong: prevSong,
                currentIndex: prevIndex,
                isPlaying: true,
            });
        } else {
            if (clerkUserId) {
                useChatStore.getState().updateActivity(clerkUserId, "", "");
            }
            set({ isPlaying: false });
        }
    },
}));
