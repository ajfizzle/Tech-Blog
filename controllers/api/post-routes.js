// Import necessary modules and dependencies
const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Route to retrieve all posts with associated comments and users
router.get('/', (req, res) => {
  console.log('Fetching all posts...');
  // Retrieve all posts from the database along with their associated comments and users
  Post.findAll({
    attributes: ['id', 'post_text', 'title', 'created_at'],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Route to retrieve a single post by its ID with associated comments and user
router.get('/:id', (req, res) => {
  // Retrieve a post by its ID from the database along with its associated comments and user
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'post_text', 'title', 'created_at'],
    order: [['created_at', 'DESC']], // Order posts by creation date descending
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      // If no post found with the provided ID, return a 404 error
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this ID' });
        return;
      }
      // Otherwise, return the retrieved post data
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Route to create a new post
router.post('/', withAuth, (req, res) => {
  // Create a new post in the database using the provided request body
  Post.create({
    title: req.body.title,
    post_text: req.body.post_text,
    user_id: req.session.user_id
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Route to update an existing post by its ID
router.put('/:id', withAuth, (req, res) => {
  // Update an existing post in the database using the provided request body and post ID
  Post.update(
    {
      title: req.body.title,
      post_text: req.body.post_text
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbPostData => {
      // If no post found with the provided ID, return a 404 error
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this ID' });
        return;
      }
      // Otherwise, return the updated post data
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Route to delete an existing post by its ID
router.delete('/:id', withAuth, (req, res) => {
  console.log('Deleting post with ID', req.params.id);
  // Delete an existing post from the database using the provided post ID
  Post.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbPostData => {
      // If no post found with the provided ID, return a 404 error
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this ID' });
        return;
      }
      // Otherwise, return the deleted post data
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Export router for use in other modules
module.exports = router;
