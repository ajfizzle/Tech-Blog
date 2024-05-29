// This function handles form submission for creating a new post
async function newFormHandler(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the values entered by the user from the form fields
  const title = document.querySelector('input[name="post-title"]').value;
  const post_text = document.querySelector('textarea[name="post_text"]').value;

  // Send a POST request to the server to create a new post
  const response = await fetch(`/api/posts`, {
      method: 'POST',
      // Convert post data to JSON format and send it in the request body
      body: JSON.stringify({
          title,
          post_text
      }),
      // Specify that the content type of the request is JSON
      headers: {
          'Content-Type': 'application/json'
      }
  });

  // Check if the request was successful (status code 200-299)
  if (response.ok) {
      // Redirect the user to the dashboard page upon successful post creation
      document.location.replace('/dashboard');
  } else {
      // Display an error message if something went wrong with the request
      alert(response.statusText);
  }
}

// Add an event listener to the new post form, so the newFormHandler function is called when the form is submitted
document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);
