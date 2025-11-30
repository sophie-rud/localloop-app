import TrackRow from "../../TableRow/TrackRow/TrackRow.jsx";
import {useEffect} from "react";
import useTracksStore from "../../../../stores/useTracksStore.jsx";

function TrackTable({ onEdit, onDelete }) {

    const { tracks, loadTracks } = useTracksStore();

    useEffect(() => {
        loadTracks();
    }, [loadTracks]);

    return (
        <table>
            <thead>
            <tr>
                <th>Photo</th>
                <th>Titre</th>
                <th>Durée</th>
                <th>Distance</th>
                <th>Difficulté</th>
                <th>Auteur</th>
                <th>Mis à jour</th>
                <th>Editer</th>
                <th>Supprimer</th>
            </tr>
            </thead>
            <tbody>
            {tracks.map(track => (
                <TrackRow
                    key={track.id}
                    track={track}
                    onEdit={onEdit}
                    onDelete={onDelete}
                ></TrackRow>

            ))}
            </tbody>
        </table>
    )
}

export default TrackTable;