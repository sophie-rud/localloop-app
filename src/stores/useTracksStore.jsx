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
        loadTrackById: (id) => withLoadingAndError(set, async () => {
            if (!id) return;
            const track = await getRequest(`/tracks/${id}`);
            set({ selectedTrack: track });
            return track;
        }),
        addTrack: (formData) => withLoadingAndError(set, async () => {
            const newTrack = await postRequest("/tracks", formData);
            set((state) => ({ tracks: [...state.tracks, newTrack] }));
            return newTrack;
        }),
        removeTrack: (id) => withLoadingAndError(set, async () => {
            await deleteRequest(`/tracks/${id}`);
            set((state) => ({ tracks: state.tracks.filter(t => t.id !== id) }));
        }),
        editTrack: (id, formData) => withLoadingAndError(set, async () => {
            const updatedTrack = await putRequest(`/tracks/${id}`, formData);
            set((state) => ({
                tracks: state.tracks.map(t => t.id === updatedTrack.id ? updatedTrack : t),
            }));
            return updatedTrack;
        }),
        getTrackFromListById: (id) => {
            return get().tracks.find(t => t.id === Number(id)) || null;
        },

        // STEPS
        steps: [],
        // loadStepsForTrack: async (trackId) => {
        //     const allSteps = await getRequest("/steps");
        //     const trackSteps = allSteps.filter(step => step.track_id === trackId);
        //     set(state => ({ ...state, steps: trackSteps }));
        //     return trackSteps;
        // },
        loadStepsForTrack: (trackId) => withLoadingAndError(set, async () => {
            const steps = await getRequest(`/tracks/${trackId}/steps`);
            set({ steps });
        }),
        loadOneStep: (trackId, stepId) => withLoadingAndError(set, async () => {
            const step = await getRequest(`/tracks/${trackId}/steps/${stepId}`);
            set({ selectedStep: step });
            return step;
        }),
        addStep: async (trackId, stepData) => withLoadingAndError(set, async () => {
            const newStep = await postRequest(`/tracks/${trackId}/steps`, { ...stepData, trackId });
            set(state => ({
                steps: [...state.steps, newStep]
            }));
            return newStep;
        }),
        editStep: async (trackId, stepData) =>
            withLoadingAndError(set, async () => {
                const updatedStep = await putRequest(`/tracks/${trackId}/steps/${stepData.id}`, stepData);
                set(state => ({
                    steps: state.steps.map(step =>
                        step.id === updatedStep.id ? updatedStep : step
                    )
                }));
                return updatedStep;
            }),
        removeStep: async (trackId, stepId) =>
            withLoadingAndError(set, async () => {
                await deleteRequest(`/tracks/${trackId}/steps/${stepId}`);
                set(state => ({
                    steps: state.steps.filter(step => step.id !== stepId)
                }));
            }),
        selectedStep: null,
        setSelectedStep: (step) => set({ selectedStep: step }),
    }
})

export default useTracksStore;