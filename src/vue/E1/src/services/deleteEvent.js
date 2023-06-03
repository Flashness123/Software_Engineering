export async function deleteEvent(accessToken, eventId) {
    const url = `https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}`;
  
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
  
    // Google Calendar API returns an empty 204 status for successful delete
    if (!response.ok) {
      throw new Error(`Failed to delete event: ${response.statusText}`);
    }
  }
  