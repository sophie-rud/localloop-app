import { create } from "zustand";
import {getRequest, postRequest, putRequest, deleteRequest, patchRequest} from "../services/request";
import withLoadingAndError from "../services/withLoadingAndError.jsx";

const useTracksStore = create((set, get) => {
    return {
        tracks: [],
        filteredTracks: [],
        selectedTrack: null,
        loading: false,
        error: null,
        setSelectedTrack: (track) => set({ selectedTrack: track }),
        setTracks: (tracks) => set({ tracks }),
        loadTracks: () => withLoadingAndError(set, async () => {
            const tracks = await getRequest('/tracks');
            set({ tracks });
        }),
        loadFilteredTracks: (filters = {}) => withLoadingAndError(set, async () => {
            const params = new URLSearchParams();
            if (filters.query !== null) params.append('query', filters.query);
            if (filters.difficulty !== null) params.append('difficulty', filters.difficulty);
            if (filters.duration !== null) params.append('duration', filters.duration);
            if (filters.distance != null) params.append('distance', filters.distance);

            const queryString = params.toString();
            const url = queryString ? `/tracks?${queryString}` : '/tracks';

            const filteredTracks = await getRequest(url);
            set({ filteredTracks });
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

        // STEPS
        selectedStep: null,
        setSelectedStep: (step) => set({ selectedStep: step }),
        updateTracksAndSelectedTrack: (trackId, updatedSteps) => {
            set(state => {
                const updatedTracks = state.tracks.map(track =>
                    track.id === trackId
                        ? { ...track, steps: updatedSteps }
                        : track
                );

                const updatedSelectedTrack =
                    state.selectedTrack?.id === trackId
                        ? { ...state.selectedTrack, steps: updatedSteps }
                        : state.selectedTrack;

                return {
                    tracks: updatedTracks,
                    selectedTrack: updatedSelectedTrack
                };
            });
        },
        getStepsForSelectedTrack: () => {
            const track = get().selectedTrack;
            const steps = track?.steps || [];
            return [...steps].sort((a, b) => a.stepOrder - b.stepOrder);
        },
        loadStepsForTrack: (trackId) =>
            withLoadingAndError(set, async () => {
                const steps = await getRequest(`/tracks/${trackId}/steps`);
                get().updateTracksAndSelectedTrack(trackId, steps);
                return steps;
            }),
        loadOneStep: (trackId, stepId) => withLoadingAndError(set, async () => {
            const step = await getRequest(`/tracks/${trackId}/steps/${stepId}`);
            set({ selectedStep: step });
            return step;
        }),
        addStep: async (trackId, formData) => withLoadingAndError(set, async () => {
            const newStep = await postRequest(`/tracks/${trackId}/steps`, formData);
            const track = get().tracks.find(t => t.id === trackId);
            const currentSteps = track?.steps || [];
            const updatedSteps = [...currentSteps, newStep]

            get().updateTracksAndSelectedTrack(trackId, updatedSteps);
            return newStep;
        }),
        editStep: async (trackId, stepId, formData) =>
            withLoadingAndError(set, async () => {
                const updatedStep = await putRequest(`/tracks/${trackId}/steps/${stepId}`, formData);
                const track = get().tracks.find(t => t.id === trackId);
                const currentSteps = track?.steps || [];
                const updatedSteps = currentSteps.map(step =>
                    step.id === stepId ? updatedStep : step
                );

                get().updateTracksAndSelectedTrack(trackId, updatedSteps);
                return updatedStep;
            }),
        removeStep: async (trackId, stepId) =>
            withLoadingAndError(set, async () => {
                await deleteRequest(`/tracks/${trackId}/steps/${stepId}`);
                const track = get().tracks.find(t => t.id === trackId);
                const currentSteps = track?.steps || [];
                const updatedSteps = currentSteps.filter(step => step.id !== stepId);

                get().updateTracksAndSelectedTrack(trackId, updatedSteps);
            }),
        reorderStep: (trackId, stepId, direction) =>
            withLoadingAndError(set, async () => {
                const response = await patchRequest(
                    `/tracks/${trackId}/steps/${stepId}/reorder`,
                    { direction }
                );

                get().updateTracksAndSelectedTrack(trackId, response.steps);
                return response.steps;
            }),
    }
})

export default useTracksStore;