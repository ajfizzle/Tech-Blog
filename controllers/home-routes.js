// Import required modules
const router = require('express').Router();
const { Post, User, Comment } = require('../models');

// Route to get all posts for the homepage
router.get('/', (req, res) => {
  // Find all posts with associated comments and users
  Post.findAll({
    attributes: ['id', 'post_text', 'title', 'created_at'],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        order: [['created_at', 'DESC']], // Order posts by creation date descending
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
      // Serialize data
      const posts = dbPostData.map(post => post.get({ plain: true }));

      // Render homepage with posts data
      res.render('homepage', {
        posts,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      // Handle errors
      console.log(err);
      res.status(500).json(err);
    });
});

// Route to get a single post
router.get('/post/:id', (req, res) => {
  // Find a post by id with associated comments and users
  Post.findOne({
    where: {
      id: req.params.id
    },
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
    .then(dbPostData => {
      // If post not found, return 404 status
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }

      // Serialize data
      const post = dbPostData.get({ plain: true });

      // Render single post page with post data
      res.render('single-post', {
        post,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      // Handle errors
      console.log(err);
      res.status(500).json(err);
    });
});

// Route to render login page
router.get('/login', (req, res) => {
  // If user is already logged in, redirect to homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  // Render login page
  res.render('login');
});

// Route to render signup page
router.get('/signup', (req, res) => {
  // If user is already logged in, redirect to homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  // Render signup page
  res.render('signup');
});

// Export router for use in other modules
module.exports = router;
