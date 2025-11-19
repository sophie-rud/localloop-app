import { create } from "zustand";

const usePlacesStore = create((set, get) => {
    return {
        places: [],
        setPlaces: (places) => set({places}),
        addPlace: (newPlace) => set((state) => ({
            places: [...state.places, newPlace]
        })),
        removePlace: (id) => set((state) => ({
            places: state.places.filter((place) => place.id !== id)
        })),
        editPlace: (updatedPlace) => set((state) => ({
            places: state.places.map((place) =>
                place.id === updatedPlace.id ? updatedPlace : place
            ),
        })),
        getPlaceById: (id) => {
            return get().find((place) => place.id === id) || null;
        },
    }
})

export default usePlacesStore;