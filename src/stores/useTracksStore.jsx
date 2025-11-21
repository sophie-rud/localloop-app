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
            await deleteRequest(`/tracks`);
            set((state) => ({ tracks: state.tracks.filter(t => t.id !== id) }));
        }),
        editTrack: (track) => withLoadingAndError(set, async () => {
            const updatedTrack = await putRequest(`/tracks`, track);
            set((state) => ({
                tracks: state.tracks.map(t => t.id === updatedTrack.id ? updatedTrack : t),
            }));
        }),
        getTrackById: (id) => {
            return get().tracks.find((track) => track.id === id) || null;
        },
        // CRUD on Steps
        addStep: async (trackId, stepData) => withLoadingAndError(set, async () => {
            const newStep = await postRequest(`/steps`, {
                ...stepData,
            });
            set((state) => ({
                tracks: state.tracks.map((track) =>
                    track.id === trackId
                        ? { ...track, steps: [...(track.steps || []), newStep] }
                        : track
                ),
            }));
            return newStep;
        }),
        editStep: async (trackId, stepData) => withLoadingAndError(set, async () => {
            const updatedStep = await putRequest(`/steps`, stepData);
            set((state) => ({
                tracks: state.tracks.map((track) =>
                    track.id === trackId
                        ? {
                            ...track,
                            steps: track.steps.map((step) => (step.id === updatedStep.id ? updatedStep : step)),
                        }
                        : track
                ),
            }));
        }),
        deleteStep: async (trackId, stepId) => withLoadingAndError(set, async () => {
            await deleteRequest(`/steps`);
            set((state) => ({
                tracks: state.tracks.map((track) =>
                    track.id === trackId
                        ? {
                            ...track,
                            steps: track.steps.filter((step) => step.id !== stepId),
                        }
                        : track
                ),
            }));
        }),
        selectedStep: null,
        setSelectedStep: (step) => set({ selectedTrack: step }),
    }
})

export default useTracksStore;