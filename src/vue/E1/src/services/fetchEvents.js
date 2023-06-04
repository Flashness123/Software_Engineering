/**
 * Author: Jamal Alkharrat - s82035@htw-dresden.de
 * 
 * Fetches events from Google Calendar API, for the specified time range
 * 
 * @param {string} accessToken - Google access token
 * @param {string} start - Start date/time, in ISO format
 * @param {string} end - End date/time, in ISO format
 * @returns {Array} - Array of event objects
 *
 * The function returns an array of event objects, for example:
 * {
 *  id: 'Event ID',
 * title: 'Event title',
 * start: 'Event start date/time',
 * end: 'Event end date/time',
 * allDay: 'Is event all day',
 * }
 * 
 * TODO: add support for recurring events
 * TODO: add support for event description
 * 
 * for more info, see the Google Calendar API docs:
 * https://developers.google.com/calendar/v3/reference/events/list
 * 
 */
import { formatEvents } from './formatEvents.js';
import store from '../store/index.js';

export async function fetchEvents(accessToken, start, end) {
  // Error checking
  // Check for access token
  if (!accessToken) {
    throw new Error('Access token is required');
  }
  // Check if start is before end
  if (new Date(start) > new Date(end)) {
    throw new Error('Start date must be before end date');
  }
  // Start date - 8 weeks
  const startDate = new Date(start);
  startDate.setDate(startDate.getDate() - 56);
  // End date + 8 weeks
  const endDate = new Date(end);
  endDate.setDate(endDate.getDate() + 56);
  // Convert dates to ISO strings
  const startISOString = new Date(startDate).toISOString();
  const endISOString = new Date(endDate).toISOString();
  // Fetch events
  const url = `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${startISOString}&timeMax=${endISOString}`;

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
  // Check for items
  if (data.items) {
    const events = await formatEvents(data);
    // commit events to store
    store.commit('setCalendarEvents', events); 
    return events;
  }
  // No events, return empty array
  return [];
}
