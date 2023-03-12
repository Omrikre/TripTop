const form = document.querySelector('form');
const results = document.querySelector('#results');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const destination = document.querySelector('#destination').value;
  const startDate = document.querySelector('#start-date').value;
  const returnDate = document.querySelector('#return-date').value;
  const numberOfTravelers = document.querySelector('#travelers-number').value;

  results.innerHTML = `<h2>Your Trip to ${destination}</h2
  <p>starts on ${startDate} and ends on ${returnDate}</p>
  <p>The number of travelers is ${numberOfTravelers}</p>`;

  results.style.display = 'block';
});


