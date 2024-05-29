// Import necessary modules and dependencies
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// Define the User model class
class User extends Model {
  // Method to check if the provided password matches the hashed password stored in the database
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// Define fields/columns for the User model
User.init(
  {
    // Define user ID column
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    // Define username column
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // Define email column
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true // Validate email format
      }
    },
    // Define password column
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4] // Validate minimum password length
      }
    }
  },
  {
    // Define hooks to hash the password before user creation and update
    hooks: {
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10); // Hash password before creating user
        return newUserData;
      },
      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10); // Hash password before updating user
        return updatedUserData;
      }
    },
    // Define sequelize connection and model configurations
    sequelize,
    timestamps: false, // Disable timestamps
    freezeTableName: true, // Freeze table name to model name
    underscored: true, // Use underscored naming for fields
    modelName: 'user' // Model name
  }
);

// Export User model
module.exports = User;
