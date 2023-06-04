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

function formatSingleEvent(item) {
    if (item.start && item.end) {
        return {
            id: item.id,
            title: item.summary,
            start: item.start.dateTime || item.start.date,
            end: item.end.dateTime || item.end.date,
            allDay: !!item.start.date,
        }
    }
    else {
        return null;
    }
}
