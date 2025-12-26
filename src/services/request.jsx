const baseUrl = import.meta.env.VITE_API_BASE_URL;

// async function fetchRequest(path, options = {}) {
//     const response = await fetch(`${baseUrl}${path}`, options);
//     if (!response.ok) throw new Error(`${response.status} Erreur lors de la récupération des données : ${path}`);
//     if (response.status === 204) return null;
//     return response.json();
// }

async function fetchRequest(path, options = {}) {
    try {
        let response = await fetch(`${baseUrl}${path}`, {
            ...options,
            credentials: "include",
        });

        if (response.status !== 401) {
            if (!response.ok) throw new Error(`${response.status} Erreur lors de la récupération des données : ${path}`);
            if (response.status === 204) return null;
            return response.json();
        }

        if (response.status === 401) {
            // Paths that should NOT attempt a refresh
            const noRefreshRoutes = ['/login', '/signup', '/me', '/', '/tracks'];

            if (noRefreshRoutes.includes(path)) {
                throw new Error("Non authentifié");
            }

            // Try to refresh the page
            const refreshResponse = await fetch(`/refresh`, {
                method: "POST",
                credentials: "include",
            });

            if (!refreshResponse.ok) {
                throw new Error("Session expirée, veuillez vous reconnecter.");
            }

            // Retry the initial request after refresh
            response = await fetch(`${baseUrl}${path}`, {
                ...options,
                credentials: "include",
            });

            const data = await response.json();
            if (!response.ok) throw new Error(`${response.status} Erreur lors de la récupération des données : ${path}`);
            return data;
        }
    } catch (error) {
        console.error("Erreur : ", error);
        throw new Error(error);
    }
}

async function getRequest(path) {
    return fetchRequest(path, {
        method: 'GET'
    });
}

async function postRequest(path, item) {
    return fetchRequest(path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
    });
}

async function putRequest(path, item) {
    const data = await fetchRequest(path, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
    });
    data.updatedAt = new Date();
    return data;
}

async function deleteRequest(path) {
    await fetchRequest(path, {
        method: 'DELETE'
    });
    return true;
}

export { fetchRequest, getRequest, postRequest, putRequest, deleteRequest };