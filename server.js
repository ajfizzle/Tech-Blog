// Require necessary modules and dependencies
const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers"); // Import routes from controllers
const helpers = require("./utils/helpers"); // Import helper functions

const sequelize = require("./config/connection"); // Import Sequelize connection
const SequelizeStore = require("connect-session-sequelize")(session.Store); // Sequelize session store

// Create express application
const app = express();
const PORT = process.env.PORT || 3001; // Define port for server

// Configure handlebars template engine
const hbs = exphbs.create({ helpers }); // Pass helper functions to handlebars

// Configure session middleware
const sess = {
  secret: "Omni-Directional-Robot", // Secret key for session
  cookie: {
    maxAge: 1 * 24 * 60 * 60 * 1000, // Cookie expiration time (1 day)
  },
  resave: false, // Prevent session data from being re-saved if not modified
  saveUninitialized: true, // Save uninitialized sessions
  store: new SequelizeStore({
    // Store session data in Sequelize
    db: sequelize, // Use Sequelize connection for session store
  }),
};

// Use session middleware with express app
app.use(session(sess));

// Configure handlebars as the view engine
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Parse request body as JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Use routes defined in controllers
app.use(routes);

// Sync Sequelize models with the database, then start the server
sequelize.sync({ force: false }).then(() => {
  // Sync models and start server
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`); // Log server start message
  });
});
