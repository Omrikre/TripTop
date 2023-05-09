function displayLoadingForm(formContainer) {
  // Array of jokes
  var jokes = [    "Why did the bicycle fall over? Because it was two tired!",    "Why did the tomato turn red? Because it saw the salad dressing!",    "What did the grape say when it got stepped on? Nothing, it just let out a little wine.",    "Why don't scientists trust atoms? Because they make up everything.",    "What do you call an alligator in a vest? An investi-gator.",    "Why did the chicken cross the playground? To get to the other slide.",    "Why do seagulls fly over the sea? Because if they flew over the bay, they would be bagels.",    "Why did the cookie go to the doctor? Because it was feeling crummy.",    "Why did the scarecrow win an award? Because he was outstanding in his field.",    "What do you get when you cross a snowman and a shark? Frostbite.",    "What do you call a fake noodle? An impasta."  ];

  // Randomly select a joke from the array
  var jokeIndex = Math.floor(Math.random() * jokes.length);
  var joke = jokes[jokeIndex];

  formContainer.innerHTML = `
    <form>
      <div class="loading">
        <div class="spinner">
          <div class="person"></div>
        </div>
        <p style="text-align: center; text-transform: uppercase;">Thank you for choosing TripTop.</p>
        <p style="text-align: center;">
          We are creating personalized travel itinerary based on your preferences.
          <br>
          This may take a few moments. Thank you for your patience.
        </p>
        <p style="text-align: center; color: blue; font-size: large;" id="joke">${joke}</p>
        <br>
      </div>
    </form>
  `;
}


const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  var startDate = new Date(document.getElementById('startDate').value);
  var endDate = new Date(document.getElementById('endDate').value);

  // Calculate the difference in days
  var timeDiff = endDate.getTime() - startDate.getTime();
  var diffDays = timeDiff / (1000 * 3600 * 24);

  // If the difference is greater than 5, display an error message
   if (diffDays > 5) {
    alert('Error: Maximum trip length is 5 days.');
    throw new Error('Error: Maximum trip length is 5 days.');
  }
  
  const formData = new FormData(form);
  const includeCategories = Array.from(formData.getAll('includeCategories'));
  const excludeCategories = Array.from(formData.getAll('excludeCategories'));
  const hasCommonValues = includeCategories.some(category => excludeCategories.includes(category));
  if(hasCommonValues) {
    alert("Can't choose the same category to include and exclude.");
    throw new Error("Can't choose the same category to include and exclude.");
  }
  // convert numeric strings to numbers
  const jsonObject = Object.fromEntries(formData.entries());
  for (const [key, value] of Object.entries(jsonObject)) {
    if (/^-?\d+\.?\d*$/.test(value)) {
      jsonObject[key] = parseFloat(value);
    }
  }
  
  jsonObject.includeCategories = includeCategories;
  jsonObject.excludeCategories = excludeCategories;
  
  const jsonString = JSON.stringify(jsonObject);
  

  const url = 'https://triptop.azurewebsites.net/trip/create'; // replace with your server URL
  displayLoadingForm(form);

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: jsonString
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Network response was not ok.');
  })
  .then(data => {
    window.location.href = `trip-page.html?data=${JSON.stringify(data)}`;
  })
  .catch(error => {
    window.location.href = "error-page.html";
    console.error(error);
  })
});

const cities = [
  "Bangkok, Thailand",
  "Paris, France",
  "London, UK",
  "Dubai, UAE",
  "Singapore",
  "Kuala Lumpur, Malaysia",
  "New York City, USA",
  "Istanbul, Turkey",
  "Tokyo, Japan",
  "Antalya, Turkey",
  "Seoul, South Korea",
  "Phuket, Thailand",
  "Mecca, Saudi Arabia",
  "Hong Kong SAR",
  "Milan, Italy",
  "Palma de Mallorca, Spain",
  "Barcelona, Spain",
  "Pattaya, Thailand",
  "Osaka, Japan",
  "Bali, Indonesia",
  "Taipei, Taiwan",
  "Vienna, Austria",
  "Rome, Italy",
  "Prague, Czech Republic",
  "Guangzhou, China",
  "Madrid, Spain",
  "Shanghai, China",
  "Amsterdam, Netherlands",
  "Las Vegas, USA",
  "Riyadh, Saudi Arabia",
  "Cancun, Mexico",
  "Miami, USA",
  "Venice, Italy",
  "Phnom Penh, Cambodia",
  "Berlin, Germany",
  "Warsaw, Poland",
  "Chennai, India",
  "Delhi, India",
  "Mumbai, India",
  "Ho Chi Minh City, Vietnam",
  "Shenzhen, China",
  "Dublin, Ireland",
  "Budapest, Hungary",
  "Edinburgh, UK",
  "Munich, Germany",
  "Athens, Greece",
  "Guangdong, China",
  "Doha, Qatar",
  "Chiang Mai, Thailand",
  "Florence, Italy",
  "Los Angeles, USA",
  "Sydney, Australia",
  "Marrakech, Morocco",
  "San Francisco, USA",
  "Helsinki, Finland",
  "Zurich, Switzerland",
  "Hanoi, Vietnam",
  "Nice, France",
  "Brussels, Belgium",
  "Lisbon, Portugal",
  "St. Petersburg, Russia",
  "Macau SAR",
  "Bucharest, Romania",
  "Riyadh, Saudi Arabia",
  "Muscat, Oman",
  "Copenhagen, Denmark",
  "Kiev, Ukraine",
  "Abu Dhabi, UAE",
  "Stockholm, Sweden",
  "Cape Town, South Africa",
  "Toronto, Canada",
  "Osaka, Japan",
  "Washington DC, USA",
  "Seattle, USA",
  "Santiago, Chile",
  "Krakow, Poland",
  "Salvador, Brazil",
  "Nairobi, Kenya",
  "Santiago de Compostela, Spain",
  "Lima, Peru",
  "Marseille, France",
  "Quebec City, Canada",
  "Bucharest, Romania",
  "Sofia, Bulgaria",
  "Innsbruck, Austria",
  "Reykjavik, Iceland",
  "Tallinn, Estonia",
  "Riga, Latvia",
  "Dubrovnik, Croatia",
  "Vilnius, Lithuania",
  "Split, Croatia",
  "Bergen, Norway",
  "Lucerne, Switzerland",
  "Ljubljana, Slovenia",
  "Bruges, Belgium",
  "Zagreb, Croatia",
  "Gdansk, Poland",
  "Tel-Aviv, Israel",
  "Lviv, Ukraine",
  "Gothenburg, Sweden" ];

  cities.sort();

  const dropdown = document.getElementById("destination");

  for (let i = 0; i < cities.length; i++) {
    const option = document.createElement("option");
    option.value = cities[i];
    option.text = cities[i];
    dropdown.appendChild(option);
  }