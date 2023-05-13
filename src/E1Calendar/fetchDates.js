var eventsArray;

async function fetchDates(startDate, endDate) {
  let _endDate = new Date(endDate);
  _endDate.setDate(_endDate.getDate() + 1);
  endDate = _endDate.toISOString();
  // debug
  console.log("fetchDates: " + startDate + " - " + endDate);
  let response;
  try {
    // Request Oject
    const request = {
      calendarId: "primary",
      timeMin: new Date(Date.parse(startDate)).toISOString(),
      timeMax: new Date(Date.parse(endDate)).toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 999,
      orderBy: "startTime",
    };
    // Debug
    //console.log(request);
    // Send request to Google Calendar API and save as response
    response = await gapi.client.calendar.events.list(request);
  } catch (err) {
    // Error handling
    console.log(err.message);
    return;
  }
  // Save events from response
  const events = response.result.items;
  // Flatten events into an array of objects
  eventsArray = events.map(event => ({
    id: event.id,
    title: event.summary,
    start: event.start.dateTime || event.start.date,
    end: event.end.dateTime || event.end.date
  }));
  // debug
  console.log(eventsArray);
  return eventsArray;
}
export { eventsArray , fetchDates };