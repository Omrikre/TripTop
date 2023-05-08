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

  var startDate = new Date(document.getElementById('startDate').value);
  var endDate = new Date(document.getElementById('endDate').value);

  // Calculate the difference in days
  var timeDiff = endDate.getTime() - startDate.getTime();
  var diffDays = timeDiff / (1000 * 3600 * 24);

  // If the difference is greater than 5, display an error message
   if (diffDays > 5) {
    alert('Error: Maximum trip length is 5 days.');
    event.preventDefault();
    const prevDest = document.getElementById('destination').value;
    const prevStartDate = document.getElementById('startDate').value;
    const prevEndDate = document.getElementById('endDate').value;
    const prevNumAttractions = document.getElementById('NumberOfAttractionsPerDay').value;
    const prevIncludeCategories = Array.from(document.getElementById('includeCategories').selectedOptions).map(option => option.value);
    const prevExcludeCategories = Array.from(document.getElementById('excludeCategories').selectedOptions).map(option => option.value);
    const prevBudget = document.getElementById('budget').value;
    document.getElementById('destination').value = prevDest;
    document.getElementById('startDate').value = prevStartDate;
    document.getElementById('endDate').value = prevEndDate;
    document.getElementById('NumberOfAttractionsPerDay').value = prevNumAttractions;
    Array.from(document.getElementById('includeCategories').options).forEach(option => {
      option.selected = prevIncludeCategories.includes(option.value);
    });
    Array.from(document.getElementById('excludeCategories').options).forEach(option => {
      option.selected = prevExcludeCategories.includes(option.value);
    });
    document.getElementById('budget').value = prevBudget;
    return;
  }
  event.preventDefault();
  
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