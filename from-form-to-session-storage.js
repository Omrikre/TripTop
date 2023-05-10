
const destinationField = document.getElementById('destination');
const startDateField = document.getElementById('startDate');
const endDateField = document.getElementById('endDate');
const numberOfAttractionsField = document.getElementById('NumberOfAttractionsPerDay');
const includeCategoriesField = document.getElementById('includeCategories');
const excludeCategoriesField = document.getElementById('excludeCategories');

// Add event listeners to the input fields
destinationField.addEventListener('input', () => {
    sessionStorage.setItem('destination', destinationField.value);
});

startDateField.addEventListener('input', () => {
    sessionStorage.setItem('startDate', startDateField.value);
});

endDateField.addEventListener('input', () => {
    sessionStorage.setItem('endDate', endDateField.value);
});

numberOfAttractionsField.addEventListener('input', () => {
    sessionStorage.setItem('numberOfAttractions', numberOfAttractionsField.value);
});

// Wait until the page is loaded
document.addEventListener('DOMContentLoaded', function() {
    // When the page loads, set the value of the select element from session storage
    if (sessionStorage.getItem('destination')) {
      const destinationSelect = document.querySelector('#destination');
      destinationSelect.value = sessionStorage.getItem('destination');
    }
  });
  
  
if (sessionStorage.getItem('startDate')) {
    startDateField.value = sessionStorage.getItem('startDate');
}

if (sessionStorage.getItem('endDate')) {
    endDateField.value = sessionStorage.getItem('endDate');
}

if (sessionStorage.getItem('numberOfAttractions')) {
    numberOfAttractionsField.value = sessionStorage.getItem('numberOfAttractions');
}