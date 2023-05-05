/////////////////////////////////Search////////////////////////////////////////
//Listener for search button
var searchButton = document.getElementById("searchEvent");
var contentT = document.getElementById("content");
var output = [];

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
  // const output = events.reduce(
  //   (str, event) =>
  //     `${str}${event.summary} (${event.start.dateTime || event.start.date})\n`,
  //   "Events:\n"
  // );

  // remove all childs and array "outout"
  while (contentT.firstChild) {
    contentT.removeChild(contentT.firstChild);
  }
  output.length = 0;

// right events in "output" array
//   events.forEach(function(event) {
//   output.push(event.summary + ' (' + (event.start.dateTime || event.start.date) + ')\n');
// });

function checkValue(value) {
  if (value === undefined || value === "Invalid Date") {
    return "unbesetzt";
  } else {
    return value;
  }
}

function parseDateTime(dateTimeString) {
  const dateTime = new Date(dateTimeString);
  const date = dateTime.toLocaleDateString();
  const time = dateTime.toLocaleTimeString();
  return [date, time];
}

  events.forEach(function(event) {
    const summary = checkValue(event.summary);
    const [startDate, startTime] = checkValue(parseDateTime(event.start.dateTime));
    const [endDate, endTime] = checkValue(parseDateTime(event.end.dateTime));
  
    const eventArray = [summary, startDate, startTime, endDate, endTime];
    output.push(eventArray);
  });

//   Display events + make output clickable
  console.table(output);
//   for (var i = 0; i < output.length; i++) {
//     var div = document.createElement('div');
//     div.setAttribute('data-index', i);
//     div.innerHTML = output[i];
//     div.addEventListener('click', function() {
//       var index = parseInt(this.getAttribute('data-index'));
//       // Hier können Sie den Code hinzufügen, der bei Klick auf eine Zeile ausgeführt werden soll
//       Editor(i, output);
//       console.log('Zeile ' + index + ' wurde geklickt');
//     });
//   contentT.appendChild(div);
//   }
// }

// for (let i = 0; i < output.length; i++) {
//   for (let j = 0; j < output.length; i++) {
//     console.log(output[i][j]);
//   }
// }

for (var i = 0; i < output.length; i++) {
  var div = document.createElement('div');
  div.setAttribute('data-index', i);
  
  // Hier den Inhalt des inneren Arrays in das div-Element einfügen
  var innerArray = output[i];
  for (var j = 0; j < innerArray.length; j++) {
    div.innerHTML = div.innerHTML + " " + innerArray[j];
  }
  
  div.addEventListener('click', function() {
    var index = parseInt(this.getAttribute('data-index'));
    // Hier können Sie den Code hinzufügen, der bei Klick auf eine Zeile ausgeführt werden soll
    console.log('Zeile ' + index + ' wurde geklickt');
    Editor(output[index][0], output[index][1], output[index][2], output[index][3], output[index][4]);
  });
  
  contentT.appendChild(div);
}
}

/////////////////////////////////S////////////////////////////////////////


/////////////////////////////////create Event////////////////////////////////////////
//Listener for createEvent button
var createEventButton = document.getElementById("createEvent");
createEventButton.addEventListener("click", function () {
  console.log("create Event");
  
  var createTitel = document.getElementById("createTitel").value;
  var createDate = document.getElementById("createDate").value;
  var createTime = document.getElementById("createTime").value;
  
  
  console.log("event mit Titel:"+createTime+" Datum und Uhrzeit: "+createDate+" "+createTime);

  const event = {
    'summary': createTitel,
    // 'location': 'HTW-Dresden',
    // 'description': 'Meeting',
    'start': {
      'dateTime': createDate+'T'+createTime+':00+02:00',
      'timeZone': 'Europe/Berlin'
    },
    'end': {
      'dateTime': '2023-05-03T16:00:00+02:00',
      'timeZone': 'Europe/Berlin'
    }
    // 'recurrence': [
    //   'RRULE:FREQ=DAILY;COUNT=2'
    // ],
    // 'attendees': [
    //   {'email': 'lpage@example.com'},
    //   {'email': 'sbrin@example.com'}
    // ],
    // 'reminders': {
    //   'useDefault': false,
    //   'overrides': [
    //     {'method': 'email', 'minutes': 24 * 60},
    //     {'method': 'popup', 'minutes': 10}
    //   ]
    // }
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

// [summary, startDate, startTime, endDate, endTime]

function Editor(summary, startDate, startTime, endDate, endTime) {
  document.getElementById('editEvents').style.visibility = 'visible';
  // const ort = ["summary", "startDate", "startTime", "endDate", "endTime"];
  const ort = document.getElementById("startTime");
  const input = [summary, startDate, startTime, endDate, endTime];
  console.log(input);
  // ort.value = input[2];
  ort.value = convertToTime(input[2]);
  // for(let i = 0; i < length.input; i++) {
  //   document.getElementById(ort[i]).value = input[i];
  // }
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