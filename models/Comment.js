// Import Sequelize Model and DataTypes
const { Model, DataTypes } = require('sequelize');

// Import the connection instance from the configuration file
const sequelize = require('../config/connection');

// Define the Comment class which extends Sequelize Model
class Comment extends Model {}

// Initialize the Comment model with attributes and options
Comment.init(
  {
    // Define the attributes of the Comment model
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    comment_text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1] // Ensure the length of the comment_text is at least 1 character
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user', // References the User model
        key: 'id' // References the id attribute of the User model
      }
    },
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'post', // References the Post model
        key: 'id' // References the id attribute of the Post model
      }
    }
  },
  {
    // Define options for the model
    sequelize, // Pass the sequelize connection instance
    freezeTableName: true, // Prevent Sequelize from pluralizing the table name
    underscored: true, // Use underscores instead of camelCase for automatically-added timestamps
    modelName: 'comment' // Set the model name
  }
);

// Export the Comment model for use in other modules
module.exports = Comment;
