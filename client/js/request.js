export { request };

async function request(url, method, data) {
    try {
        const headers = {};
        let body;

        if (data) {
            headers['content-Type'] = 'application/JSON';
            body = JSON.stringify(data);
        }

        const response = await fetch(url, {
            method,
            headers,
            body
        });

        return await response.json();
    } catch (e) {
        console.warn('error', e.message);
    }
}
