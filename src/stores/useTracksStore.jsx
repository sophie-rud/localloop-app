import { create } from "zustand";
import {getRequest, postRequest, putRequest, deleteRequest, patchRequest} from "../services/request";
import withLoadingAndError from "../services/withLoadingAndError.jsx";

const useTracksStore = create((set, get) => {
    return {
        tracks: [],
        filteredTracks: [],
        userTracks: [],
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
        loadUserTracks: () => withLoadingAndError(set, async () => {
            const userTracks = await getRequest('/me/tracks/');
            set({ userTracks });
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
            const result = await putRequest(`/tracks/${id}`, formData);
            set((state) => ({
                tracks: state.tracks.map(t => t.id === result.updatedTrack.id ? result.updatedTrack : t),
            }));
            return result;
        }),

        // STEPS
        selectedStep: null,
        setSelectedStep: (step) => set({ selectedStep: step }),
        getStepsForSelectedTrack: () => {
            return get().selectedTrack?.steps || [];
        },
        loadStepsForTrack: (trackId) =>
            withLoadingAndError(set, async () => {
                const steps = await getRequest(`/tracks/${trackId}/steps`);

                set(state => {
                    const sortedSteps = [...steps].sort((a, b) => a.stepOrder - b.stepOrder);

                    return {
                        tracks: state.tracks.map(track =>
                            track.id === trackId
                                ? { ...track, steps: sortedSteps }
                                : track
                        ),
                        selectedTrack: state.selectedTrack?.id === trackId
                            ? { ...state.selectedTrack, steps: sortedSteps }
                            : state.selectedTrack
                    };
                });

                return steps;
            }),
        loadOneStep: (trackId, stepId) => withLoadingAndError(set, async () => {
            const step = await getRequest(`/tracks/${trackId}/steps/${stepId}`);
            set({ selectedStep: step });
            return step;
        }),
        addStep: async (trackId, formData) => withLoadingAndError(set, async () => {
            const newStep = await postRequest(`/tracks/${trackId}/steps`, formData);

            set(state => {
                const track = state.tracks.find(t => t.id === trackId);
                if (!track) return state;

                const updatedSteps = [...track.steps, newStep];
                const sortedSteps = updatedSteps.sort((a, b) => a.stepOrder - b.stepOrder);

                return {
                    tracks: state.tracks.map(t => t.id === trackId ? { ...t, steps: sortedSteps } : t),
                    selectedTrack: state.selectedTrack?.id === trackId
                        ? { ...state.selectedTrack, steps: sortedSteps }
                        : state.selectedTrack
                };
            });

            return newStep;
        }),
        editStep: async (trackId, stepId, formData) =>
            withLoadingAndError(set, async () => {
                const updatedStep = await putRequest(`/tracks/${trackId}/steps/${stepId}`, formData);

                set(state => {
                    const track = state.tracks.find(t => t.id === trackId);
                    if (!track) return state;

                    const updatedSteps = track.steps.map(step =>
                        step.id === stepId ? updatedStep : step
                    );
                    return {
                        tracks: state.tracks.map(t =>
                            t.id === trackId ? { ...t, steps: updatedSteps } : t
                        ),
                        selectedTrack: state.selectedTrack?.id === trackId
                            ? { ...state.selectedTrack, steps: updatedSteps }
                            : state.selectedTrack
                    };
                });

                return updatedStep;
            }),
        removeStep: async (trackId, stepId) =>
            withLoadingAndError(set, async () => {
                await deleteRequest(`/tracks/${trackId}/steps/${stepId}`);

                set(state => {
                    const track = state.tracks.find(t => t.id === trackId);
                    if (!track) return state;

                    const updatedSteps = track.steps.filter(step => step.id !== stepId);

                    return {
                        tracks: state.tracks.map(t =>
                            t.id === trackId ? { ...t, steps: updatedSteps } : t
                        ),
                        selectedTrack: state.selectedTrack?.id === trackId
                            ? { ...state.selectedTrack, steps: updatedSteps }
                            : state.selectedTrack
                    };
                });
            }),
        reorderStep: (trackId, stepId, direction) =>
            withLoadingAndError(set, async () => {
                const response = await patchRequest(
                    `/tracks/${trackId}/steps/${stepId}/reorder`,
                    { direction }
                );
                set(state => {
                    const updatedTracks = state.tracks.map(track =>
                        track.id === trackId
                            ? { ...track, steps: response.steps }
                            : track
                    );
                    const updatedSelectedTrack =
                        state.selectedTrack?.id === trackId
                            ? { ...state.selectedTrack, steps: response.steps }
                            : state.selectedTrack;
                    return {
                        tracks: updatedTracks,
                        selectedTrack: updatedSelectedTrack
                    };
                });

                return response.steps;
            }),
    }
})

export default useTracksStore;