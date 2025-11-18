import { create } from "zustand";

const useTracksStore = create((set, get) => {
    return {
        tracks: [],
        selectedTrack: null,
        setSelectedTrack: (track) => set({ selectedTrack: track }),
        setTracks: (tracks) => set({ tracks }),
        loading: false,
        error: null,
        addTrack: (newTrack) => set((state) => ({
                tracks: [...state.tracks, newTrack]
        })),
        removeTrack: (id) => set((state) => ({
                tracks: state.tracks.filter((track) => track.id !== id)
        })),
        editTrack: (updatedTrack) => set((state) => ({
            tracks: state.tracks.map((track) =>
                track.id === updatedTrack.id ? updatedTrack : track
            ),
        })),
        getTrackById: (id) => {
            return get().find((track) => track.id === id) || null;
        },
    }
})

export default useTracksStore;