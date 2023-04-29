/////////////////////////////////Search////////////////////////////////////////
//Listener for search button
var searchButton = document.getElementById("searchEvent");
searchButton.addEventListener("click", function () {
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


async function searchEvent(pastDate) {
	console.log("pastDate:");
	console.log(pastDate);
  let response;
  try {
    const request = {
      calendarId: "primary",
      timeMin: (new Date(Date.parse(pastDate))).toISOString(),
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
/////////////////////////////////S////////////////////////////////////////