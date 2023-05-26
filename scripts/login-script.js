
const loginForm = document.querySelector('form');
const errorMessage = document.querySelector('#error-message');


loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  if(email == 'admin@triptop.com' && password == 123) {
    sessionStorage.setItem('loggedIn', 'yes');
    window.location.href = 'search.html';
  }
  else {
    errorMessage.style.display = 'block';
  }
});


