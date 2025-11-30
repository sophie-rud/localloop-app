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
            return newTrack;
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
            return updatedTrack;
        }),
        getTrackById: (id) => {
            return get().tracks.find((track) => parseInt(track.id) === parseInt(id)) || null;
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
            const steps = await getRequest(`/steps?track_id=${trackId}`);
            set({ steps });
        }),
        loadOneStep: (stepId) => withLoadingAndError(set, async () => {
            const step = await getRequest(`/steps/${stepId}`);
            set({ selectedStep: step });
            return step;
        }),
        addStep: async (trackId, stepData) => withLoadingAndError(set, async () => {
            const newStep = await postRequest(`/steps`, { ...stepData, track_id: trackId });
            set(state => ({
                steps: [...state.steps, newStep]
            }));
            return newStep;
        }),
        editStep: async (stepData) =>
            withLoadingAndError(set, async () => {
                const updatedStep = await putRequest(`/steps/${stepData.id}`, stepData);
                set(state => ({
                    steps: state.steps.map(step =>
                        step.id === updatedStep.id ? updatedStep : step
                    )
                }));
                return updatedStep;
            }),
        removeStep: async (stepId) =>
            withLoadingAndError(set, async () => {
                await deleteRequest(`/steps/${stepId}`);
                set(state => ({
                    steps: state.steps.filter(step => step.id !== stepId)
                }));
            }),
        selectedStep: null,
        setSelectedStep: (step) => set({ selectedTrack: step }),
    }
})

export default useTracksStore;