function downloadICal(tripData) {
// Create a calendar object
const calendar = [
'BEGIN:VCALENDAR',
'VERSION:2.0',
'PRODID:-//My Company//EN',
'CALSCALE:GREGORIAN',
'METHOD:PUBLISH',
];

// Iterate over each day of the trip
tripData.days.forEach((day, dayIndex) => {
// Iterate over each attraction in the day
day.attractions.forEach((attraction) => {
  // Format the start and end times in iCal format
  const startTime = `${tripData.startDate}T${attraction.startTime}:00.000Z`;
  const endTime = `${tripData.startDate}T${attraction.endTime}:00.000Z`; // Try to figure if it's ok
  

  // Create an iCal event for the attraction
  calendar.push('BEGIN:VEVENT');
  calendar.push(`DTSTART:${startTime}`);
  calendar.push(`DTEND:${endTime}`);
  calendar.push(`SUMMARY:${attraction.name}`);
  calendar.push(`DESCRIPTION:${attraction.description}`);
  calendar.push(`LOCATION:${tripData.destination}`);

  // Add alarms for the event
  calendar.push('BEGIN:VALARM');
  calendar.push('TRIGGER:-PT15M');
  calendar.push('ACTION:DISPLAY');
  calendar.push('END:VALARM');

  calendar.push('BEGIN:VALARM');
  calendar.push('TRIGGER:-PT5M');
  calendar.push('ACTION:AUDIO');
  calendar.push('ATTACH:Glass');
  calendar.push('END:VALARM');

  calendar.push('BEGIN:VALARM');
  calendar.push('TRIGGER:-PT30M');
  calendar.push('ACTION:EMAIL');
  calendar.push(`ATTACH;FMTTYPE=text/calendar:${encodeURIComponent(`BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//My Company//EN\nMETHOD:PUBLISH\nBEGIN:VEVENT\nSUMMARY:${attraction.name}\nDTSTART:${startTime}\nDTEND:${endTime}\nEND:VEVENT\nEND:VCALENDAR\n`)}`);
  calendar.push(`ATTENDEE;CN=John Doe:mailto:john@example.com`);
  calendar.push('END:VALARM');

  calendar.push('END:VEVENT');
});
});

// Close the calendar object
calendar.push('END:VCALENDAR');

// Convert the calendar array to a string
const calendarString = calendar.join('\n');

// Create a Blob object from the calendar string
const blob = new Blob([calendarString], { type: 'text/calendar;charset=utf-8' });

// Create a download link for the Blob object
const link = document.createElement('a');
link.href = URL.createObjectURL(blob);
link.download = 'itinerary.ics';
document.body.appendChild(link);

// Click the link to download the file
link.click();

// Remove the link element from the DOM
document.body.removeChild(link);
}