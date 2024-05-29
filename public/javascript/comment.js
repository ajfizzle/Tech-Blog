// This function handles form submission for posting a comment
async function commentFormHandler(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the comment text entered by the user from the form field
  const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();

  // Extract the post ID from the current URL
  const post_id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];

  // Check if the comment text is provided
  if (comment_text) {
      // Send a POST request to the server to add a comment
      const response = await fetch('/api/comments', {
          method: 'POST',
          // Convert comment data to JSON format and send it in the request body
          body: JSON.stringify({
              post_id,
              comment_text
          }),
          // Specify that the content type of the request is JSON
          headers: {
              'Content-Type': 'application/json'
          }
      });

      // Check if the request was successful (status code 200-299)
      if (response.ok) {
          // Reload the page to display the newly added comment
          document.location.reload();
      } else {
          // Display an error message if something went wrong with the request
          alert(response.statusText);
      }
  }
}

// Add an event listener to the comment form, so the commentFormHandler function is called when the form is submitted
document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);
