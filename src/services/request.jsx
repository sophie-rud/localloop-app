const baseUrl = "http://localhost:3000";

export async function fetchRequest(path, options = {}) {
    const response = await fetch(`${baseUrl}${path}`, options);
    if (!response.ok) throw new Error(`${response.status} Erreur lors de la récupération des données : ${path}`);
    if (response.status === 204) return null;
    return response.json();
}

export async function getRequest(path) {
    return fetchRequest(path, {
        method: 'GET'
    });
}

export async function createItem(path, item) {
    return fetchRequest(path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
    });
}

export async function updateItem(path, item) {
    const data = await fetchRequest(path, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
    });
    data.updatedAt = new Date();
    return data;
}

export async function deleteItem(path) {
    await fetchRequest(path, {
        method: 'DELETE'
    });
    return true;
}
