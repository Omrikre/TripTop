
const destinationField = document.getElementById('destination');
const startDateField = document.getElementById('startDate');
const endDateField = document.getElementById('endDate');
const numberOfAttractionsField = document.getElementById('NumberOfAttractionsPerDay');
const includeCategoriesField = document.getElementById('includeCategories');
const excludeCategoriesField = document.getElementById('excludeCategories');

// Add event listeners to the input fields
destinationField.addEventListener('input', () => {
    localStorage.setItem('destination', destinationField.value);
});

startDateField.addEventListener('input', () => {
    localStorage.setItem('startDate', startDateField.value);
});

endDateField.addEventListener('input', () => {
    localStorage.setItem('endDate', endDateField.value);
});

numberOfAttractionsField.addEventListener('input', () => {
    localStorage.setItem('numberOfAttractions', numberOfAttractionsField.value);
});

// includeCategoriesField.addEventListener('change', () => {
//     const selectedOptions = Array.from(includeCategoriesField.selectedOptions).map(option => option.value);
//     localStorage.setItem('includeCategories', JSON.stringify(selectedOptions));
//  });
  

//   excludeCategoriesField.addEventListener('change', () => {
//     const selectedOptions = Array.from(includeCategoriesField.selectedOptions).map(option => option.value);
//     localStorage.setItem('excludeCategories', JSON.stringify(selectedOptions));
//   });
  

// When the page loads, set the values of the input fields from local storage
if (localStorage.getItem('destination')) {
    destinationField.value = localStorage.getItem('destination');
}

if (localStorage.getItem('startDate')) {
    startDateField.value = localStorage.getItem('startDate');
}

if (localStorage.getItem('endDate')) {
    endDateField.value = localStorage.getItem('endDate');
}

if (localStorage.getItem('numberOfAttractions')) {
    numberOfAttractionsField.value = localStorage.getItem('numberOfAttractions');
}

// if (localStorage.getItem('includeCategories')) {
//     const selectedOptions = JSON.parse(localStorage.getItem('includeCategories'));
//     selectedOptions.forEach(optionValue => {
//       const option = includeCategoriesField.querySelector(`option[value="${optionValue}"]`);
//       if (option) {
//         option.selected = true;
//       }
//     });
//   }
  

//   if (localStorage.getItem('excludeCategories')) {
//     const selectedOptions = JSON.parse(localStorage.getItem('excludeCategories'));
//     selectedOptions.forEach(optionValue => {
//       const option = excludeCategoriesField.querySelector(`option[value="${optionValue}"]`);
//       if (option) {
//         option.selected = true;
//       }
//     });
//   }
