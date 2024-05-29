// This function handles form submission for deleting a post
async function deleteFormHandler(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Extract the post ID from the current URL
  const id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];

  // Send a DELETE request to the server to delete the post
  const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE'
  });

  // Check if the request was successful (status code 200-299)
  if (response.ok) {
      // Redirect the user to the dashboard page upon successful post deletion
      document.location.replace('/dashboard/');
  } else {
      // Display an error message if something went wrong with the request
      alert(response.statusText);
  }
}

// Add an event listener to the delete post button, so the deleteFormHandler function is called when the button is clicked
document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);
