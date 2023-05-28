/* 
 * Fetches events from Google Calendar API
 * Author: Jamal Alkharrat, s82035@htw-dresden.de
 * Date: 2023-05-28
 */

var eventsArray;
var MAX_RESULTS = 999;

// Fetch events from Google Calendar API
async function fetchEvents(startDate, endDate) {
  console.log("fetchEvents: " + startDate + " - " + endDate);
  let response; // Response object
  try {
    // Request events from primary calendar
    const request = {
      calendarId: "primary",
      timeMin: new Date(Date.parse(startDate)).toISOString(),
      timeMax: new Date(Date.parse(endDate)).toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: MAX_RESULTS,
      orderBy: "startTime",
    };
    // Send request to Google Calendar API and save as response
    response = await gapi.client.calendar.events.list(request);
  } catch (err) {
    // Error handling
    console.error(err);
    return;
  }
  // Save events from response
  const events = response.result.items;
  // Flatten events into an array of objects
  eventsArray = events.map(event => ({ // map() creates a new array with the results of calling a function for every array element
    id: event.id,
    title: event.summary,
    start: event.start.dateTime || event.start.date,
    end: event.end.dateTime || event.end.date
  })); // end of events.map
  return eventsArray;
}
export { eventsArray , fetchEvents };