/////////////////////////////////Search////////////////////////////////////////
//Listener for search button
var searchButton = document.getElementById("searchEvent");
var editButton = document.getElementById("editEvent");
var contentT = document.getElementById("content");
var output = [];
var indexSave;

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
  // Check if pastDate is empty
  if (pastDate == "") {
    pastDate = new Date();
  }
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
  console.log(response.result.items);
  // Save events from response
  const events = response.result.items;
  // If no events found
  if (!events || events.length == 0) {
    contentT.textContent = "No events found.";
    return;
  }

  // remove all childs and array "outout"
  while (contentT.firstChild) {
    contentT.removeChild(contentT.firstChild);
  }
  output.length = 0;

function parseDateTime(dateTimeString) {
  const dateTime = new Date(dateTimeString);
  const date = dateTime.toLocaleDateString();
  const time = dateTime.toLocaleTimeString();
  return [date, time];
}

  events.forEach(function(event) {
    const eventID = event.id;
    const summary = event.summary;
    
    let startDate, startTime, endDate, endTime;
    if (event.start.dateTime && event.end.dateTime) {
      [startDate, startTime] = parseDateTime(event.start.dateTime);
      [endDate, endTime] = parseDateTime(event.end.dateTime);
    } else {
      startDate = event.start.date;
      endDate = event.end.date;
      startTime = "ganztägig";
      endTime = "ganztägig";
    }
    
    const eventArray = [eventID, summary, startDate, startTime, endDate, endTime];
    output.push(eventArray);
  });

  console.table(output);

for (var i = 0; i < output.length; i++) {
  var div = document.createElement('div');
  div.setAttribute('data-index', i);
  
  // Hier den Inhalt des inneren Arrays in das div-Element einfügen
  var innerArray = output[i];
  for (var j = 1; j < innerArray.length; j++) {
    div.innerHTML = div.innerHTML + " " + innerArray[j];
  }
  
  div.addEventListener('click', function() {
    var index = parseInt(this.getAttribute('data-index'));
    // Hier können Sie den Code hinzufügen, der bei Klick auf eine Zeile ausgeführt werden soll

    const mySection = document.getElementById('editEvents');
    const inputs = mySection.getElementsByTagName('input');
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].value = '';
    }
    
    console.log('Zeile ' + index + ' wurde geklickt');
    indexSave = index;
    console.log(output[index][0]);
    if (output[index][3] === "ganztägig" && output[index][5] === "ganztägig") {
      Editor(output[index][1], output[index][2], "00:00:00", output[index][4], "00:00:00");
    } else {
      Editor(output[index][1], output[index][2], output[index][3], output[index][4], output[index][5]);
    }
    
  });
  
  contentT.appendChild(div);
}
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


/////////////////////////////////E////////////////////////////////////////


/////////////////////////////////change Event////////////////////////////////////////

function Editor(summary, startDate, startTime, endDate, endTime) {
  document.getElementById('editEvents').style.visibility = 'visible';
  const fields = [
    { field: "summary", value: summary },
    { field: "startDate", value: startDate.includes(".") ? convertToDate(startDate) : startDate },
    { field: "startTime", value: convertToTime(startTime) },
    { field: "endDate", value: endDate.includes(".") ? convertToDate(endDate) : endDate },
    { field: "endTime", value: convertToTime(endTime) },
  ];
  fields.forEach(({ field, value }) => {
    document.getElementById(field).value = value;
  });
}

function convertToDate(referDate) {
  const dateString = referDate;
  const [day, month, year] = dateString.split(".");
  const date = new Date(`${year}-${month}-${day}`);
  const isoDateString = date.toISOString().substring(0, 10);
  console.log(isoDateString);
  return isoDateString;
}

function convertToTime(referTime) {
  const timeParts = referTime.split(':');
  const hours = timeParts[0];
  const minutes = timeParts[1];
  const formattedTime = `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
  console.log(formattedTime);
  return formattedTime;
}

editButton.addEventListener("click", function() {
  eventID = output[indexSave][0];
  summary = document.getElementById("summary").value;
  startDate = document.getElementById("startDate").value;
  endDate = document.getElementById("endDate").value;
  startTime = document.getElementById("startTime").value;
  endTime = document.getElementById("endTime").value;

  const testArray = [eventID, summary, startDate, endDate, startTime, endTime];
  console.log(testArray);

  updateEvent(eventID, summary, startDate, endDate, startTime, endTime);
});


function updateEvent(eventId, summary, startDate, endDate, startTime, endTime) {
  const startDateTime = new Date(startDate + "T" + startTime + ":00");
  const endDateTime = new Date(endDate + "T" + endTime + ":00");

  const event = {
    summary: summary,
    start: {
      dateTime: startDateTime.toISOString(),
      timeZone: 'Europe/Berlin'
    },
    end: {
      dateTime: endDateTime.toISOString(),
      timeZone: 'Europe/Berlin'
    },
  };

  const request = gapi.client.calendar.events.patch({
    'calendarId': 'primary',
    'eventId': eventId,
    'resource': event
  });
  request.execute(function(event) {
    console.log('Event updated: ' + event.htmlLink);
  });
}