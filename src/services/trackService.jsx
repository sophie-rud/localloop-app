const enrichedTracks = tracks.map(track => {
    const theme = themes.find(t => t.id === track.theme_id) || null;

    // Trouver toutes les steps du track
    const trackSteps = steps.filter(step => step.track_id === track.id);

    // Pour l'affichage global, on récupère juste le département du **premier step**
    const firstStep = trackSteps[0];
    const place = firstStep ? places.find(p => p.id === firstStep.place_id) : null;
    const department = place ? departments.find(d => d.id === place.department_id) : null;

    return {
        ...track,
        theme,
        department,
    };
});
