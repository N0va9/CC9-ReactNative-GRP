export const apiClient = {
    async get (endpoint : string) {
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }
            return await response.json();
    }
}
