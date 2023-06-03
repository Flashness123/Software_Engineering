export async function createEvent(accessToken, event) {
    if (!accessToken) {
      throw new Error('Access token is required');
    }
  
    const url = `https://www.googleapis.com/calendar/v3/calendars/primary/events`;
  
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        summary: event.title,
        start: {
          dateTime: new Date(event.start).toISOString(),
          timeZone: 'Europe/Berlin',
        },
        end: {
          dateTime: new Date(event.end).toISOString(),
          timeZone: 'Europe/Berlin',
        },
      }),
    });
    
    const data = await response.json();
  
    // Check for error response
    if (data.error) {
      throw new Error(data.error.message);
    }
    console.log(data); // eslint-disable-line no-console
    // Return the created event
    return data;
  }
  