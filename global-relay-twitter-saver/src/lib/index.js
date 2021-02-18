export const constructGETRequest = (token) => {
    return {
        headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': 0,
            'Authorization': 'Bearer ' + token,
        }
    }
}