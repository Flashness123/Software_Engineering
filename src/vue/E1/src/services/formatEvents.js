/**
 * Author: Jamal Alkharrat - s82035@htw-dresden.de
 * Formats events from the Google Calendar API to the format used by FullCalendar
 * 
 * @param {Object} data - Data from the Google Calendar API
 * @returns {Array} - Array of event objects, in the format used by FullCalendar
 * 
 * The function returns an array of event objects, for example:
 * {
 * id: 'Event ID',
 * title: 'Event title',
 * start: 'Event start date/time',
 * end: 'Event end date/time',
 * allDay: 'Is event all day',
 * }
 * 
 * for more info, see the FullCalendar docs:
 * https://fullcalendar.io/docs/event-object
 */

export async function formatEvents(data) {
    // If data is an array of items
    if (Array.isArray(data.items)) {
        return data.items.map(formatSingleEvent).filter(Boolean);
    }
    // If data is a single event
    else if (data.id) {
        return formatSingleEvent(data);
    }
    // If data is not in the expected format, return null or throw an error
    else {
        console.log(data);
        throw new Error('Data is not in the expected format');
    }
}

// Formats a single event, called by formatEvents()
function formatSingleEvent(item) {
    if (item.start && item.end) {
        return {
            id: item.id,
            title: item.summary,
            start: item.start.dateTime || item.start.date,
            end: item.end.dateTime || item.end.date,
            allDay: !!item.start.date,
            extendedProps: {
                description: item.description,
            },
        }
    }
    else { // If event has no start or end date, return null
        return null;
    }
}
