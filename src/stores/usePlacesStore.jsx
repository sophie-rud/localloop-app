import { create } from "zustand";
import withLoadingAndError from "../services/withLoadingAndError.jsx";
import {deleteRequest, getRequest, postRequest, putRequest} from "../services/request.jsx";

const usePlacesStore = create((set, get) => {
    return {
        places: [],
        selectedPlace: null,
        loading: false,
        error: null,
        setSelectedPlace: (place) => set({ selectedPlace: place }),
        setPlaces: (places) => set({places}),
        getPlaces: () => withLoadingAndError(set, async () => {
            const places = await getRequest("/places");
            set({ places });
        }),
        addPlace: (place) => withLoadingAndError(set, async () => {
            const newPlace = await postRequest("/places", place);
            set((state) => ({ places: [...state.places, newPlace] }));
            return newPlace;
        }),
        removePlace: (id) => withLoadingAndError(set, async () => {
            await deleteRequest(`/places/${id}`);
            set((state) => ({
                places: state.places.filter((place) => place.id !== id)
            }));
        }),
        editPlace: (placeData) => withLoadingAndError(set, async () => {
            const updatedPlace = await putRequest(`/places/${placeData.id}`, placeData);
            set((state) => ({
            places: state.places.map((place) =>
                place.id === updatedPlace.id ? updatedPlace : place),
            }));
            return updatedPlace;
        }),
        getPlaceById: (id) => {
            return get().places.find((place) => place.id === id) || null;
        },
    }
})

export default usePlacesStore;