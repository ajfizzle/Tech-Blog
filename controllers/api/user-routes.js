const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// Route to get all users
router.get('/', (req, res) => {
  User.findAll({
    attributes: { exclude: ['password'] }
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.error('Error fetching users:', err);
      res.status(500).json({ error: 'An error occurred while fetching users' });
    });
});

// Route to get a single user by ID
router.get('/:id', (req, res) => {
  User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Post,
        attributes: ['id', 'title', 'post_text', 'created_at'],
        order: [['created_at', 'DESC']], // Order posts by creation date descending
      },
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'created_at'],
        include: {
          model: Post,
          attributes: ['title']
        }
      }
    ]
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this ID' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.error('Error fetching user:', err);
      res.status(500).json({ error: 'An error occurred while fetching the user' });
    });
});

// Route to create a new user
router.post('/', (req, res) => {
  // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
    .then(dbUserData => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
  
        res.json(dbUserData);
      });
    })
    .catch(err => {
      console.error('Error creating user:', err);
      res.status(500).json({ error: 'An error occurred while creating the user' });
    });
});

// Route to log in an existing user
router.post('/login', (req, res) => {
  // expects {email: 'lernantino@gmail.com', password: 'password1234'}
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(dbUserData => {
    if (!dbUserData) {
      res.status(400).json({ message: 'No user found with that email address' });
      return;
    }

    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;
  
      res.json({ user: dbUserData, message: 'You are now logged in!' });
    });
  }).catch(err => {
    console.error('Error logging in:', err);
    res.status(500).json({ error: 'An error occurred while logging in' });
  });
});

// Route to log out the current user
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).json({ message: 'No user is logged in' });
  }
});

// Route to update an existing user by ID
router.put('/:id', (req, res) => {
  // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}

  // Pass in req.body instead to only update what's passed through
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData[0]) {
        res.status(404).json({ message: 'No user found with this ID' });
        return;
      }
      res.json({ message: 'User updated successfully' });
    })
    .catch(err => {
      console.error('Error updating user:', err);
      res.status(500).json({ error: 'An error occurred while updating the user' });
    });
});

// Route to delete a user by ID
router.delete('/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this ID' });
        return;
      }
      res.json({ message: 'User deleted successfully' });
    })
    .catch(err => {
      console.error('Error deleting user:', err);
      res.status(500).json({ error: 'An error occurred while deleting the user' });
    });
});

module.exports = router;
