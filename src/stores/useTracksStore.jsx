import { create } from "zustand";
import * as request from "../services/request";
import withStoreLoading from "../services/withStoreLoadingService.jsx";

const useTracksStore = create((set, get) => {
    return {
        tracks: [],
        selectedTrack: null,
        loading: false,
        error: null,
        setSelectedTrack: (track) => set({ selectedTrack: track }),
        setTracks: (tracks) => set({ tracks }),
        loadTracks: () => withStoreLoading(set, async () => {
            const tracks = await request.getRequest("/tracks");
            set({ tracks });
        }),
        addTrack: (track) => withStoreLoading(set, async () => {
            const newTrack = await request.createItem("/tracks", track);
            set((state) => ({ tracks: [...state.tracks, newTrack] }));
        }),
        removeTrack: (id) => withStoreLoading(set, async () => {
            await request.deleteItem(`/tracks/${id}`);
            set((state) => ({ tracks: state.tracks.filter(t => t.id !== id) }));
        }),
        editTrack: (track) => withStoreLoading(set, async () => {
            const updatedTrack = await request.updateItem(`/tracks/${track.id}`, track);
            set((state) => ({
                tracks: state.tracks.map(t => t.id === updatedTrack.id ? updatedTrack : t),
            }));
        }),
        getTrackById: (id) => {
            return get().tracks.find((track) => track.id === id) || null;
        },
    }
})

export default useTracksStore;