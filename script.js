const form = document.querySelector('form');


form.addEventListener('submit', (event) => {
  event.preventDefault();

  const destination = document.querySelector('#destination').value;
  const startDate = document.querySelector('#start-date').value;
  const returnDate = document.querySelector('#return-date').value;
  const numberOfTravelers = document.querySelector('#travelers-number').value;


  window.location.href = 'loading-page.html';
});


