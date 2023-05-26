id=0;

function displayEvent(event){

    let startDate = formatDate(event.start);
    let endDate = formatDate(event.end);
    let startTime = formatTime(event.start);
    let endTime = formatTime(event.end);
    document.getElementById("startdate").value=startDate;
    document.getElementById("enddate")  .value=endDate;
    document.getElementById("starttime").value=startTime;
    document.getElementById("endtime")  .value=endTime;
    id=event.id;
}

function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}
function formatTime(date) {
  var d = new Date(date),
      hours = '' + d.getHours(),
      minutes = '' + d.getMinutes();

  if (hours.length < 2) 
      hours = '0' + hours;
  if (minutes.length < 2) 
      minutes = '0' + minutes;

  return [hours, minutes].join(':');
}

async function updateEvent(){
    console.log("update Event");

    let startdate=document.getElementById("startdate").value;
    let enddate=document.getElementById("enddate").value;  
    let starttime=document.getElementById("starttime").value;
    let endtime=document.getElementById("endtime").value;  

    const startDateTime = new Date(startdate + "T" + starttime + ":00");
    const endDateTime = new Date(enddate + "T" + endtime + ":00");
    const event = {
      // summary: summary,
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
      'eventId': id,
      'resource': event
    });
    request.execute(function(event) {
      console.log('Event updated: ' + event.htmlLink);
      const a = new CustomEvent('updateEvent');
      document.dispatchEvent(a);
    });
   
}
