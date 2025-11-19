// function enrichTrack(track, { steps, places, themes, departments }) {
//     const theme = themes.find(t => Number(t.id) === Number(track.theme_id));
//
//     const trackSteps = steps
//         .filter(s => Number(s.track_id) === Number(track.id))
//         .map(step => {
//             const place = places.find(p => Number(p.id) === Number(step.place_id));
//             const department = place
//                 ? departments.find(d => Number(d.id) === Number(place.department_id))
//                 : null;
//
//             return {
//                 ...step,
//                 place: place ? { ...place, department } : null,
//             };
//         });
//
//     return {
//         ...track,
//         theme,
//         steps: trackSteps,
//     };
// }
//
// export default enrichTrack;

import useTracksStore from "../stores/useTracksStore";

export default function useTracksForDisplay(tracks, themes, steps, places, departments) {
        return tracks.map(track => {
            const theme = themes.find(t => t.id === track.theme_id) || null;
            const trackSteps = steps.filter(s => s.track_id === track.id);
            const firstStep = trackSteps[0];
            const place = firstStep ? places.find(p => p.id === firstStep.place_id) : null;
            const department = place ? departments.find(d => d.id === place.department_id) : null;

            return {
                ...track,
                theme,
                department,
            };

    }, [tracks, themes, steps, places, departments]);
}
