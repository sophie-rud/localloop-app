import { useState, useEffect } from "react";
import { getRequest } from "../services/request";

export default function useThemes() {
    const [themes, setThemes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadData() {
            setLoading(true);
            try {
                const themesData = await getRequest("/themes");
                setThemes(themesData);
            } catch (err) {
                setError(err.message || err);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    return { themes, loading, error };
}
