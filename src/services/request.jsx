const baseUrl = "http://localhost:3000";

async function fetchRequest(path, options = {}) {
    const response = await fetch(`${baseUrl}${path}`, options);
    if (!response.ok) throw new Error(`${response.status} Erreur lors de la récupération des données : ${path}`);
    if (response.status === 204) return null;
    return response.json();
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