// utils/auth.js
const withAuth = (req, res, next) => {
    // Check if the user is logged in
    if (!req.session.loggedIn) {
      res.redirect('/login'); // Redirect to login if not logged in
    } else {
      next(); // Continue to the next middleware if user is logged in
    }
  };
  
  module.exports = withAuth;
  