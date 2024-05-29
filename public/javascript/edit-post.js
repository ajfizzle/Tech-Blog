// This function handles form submission for editing a post
async function editFormHandler(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the values entered by the user from the form fields
  const title = document.querySelector('input[name="post-title"]').value;
  const post_text = document.querySelector('textarea[name="post_text"]').value.trim();

  // Extract the post ID from the current URL
  const id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];

  // Send a PUT request to the server to update the post
  const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
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
      // Redirect the user to the dashboard page upon successful post edit
      document.location.replace('/dashboard/');
  } else {
      // Display an error message if something went wrong with the request
      alert(response.statusText);
  }
}

// Add an event listener to the edit post form, so the editFormHandler function is called when the form is submitted
document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);
