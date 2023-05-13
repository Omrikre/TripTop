const formContainer = document.querySelector('#form-container');
const cityName = tripData.destination;
const cityNameWithoutSpaces = cityName.replace(/\s/g, '');

formContainer.innerHTML = `
<h1 class="welcome-title">Trip Information</h1>
<form>
    <label style="font-weight:Bold;" for="destination">Destination:</label>
    <span id="destination">${tripData.destination}</span><br><br>

    <table>
    <tr>
        <th>Day Of The Trip</th>
        <th>Start Time</th>
        <th>End Time</th>
        <th>Attraction Name</th>
        <th>Description</th>
        <th>Google Places Link</th>
    </tr>
    <!-- Generate table rows dynamically based on the trip data -->
    ${tripData.days.map((day, i) => {
        // Add a blank row for every new day
        const blankRow = i > 0 ? '<tr><td colspan="6">&nbsp;</td></tr>' : '';
        return blankRow + day.attractions.map((attraction, j) => {
        return `
            <tr>
            <td>Day ${i + 1}</td>
            <td>${attraction.startTime}</td>
            <td>${attraction.endTime}</td>
            <td>${attraction.name}</td>
            <td>${attraction.description}</td>
            <td><a style="font-weight:bold" href="https://www.google.com/maps/search/?api=1&query=${attraction.name}+${tripData.destination}" target="_blank">Google Maps Link</a></td>
            </tr>
        `;
        }).join('');
    }).join('')}
    </table>

    <img style="border-radius: 5px;" height="200" src="https://source.unsplash.com/1600x900/?${cityNameWithoutSpaces}" alt="Trip image">

</form>
`;
const placeName = tripData.destination; // Replace with the name of the place you want to get the coordinates for

// Use OSM Nominatim to get the coordinates of the place
fetch(`https://nominatim.openstreetmap.org/search?q=${placeName}&format=json`)
.then(response => response.json())
.then(data => {
if (data.length > 0) {
    // Get the latitude and longitude of the first result (assuming there is one)
    const lat = data[0].lat;
    const lon = data[0].lon;

    // Create the map
    var map = L.map('map').setView([lat, lon], 13);

    // Add a tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
    maxZoom: 18,
    }).addTo(map);

    // Loop through each day of the trip
    tripData.days.forEach(day => {
    // Loop through each attraction on the day
    day.attractions.forEach(attraction => {
        // Use OSM Nominatim to get the coordinates of the attraction
        fetch(`https://nominatim.openstreetmap.org/search?q=${attraction.name}, ${tripData.destination}&format=json`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
            // Get the latitude and longitude of the first result (assuming there is one)
            const lat = data[0].lat;
            const lon = data[0].lon;

            // Add a marker to the map for the attraction
            var marker = L.marker([lat, lon]).addTo(map);

            // Add a popup to the marker with the attraction's name and description
            marker.bindPopup(`<h3>${attraction.name}</h3><p>${attraction.description}</p>`).openPopup();
            }
        });
    });
    });
}
});

