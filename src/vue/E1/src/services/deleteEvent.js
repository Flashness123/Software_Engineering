/**
 * Author: Jamal Alkharrat - s82035@htw-dresden.de
 * Deletes an event from the user's calendar, using the Google Calendar API
 * 
 * @param {string} accessToken - Google access token
 * @param {string} eventId - ID of the event to delete
 * @returns {void}
 * 
 * for more info, see the Google Calendar API docs:
 * https://developers.google.com/calendar/v3/reference/events/delete
 */

import store from '../store/index.js';
export async function deleteEvent(accessToken, eventId) {
    const url = `https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}`;
  
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
  
    // Google Calendar API returns an empty 204 status for successful delete
    if (!response.ok) {
      throw new Error(`Failed to delete event: ${response.statusText}`);
    } else {
      // Remove the event from the store
      store.commit('removeEvent', eventId);
    }
  }
  