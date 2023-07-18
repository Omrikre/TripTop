const signupForm = document.getElementById("signup-form");

  signupForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Save user data in local storage
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);

    // Redirect or perform any necessary actions after signing up
    // For example, you can redirect the user to a login page:
    sessionStorage.setItem('loggedIn', 'yes');
    window.location.href = 'search.html';
  });


