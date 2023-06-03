export async function searchEvents(accessToken, query) {
    // Error checking
    // Check for access token
    if (!accessToken) {
        throw new Error('Access token is required');
    }
    // Check for query
    if (!query) {
        throw new Error('Query is required');
    }

    // Search events
    const url = `https://www.googleapis.com/calendar/v3/calendars/primary/events?q=${encodeURIComponent(query)}`;

    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    const data = await response.json();

    // Check for error response
    if (data.error) {
        throw new Error(data.error.message);
    }

    // Return the events
    return data.items;
}
