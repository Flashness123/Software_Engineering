//Listener for search button
var searchButton = document.getElementById("searchEvent");
searchButton.addEventListener("click", function () {
	// document.getElementById("look").innerText = "Look for events";
	var searchValue = document.getElementById("searchValue").value;
	var pastDate = document.getElementById("searchPastDate").value;
  searchEvent(pastDate);
});
/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
var contentT = document.getElementById("content");


async function searchEvent() {
	var pastDate;
	console.log("pastDate:");
	console.log(pastDate);
  let response;
  try {
    const request = {
      calendarId: "primary",
      timeMin: pastDate,
      showDeleted: false,
      singleEvents: true,
      maxResults: 10,
      orderBy: "startTime",
    };
    // gapi.client.load("calendar", "v3");
		console.log(request);
    response = await gapi.client.calendar.events.list(request);
  } catch (err) {
    contentT.innerHTML = err.message;
		console.log(err.message);
    return;
  }

  const events = response.result.items;
  if (!events || events.length == 0) {
    contentT.textContent = "No events found.";
    return;
  }
  // Flatten to string to display
  const output = events.reduce(
    (str, event) =>
      `${str}${event.summary} (${event.start.dateTime || event.start.date})\n`,
    "Events:\n"
  );
  contentT.innerHTML = output;
}

// Refer to the JavaScript quickstart on how to setup the environment:
// https://developers.google.com/calendar/quickstart/js
// Change the scope to 'https://www.googleapis.com/auth/calendar' and delete any
// stored credentials.

// const event = {
//     'summary': 'Google I/O 2015',
//     'location': '800 Howard St., San Francisco, CA 94103',
//     'description': 'A chance to hear more about Google\'s developer products.',
//     'start': {
//       'dateTime': '2015-05-28T09:00:00-07:00',
//       'timeZone': 'America/Los_Angeles'
//     },
//     'end': {
//       'dateTime': '2015-05-28T17:00:00-07:00',
//       'timeZone': 'America/Los_Angeles'
//     },
//     'recurrence': [
//       'RRULE:FREQ=DAILY;COUNT=2'
//     ],
//     'attendees': [
//       {'email': 'lpage@example.com'},
//       {'email': 'sbrin@example.com'}
//     ],
//     'reminders': {
//       'useDefault': false,
//       'overrides': [
//         {'method': 'email', 'minutes': 24 * 60},
//         {'method': 'popup', 'minutes': 10}
//       ]
//     }
//   };

//   const request = gapi.client.calendar.events.insert({
//     'calendarId': 'primary',
//     'resource': event
//   });

//   request.execute(function(event) {
//     appendPre('Event created: ' + event.htmlLink);
//   });
