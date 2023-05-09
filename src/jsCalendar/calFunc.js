/////////////////////////////////Search////////////////////////////////////////
//Listener for search button
var searchButton = document.getElementById("searchEvent");
var contentT = document.getElementById("content");
searchButton.addEventListener("click", function () {
  var searchValue = document.getElementById("searchValue").value;
  var pastDate = document.getElementById("searchPastDate").value;
  searchEvent(pastDate, searchValue);
});

//Function - Search for events with specific parameters and display them in Element(content)
async function searchEvent(pastDate, searchValue) {
  //Debug
  console.log(pastDate);
  console.log(searchValue);
  let response;
  try {
    // Request Oject
    const request = {
      calendarId: "primary",
      timeMin: new Date(Date.parse(pastDate)).toISOString(),
      q: searchValue.toString(), //summary, description, location, displayName des Teilnehmers, email des Teilnehmers
      showDeleted: false,
      singleEvents: true,
      maxResults: 10,
      orderBy: "startTime",
    };
    // Debug
    console.log(request);
    // Send request to Google Calendar API and save as response
    response = await gapi.client.calendar.events.list(request);
  } catch (err) {
    // Error handling
    contentT.innerHTML = err.message;
    console.log(err.message);
    return;
  }
  // Save events from response
  const events = response.result.items;
  // If no events found
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
  // Display events
  contentT.innerHTML = output;
}
/////////////////////////////////S////////////////////////////////////////

/////////////////////////////////delete Event////////////////////////////////////////
var deleteEventButton = document.getElementById("deleteEvent");
deleteEventButton.addEventListener("click", function () {
  console.log("delete Event");

  var NumberId = document.getElementById("getNumberId").value;
  console.log("NumberId: ");
  console.log(NumberId);

  var params = {
    calendarId: 'primary',
    eventId: NumberId,
  };

  const deleteRequest = gapi.client.calendar.events.delete(params, function(err) {
    console.log('deleteRequest entered');
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    console.log('Event deleted.');

  });
});

////////////////////////////////create Event//////////////////////////////
//Listener for createEvent button
var createEventButton = document.getElementById("bcreateEvent");
createEventButton.addEventListener("click", function () {
  console.log("create Event");
  
  var createTitel = document.getElementById("createTitel").value;
  var createDate = document.getElementById("startDate").value;
  var endDate=document.getElementById("endDate").value;
  var createTime = document.getElementById("startTime").value;
  var endTime = document.getElementById("endTime").value;

  
  console.log("create event mit Titel:"+createTitel+" Start: "+createDate+" "+createTime+"bis: "+endDate+" "+endTime);

  if(createTitel==""){console.log("createTitel gleich null");}
  if(createTime==""){console.log("createTime gleich null");}
  if(endTime==""){console.log("endTime gleich null");}

  const event = {
    'summary': createTitel,
    // 'location': 'HTW-Dresden',
    // 'description': 'Meeting',
    'start': {
      'dateTime': createDate+'T'+createTime+':00+02:00',
      'timeZone': 'Europe/Berlin'
    },
    'end': {
      'dateTime': endDate+'T'+endTime+':00+02:00',
      'timeZone': 'Europe/Berlin'
    }
  };
  
 
  const request = gapi.client.calendar.events.insert({
    'calendarId': 'primary',
    'resource': event
  });

  request.execute(function(event) {
    console.log("request.execute");
    // appendPre('Event created: ' + event.htmlLink);
  });

  
});


////////////////////////////////E//////////////////////////////