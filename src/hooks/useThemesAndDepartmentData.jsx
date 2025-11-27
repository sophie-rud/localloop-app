import { useState, useEffect } from "react";
import { getRequest } from "../services/request";

export default function useReferenceData() {
    const [themes, setThemes] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadData() {
            setLoading(true);
            try {
                const [themesData, departmentsData] = await Promise.all([
                    getRequest("/themes"),
                    getRequest("/departments"),
                ]);
                setThemes(themesData);
                setDepartments(departmentsData);
            } catch (err) {
                setError(err.message || err);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    return { themes, departments, loading, error };
}
