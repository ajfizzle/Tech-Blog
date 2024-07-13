// Load environment variables from .env file into process.env
require("dotenv").config();

// Import Sequelize library
const Sequelize = require("sequelize");

// Create Sequelize instance based on environment variables
const sequelize = process.env.DB_URL
  ? // If DB_URL is provided, use it directly
    new Sequelize(process.env.DB_URL)
  : // Otherwise, use DB_NAME, DB_USER, DB_PASSWORD for configuration
    new Sequelize(
      process.env.DB_NAME, // Database name
      process.env.DB_USER, // Database username
      process.env.DB_PASSWORD, // Database password
      {
        host: "localhost", // Database host
        port: 5432, // Database port
        dialect: "postgres", // Dialect (PostgreSQL in this case)
        dialectOptions: {
          decimalNumbers: true, // Support for decimal numbers
        },
      }
    );

// Export the configured Sequelize instance
module.exports = sequelize;
