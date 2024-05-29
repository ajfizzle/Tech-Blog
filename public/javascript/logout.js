// This function handles the logout process
async function logout() {
  // Send a POST request to the server to log the user out
  const response = await fetch('/api/users/logout', {
      method: 'post',
      // Specify that the content type of the request is JSON
      headers: { 'Content-Type': 'application/json' }
  });

  // Check if the request was successful (status code 200-299)
  if (response.ok) {
      // Redirect the user to the home page upon successful logout
      document.location.replace('/');
  } else {
      // Display an error message if something went wrong with the request
      alert(response.statusText);
  }
}

// Add an event listener to the logout button, so the logout function is called when the button is clicked
document.querySelector('#logout').addEventListener('click', logout);
