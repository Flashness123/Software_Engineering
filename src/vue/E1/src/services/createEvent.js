/**
 * Author: Jamal Alkharrat - s82035@htw-dresden.de
 * 
 * create an event in the user's calendar, using the Google Calendar API
 * 
 * @param {string} accessToken - Google access token
 * @param {Object} event - Event object
 * @returns {Object} - Created event object
 *
 * the event object should have the following structure:
 * {
 *  title: 'Event title',
 *  start: 'Event start date/time',
 *  end: 'Event end date/time',
 * }
 * 
 * TODO: add support for all-day events
 * TODO: add support for recurring events
 * TODO: add support for event description
 * 
 * for more info, see the Google Calendar API docs:
 * https://developers.google.com/calendar/v3/reference/events/insert  */ 
import store from '../store/index.js'
import {formatEvents} from './formatEvents.js';
export async function createEvent(accessToken, event) {
  // Error checking
  // Check for access token
  if (!accessToken) {
    throw new Error('Access token is required');
  }
  // Check for required fields
  if (!event.title) {
    throw new Error('Event title is required');
  }
  if (!event.start) {
    throw new Error('Event start is required');
  }
  if (!event.end) {
    throw new Error('Event end is required');
  }
  // Check if start is before end
  if (new Date(event.start) > new Date(event.end)) {
    throw new Error('Event start must be before event end');
  }

  // Create event
  const url = `https://www.googleapis.com/calendar/v3/calendars/primary/events`;

  const response = await fetch(url, {
    method: 'POST',
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
  // Wait for response
  const data = await response.json();

  // Check for error response
  if (data.error) {
    throw new Error(data.error.message);
  }
  // format event and add event to store
  const item = await formatEvents(data);
  store.commit('addEvent', item);
  // Return the created event
  return item;
}
