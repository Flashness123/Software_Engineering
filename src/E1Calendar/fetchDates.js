function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}

var eventsArray;
var today = new Date();

var fetchButton = document.getElementById("fetchButton");
var contentT = document.getElementById("content");
fetchButton.addEventListener("click", function () {
  fetchDates(today);
});

async function fetchDates(today){
  // extract end and start date from today
  var startDate = new Date(today.getFullYear(), today.getMonth(), 1); // today -1 month
  startDate.setDate(startDate.getDate() - 14); // Subtract 2 weeks
  var startDateFormatted = formatDate(startDate);

  var endDate = new Date(today.getFullYear(), today.getMonth() + 2, 1); // today +2 month
  endDate.setDate(endDate.getDate() + 14); // Add 2 weeks
  var endDateFormatted = formatDate(endDate);
  // debug
  console.log("fetchDates: " + startDateFormatted + " - " + endDateFormatted);
  let response;
  try {
    // Request Oject
    const request = {
      calendarId: "primary",
      timeMin: new Date(Date.parse(startDateFormatted)).toISOString(),
      timeMax: new Date(Date.parse(endDateFormatted)).toISOString(),
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