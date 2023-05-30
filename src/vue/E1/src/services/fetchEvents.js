export async function fetchEvents(accessToken, start, end) {
    const startISOString = new Date(start).toISOString();
    const endISOString = new Date(end).toISOString();
    const url = `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${startISOString}&timeMax=${endISOString}`;
  
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
  
    const data = await response.json();
  
    if (data.items) {
      const events = data.items.map(item => {
        if (item.start && item.end) {
          return {
            title: item.summary,
            start: item.start.dateTime || item.start.date,
            end: item.end.dateTime || item.end.date,
            allDay: !!item.start.date,
          }
        }
      }).filter(Boolean);
  
      return events;
    }
  
    return [];
  }
  