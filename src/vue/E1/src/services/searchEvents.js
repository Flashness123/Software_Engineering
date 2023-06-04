/**
 * Author: Jamal Alkharrat - s82035@htw-dresden.de
 * Searches the user's calendar for events matching the given query, using the Google Calendar API
 * 
 * @param {string} accessToken - Google access token
 * @param {string} query - Search query
 * @returns {Array} - Array of events
 * 
 * TODO: Deciede how to display the events in the UI
 * 
 * for more info, see the Google Calendar API docs:
 * https://developers.google.com/calendar/v3/reference/events/list
 */

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
