/**
 * Author: Jamal Alkharrat - s82035@htw-dresden.de
 * Updates an event in the user's calendar, using the Google Calendar API
 * 
 * @param {string} accessToken - Google access token
 * @param {string} eventId - ID of the event to update
 * @param {Object} event - Event object containing the updated event data
 * @returns {Object} - Updated event object
 * 
 * for more info, see the Google Calendar API docs:
 * https://developers.google.com/calendar/v3/reference/events/patch
 */

import store from '../store/index.js';
export async function updateEvent(accessToken, eventId, event) {
    if (!accessToken) {
        throw new Error('Access token is required');
    }

    if (!eventId) {
        throw new Error('Event ID is required');
    }

    if (!event) {
        throw new Error('Event is required');
    }

    const url = `https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}`;

    const response = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        // Convert event object to JSON string
        body: JSON.stringify({
            summary: event.title,
            start: {
                dateTime: new Date(event.start).toISOString(),
                timeZone: 'Europe/Berlin',
            },
            end: {
                dateTime: new Date(event.end).toISOString(),
                timeZone: 'Europe/Berlin',
            },
        }),
    });

    const data = await response.json();

    // Check for error response
    if (data.error) {
        throw new Error(data.error.message);
    }

    // Format the event in the way your application expects
    const updatedEvent = {
        id: data.id,
        title: data.summary,
        start: data.start.dateTime || data.start.date,
        end: data.end.dateTime || data.end.date,
        allDay: !!data.start.date,
    };
    // update the event in the store
    store.commit('removeEvent', eventId);
    store.commit('addEvent', updatedEvent);
    return updatedEvent;
}
