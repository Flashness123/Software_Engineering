export async function fetchEvents(accessToken, start, end) {
    if (!accessToken) {
      throw new Error('Access token is required');
    }
    // Start date - 4 weeks
    const startDate = new Date(start);
    startDate.setDate(startDate.getDate() - 28);
    // End date + 4 weeks
    const endDate = new Date(end);
    endDate.setDate(endDate.getDate() + 28);
    const startISOString = new Date(startDate).toISOString();
    const endISOString = new Date(endDate).toISOString();
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
            id: item.id,
            title: item.summary,
            start: item.start.dateTime || item.start.date,
            end: item.end.dateTime || item.end.date,
            allDay: !!item.start.date,
          }
        }
      }).filter(Boolean);
      console.log(events); // eslint-disable-line no-console
      return events;
    }
  
    return [];
  }
  