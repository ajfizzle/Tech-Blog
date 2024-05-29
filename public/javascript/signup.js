// This function handles form submission for user sign up
async function signupFormHandler(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get values entered by the user from the form fields
  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  // Check if all required fields are filled out
  if (username && email && password) {
      // Send a POST request to the server to create a new user
      const response = await fetch('/api/users', {
          method: 'post',
          // Convert user data to JSON format and send it in the request body
          body: JSON.stringify({
              username,
              email,
              password
          }),
          // Specify that the content type of the request is JSON
          headers: { 'Content-Type': 'application/json' }
      });

      // Check if the request was successful (status code 200-299)
      if (response.ok) {
          // Redirect the user to the dashboard page upon successful signup
          document.location.replace('/dashboard/');
      } else {
          // Display an error message if something went wrong with the request
          alert(response.statusText);
      }
  }
}

// Add an event listener to the sign-up form, so the signupFormHandler function is called when the form is submitted
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
