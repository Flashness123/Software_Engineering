id=0;
function displayEvent(event){

    //führende null hinzufügen
    if(event.start.getMonth() < 10)
         {startmonth = "0"+event.start.getMonth();}
    else {startmonth =     event.start.getMonth();}

    if(event.start.getDate() < 10)
         {startdate = "0"+event.start.getDate();}
    else {startdate =     event.start.getDate();}

    if(event.end.getMonth() < 10)
         {endmonth = "0"+event.end.getMonth();}
    else {endmonth =     event.end.getMonth();}

    if(event.end.getDate() < 10)
         {enddate = "0"+event.end.getDate();}
    else {enddate =     event.end.getDate();}

    document.getElementById("startdate").value=event.start.getFullYear()+"-"+startmonth+"-"+startdate;
    document.getElementById("enddate")  .value=event.end  .getFullYear()+"-"+endmonth+"-"+enddate;
    document.getElementById("starttime").value=event.start.getHours()+":"+event.start.getMinutes();
    document.getElementById("endtime")  .value=event.end  .getHours()+":"+event.end  .getMinutes();
    id=event.id;
}

function updateEvent(){
    // let eventId="50g61gmekgdg641c4pgalnjhj8";

    console.log("update Event");
    let startdate=document.getElementById("startdate").value;
    let enddate=document.getElementById("enddate").value;  
    let starttime=document.getElementById("starttime").value;
    let endtime=document.getElementById("endtime").value;  
    // console.log(startdate+enddate+starttime+endtime);
    
    // 2018-06-01T12:30:00-05:00
    // let start=startdate+"T"+starttime+"+02:00";
    // let end=enddate+"T"+endtime+"+02:00";
    // let pevent=calendar.getEventById(id);
    // console.log("start: "+start+"\nend: "+end);
    // pevent.setStart(start);
    // pevent.setEnd(end);
    // console.log(pevent);
    // calendar.addEvent( pevent );

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
    });
  }