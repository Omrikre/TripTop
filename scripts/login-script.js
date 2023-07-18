const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Retrieve user data from local storage
  const storedEmail = localStorage.getItem("email");
  const storedPassword = localStorage.getItem("password");

  if (email === storedEmail && password === storedPassword) {
    // Successful login, perform necessary actions
    // For example, you can redirect the user to the main page:
    sessionStorage.setItem('loggedIn', 'yes');
    window.location.href = "search.html";
  } else {
    // Invalid email or password, display error message
    const errorMessage = document.getElementById("error-message");
    errorMessage.style.display = "block";
  }
});