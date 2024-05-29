// This function handles form submission for user login
async function loginFormHandler(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the email and password entered by the user from the form fields
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  // Check if both email and password are provided
  if (email && password) {
      // Send a POST request to the server to log in the user
      const response = await fetch('/api/users/login', {
          method: 'post',
          // Convert user login data to JSON format and send it in the request body
          body: JSON.stringify({
              email,
              password
          }),
          // Specify that the content type of the request is JSON
          headers: { 'Content-Type': 'application/json' }
      });

      // Check if the login request was successful (status code 200-299)
      if (response.ok) {
          // Redirect the user to the dashboard page upon successful login
          document.location.replace('/dashboard/');
      } else {
          // Display an error message if something went wrong with the login request
          alert(response.statusText);
      }
  }
}

// Add an event listener to the login form, so the loginFormHandler function is called when the form is submitted
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
