const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Route to get all comments
router.get('/', (req, res) => {
  Comment.findAll()
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.error('Error fetching comments:', err);
      res.status(500).json({ error: 'An error occurred while fetching comments' });
    });
});

// Route to create a new comment, requires authentication
router.post('/', withAuth, (req, res) => {
  // expects => {comment_text: "This is the comment", user_id: 1, post_id: 2}
  Comment.create({
    comment_text: req.body.comment_text,
    user_id: req.session.user_id,
    post_id: req.body.post_id
  })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
      console.error('Error creating comment:', err);
      res.status(400).json({ error: 'An error occurred while creating the comment' });
    });
});

// Route to delete a comment by ID, requires authentication
router.delete('/:id', withAuth, (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbCommentData => {
      if (!dbCommentData) {
        res.status(404).json({ message: 'No comment found with this ID' });
        return;
      }
      res.json({ message: 'Comment deleted successfully' });
    })
    .catch(err => {
      console.error('Error deleting comment:', err);
      res.status(500).json({ error: 'An error occurred while deleting the comment' });
    });
});

// Route to update a comment by ID, requires authentication
router.put('/:id', withAuth, (req, res) => {
  // expects => {comment_text: "Updated comment text"}
  Comment.update(
    { comment_text: req.body.comment_text },
    {
      where: {
        id: req.params.id,
        user_id: req.session.user_id  // Ensure the user can only update their own comments
      }
    }
  )
    .then(dbCommentData => {
      if (!dbCommentData[0]) { // dbCommentData returns an array with one element, the number of affected rows
        res.status(404).json({ message: 'No comment found with this ID for the current user' });
        return;
      }
      res.json({ message: 'Comment updated successfully' });
    })
    .catch(err => {
      console.error('Error updating comment:', err);
      res.status(500).json({ error: 'An error occurred while updating the comment' });
    });
});

module.exports = router;
