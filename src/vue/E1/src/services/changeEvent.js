id=0;

// display event info in the form
export async function displayChangeEvent(event){
    let startDate = formatDate(event.start);
    let endDate = formatDate(event.end);
    let startTime = formatTime(event.start);
    let endTime = formatTime(event.end);
    console.log("startdate: "+startDate+"enddate: "+endDate+"starttime: "+startTime+"endtime: "+endTime);
    // document.getElementById("startdate").value=startDate;
    // document.getElementById("enddate")  .value=endDate;
    // document.getElementById("starttime").value=startTime;
    // document.getElementById("endtime")  .value=endTime;
    id=event.id;
}

// format date to yyyy-mm-dd
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

// format time to hh:mm
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

// change event
export async function changeEvent(id,accessToken){
    // let startdate=document.getElementById("startdate").value;
    // let enddate=document.getElementById("enddate").value;  
    // let starttime=document.getElementById("starttime").value;
    // let endtime=document.getElementById("endtime").value; 
    // 2015-05-28T17:00:00-07:00
    let startdate="2023-06-04"
    let enddate="2023-06-04"
    let starttime="15:00"
    let endtime="16:00"
    let titel="Ein Test für Edit"
    const startDateTime = new Date(startdate + "T" + starttime + ":00");
    const endDateTime = new Date(enddate + "T" + endtime + ":00");
    const event = {
      summary: titel,
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: 'Europe/Berlin'
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: 'Europe/Berlin'
      },
    };
    console.log("id: "+id)
    console.log("accesstoken: "+accessToken)
    const url = `https://www.googleapis.com/calendar/v3/calendars/primary/events/`+id;
    
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-type': 'application/json'
      },
      body:JSON.stringify(event)
    });
    const resData = await response.json();
    console.log(resData)


    // const request = gapi.client.calendar.events.patch({
    //   'calendarId': 'primary',
    //   'eventId': id,
    //   'resource': event
    // });
    // request.execute(function(event) {
    //   console.log('Event chagned successfully: ' + event.htmlLink);
    //   const e = new CustomEvent('changeEventSuccess');
    //   document.dispatchEvent(e);
    // });
   
}
