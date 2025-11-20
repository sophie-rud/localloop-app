import { create } from "zustand";
import { getRequest, postRequest, putRequest, deleteRequest } from "../services/request";
import withLoadingAndError from "../services/withLoadingAndError.jsx";

const useTracksStore = create((set, get) => {
    return {
        tracks: [],
        selectedTrack: null,
        loading: false,
        error: null,
        setSelectedTrack: (track) => set({ selectedTrack: track }),
        setTracks: (tracks) => set({ tracks }),
        loadTracks: () => withLoadingAndError(set, async () => {
            const tracks = await getRequest("/tracks");
            set({ tracks });
        }),
        addTrack: (track) => withLoadingAndError(set, async () => {
            const newTrack = await postRequest("/tracks", track);
            set((state) => ({ tracks: [...state.tracks, newTrack] }));
        }),
        removeTrack: (id) => withLoadingAndError(set, async () => {
            await deleteRequest(`/tracks/${id}`);
            set((state) => ({ tracks: state.tracks.filter(t => t.id !== id) }));
        }),
        editTrack: (track) => withLoadingAndError(set, async () => {
            const updatedTrack = await putRequest(`/tracks/${track.id}`, track);
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