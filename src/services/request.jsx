const baseUrl = import.meta.env.VITE_API_URL;

async function fetchRequest(path, options = {}) {
    try {
        let response = await fetch(`${baseUrl}${path}`, {
            ...options,
            credentials: "include",
        });

        let data = null;
        try {
            data = await response.json();
        } catch {
            // No response body
        }

        // NON 401 Status
        if (response.status !== 401) {
            if (!response.ok) {
                throw new Error(data?.error || `${response.status} Erreur lors de la récupération des données : ${path}`);
            }
            if (response.status === 204) return null;

            return data;
        }

        // 401 Status -> REFRESH
        // Paths that should NOT attempt a refresh
        const noRefreshRoutes = ['/login', '/signup', '/forgot-password', '/reset-password', '/me', '/'];

        if (noRefreshRoutes.includes(path)) {
            throw new Error(data?.error || "Non authentifié");
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

        let retryData = null;
        try {
            retryData = await response.json();
        } catch {
            // No response body
        }

        if (!response.ok) {
            throw new Error(retryData?.error || `${response.status} Erreur lors de la récupération des données : ${path}`);
        }
        return retryData;

    } catch (error) {
        console.error("Erreur fetchRequest : ", error);
        throw error;
    }
}

async function getRequest(path) {
    return fetchRequest(path, {
        method: 'GET'
    });
}

async function postRequest(path, item) {
    const options = {
        method: 'POST',
    };

    //FormData is required to manage uploads
    // If it's FormData, let browser manage Content-Type (multipart/form-data)
    if (item instanceof FormData) {
        options.body = item;
    } else {
        // else, it's JSON
        options.headers = { 'Content-Type': 'application/json' };
        options.body = JSON.stringify(item);
    }

    return await fetchRequest(path, options);
}

async function putRequest(path, item) {
    const options = {
        method: 'PUT',
    };

    // If it's FormData, let browser manage Content-Type (multipart/form-data)
    if (item instanceof FormData) {
        options.body = item;
    } else {
        // else, it's JSON
        options.headers = { 'Content-Type': 'application/json' };
        options.body = JSON.stringify(item);
    }

    const data = await fetchRequest(path, options);
    data.updatedAt = new Date();
    return data;
}

async function deleteRequest(path) {
    await fetchRequest(path, {
        method: 'DELETE'
    });
    return true;
}

async function patchRequest(path, item) {
    return await fetchRequest(path, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
    });
}

export { fetchRequest, getRequest, postRequest, putRequest, deleteRequest, patchRequest };