interface Event {
    id: string;
    title: string;
    start: string;
    end: string;
    allDay: boolean;
  }
  
  export async function fetchEvents(accessToken: string, start: Date, end: Date): Promise<Event[]> {
    if (!accessToken) {
      throw new Error('Access token is required');
    }
    // Start date - 8 weeks
    const startDate = new Date(start);
    startDate.setDate(startDate.getDate() - 56);
    // End date + 8 weeks
    const endDate = new Date(end);
    endDate.setDate(endDate.getDate() + 56);
    const startISOString = startDate.toISOString();
    const endISOString = endDate.toISOString();
    const url = `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${startISOString}&timeMax=${endISOString}`;
  
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
  
    const data = await response.json();
  
    // Check for error response
    if (data.error) {
      throw new Error(data.error.message);
    }
  
    // Check for items
    if (data.items) {
      const events: Event[] = data.items.map((item: any) => {
        if (item.start && item.end) {
          return {
            id: item.id,
            title: item.summary,
            start: item.start.dateTime || item.start.date,
            end: item.end.dateTime || item.end.date,
            allDay: !!item.start.date,
          }
        }
      }).filter(Boolean); // Remove undefined items
      console.log(events); // eslint-disable-line no-console
      return events;
    }
  
    return [];
  }
  