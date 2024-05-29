// Require necessary modules and models
const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Route to get all posts for the dashboard, requires authentication
router.get('/', withAuth, (req, res) => {
  // Find all posts associated with the logged-in user
  Post.findAll({
    where: {
      user_id: req.session.user_id // Filter posts by user ID from session
    },
    attributes: [ // Specify attributes to retrieve from the Post model
      'id',
      'post_text',
      'title',
      'created_at'
    ],
    include: [ // Include associated models for additional data
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        order: [['created_at', 'DESC']], // Order posts by creation date descending
        include: { // Include associated User model for comment's author
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
      // Serialize data and render dashboard template with posts
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render('dashboard', { posts, loggedIn: true });
    })
    .catch(err => {
      // Handle any errors and return a 500 status with JSON error object
      console.log(err);
      res.status(500).json(err);
    });
});

// Route to render the edit post page for a specific post, requires authentication
router.get('/edit/:id', withAuth, (req, res) => {
  // Find a specific post by its primary key (ID)
  Post.findByPk(req.params.id, {
    attributes: [
      'id',
      'post_text',
      'title',
      'created_at'
    ],
    include: [ // Include associated models for additional data
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        order: [['created_at', 'DESC']], // Order posts by creation date descending
        include: { // Include associated User model for comment's author
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
      if (dbPostData) { // If post exists, render edit-post template with post data
        const post = dbPostData.get({ plain: true });
        res.render('edit-post', {
          post,
          loggedIn: true
        });
      } else { // If post does not exist, return a 404 status
        res.status(404).end();
      }
    })
    .catch(err => {
      // Handle any errors and return a 500 status with JSON error object
      res.status(500).json(err);
    });
});

// Route to render the new post page
router.get('/new-post', (req, res) => {
  // Render new-post template with authentication status
  res.render('new-post', {
    loggedIn: true
  });
});

// Export router for use in other parts of the application
module.exports = router;
