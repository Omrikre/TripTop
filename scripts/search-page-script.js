// Get the current date
const tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];

// Set the minimum date for the start date input
document.getElementById('startDate').setAttribute('min', tomorrow);

// Set the minimum date for the end date input to be the same as the start date input
document.getElementById('endDate').setAttribute('min', tomorrow);

const startDateInput = document.getElementById('startDate');
  
// Get the end date input element
const endDateInput = document.getElementById('endDate');

// Add an event listener to the start date input
startDateInput.addEventListener('change', function() {
  // Set the minimum value of the end date input to the selected start date
  endDateInput.min = startDateInput.value;
  
  // If the current end date is less than the selected start date, reset the end date value
  if (endDateInput.value < startDateInput.value) {
    endDateInput.value = startDateInput.value;
  }
});

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
      <br>
      <button onclick="event.preventDefault();" id="joke-button" class="btn"  style="color:blue;">Click to read our daily joke</button>
      <div id="joke-container" style="display: none;">
        <p style="text-align: center; color: blue; font-size: large;" id="joke">${joke}</p>
      </div>
      <button onclick="event.preventDefault();" id="game-button" class="btn" style="color:blue;margin-top:1%">Click to play a game while waiting for your trip</button>
      <br>
      <div id="game-display" class="game" style="display: none;">
        <h1 class="welcome-title" style="font-size:xx-large">While we work on planning your trip, take some time to play a game!</h1>
        <h3 style="text-align:center;">Find matching pairs of cards by flipping them over two at a time.</h3>
        <div class="cards-grid"></div>
      </div>
    </div>
  </form>
    <style>
    #game-button:hover,#joke-button:hover  {
      background-color: white;
    }
  </style>
`;

  const jokeButton = document.getElementById("joke-button");
  const jokeContainer = document.getElementById("joke-container");

  jokeButton.addEventListener("click", () => {
    if (jokeContainer.style.display === "none") {
      jokeContainer.style.display = "block";
    } else {
      jokeContainer.style.display = "none";
    }
  });

  const gameButton = document.getElementById("game-button");
  const gameDisplay = document.getElementById("game-display");

  gameButton.addEventListener("click", () => {
    if (gameDisplay.style.display === "none") {
      gameDisplay.style.display = "block";
    } else {
      gameDisplay.style.display = "none";
    }
  });



  const cardsGrid = document.querySelector(".cards-grid");
  const cards = ["A", "B", "C", "D", "E", "F", "G", "H", "A", "B", "C", "D", "E", "F", "G", "H"];
  let firstCard = null;
  let secondCard = null;
  let canClick = true;

  // Shuffle the cards array
  cards.sort(() => Math.random() - 0.5);

  // Create and add the cards to the grid
  cards.forEach((card) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.dataset.card = card;
    div.textContent = "?";
    div.addEventListener("click", handleCardClick);
    cardsGrid.appendChild(div);
  });

  function handleCardClick() {
    if (this === firstCard || !canClick) {
      return;
    }

    this.textContent = this.dataset.card;

    if (!firstCard) {
      firstCard = this;
      return;
    }

    secondCard = this;
    canClick = false;

    if (firstCard.dataset.card === secondCard.dataset.card) {
      firstCard.removeEventListener("click", handleCardClick);
      secondCard.removeEventListener("click", handleCardClick);
      firstCard = null;
      secondCard = null;
      canClick = true;
    } else {
      setTimeout(() => {
        firstCard.textContent = "?";
        secondCard.textContent = "?";
        firstCard = null;
        secondCard = null;
        canClick = true;
      }, 1000);
    }
  }
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
   if (diffDays >= 5) {
    diffDays += 1;
    alert('Error: Maximum trip length is 5 days. current trip length: ' + diffDays);
    throw new Error('Error: Maximum trip length is 5 days.');
  }

  if (endDate < startDate) {
    alert('Error: End date must be the same day or after start date.');
    throw new Error('Error: End date must be the same day or after start date.');
  }
  
  const formData = new FormData(form);
  const budgetSelect = document.getElementById("budget");
  let budgetValue = "";

  switch (budgetSelect.value) {
    case "$0-$50":
      budgetValue = "low";
      break;
    case "$50-$150":
      budgetValue = "medium";
      break;
    case "$150 and above":
      budgetValue = "high";
      break;
  }

formData.set("budget", budgetValue);

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
    body: jsonString
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Network response was not ok.');
  })
  .then(data => {
    sessionStorage.setItem('tripDataFromSessionStorage', JSON.stringify(data));
    window.location.href = "trip-page.html";
  })
  .catch(error => {
    window.location.href = "error-page.html";
    console.error(error);
  })

});

const cities = [
  "Frankfurt, Germany",
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
  "Muscat, Oman",
  "Copenhagen, Denmark",
  "Kiev, Ukraine",
  "Abu Dhabi, UAE",
  "Stockholm, Sweden",
  "Cape Town, South Africa",
  "Toronto, Canada",
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