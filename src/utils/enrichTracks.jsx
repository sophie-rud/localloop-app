function enrichTracks(tracks = [], { steps = [], places = [], departments = [], themes = [] }) {
    return tracks.map(track => {
        const theme = themes.find(t => parseInt(t.id) === parseInt(track.theme_id)) || null;
        const trackSteps = steps.filter(s => parseInt(s.track_id) === parseInt(track.id));
        const firstStep = trackSteps[0] || null;
        const place = firstStep ? places.find(p => parseInt(p.id) === parseInt(firstStep.place_id)) : null;
        const department = place ? departments.find(d => parseInt(d.id) === parseInt(place.department_id)) : null;

        return {
            ...track,
            theme,
            place,
            department,
            positions: place ? { lat: Number(place.latitude), lng: Number(place.longitude) } : null,
        };
    })
}

export default enrichTracks;
