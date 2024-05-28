const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userdata = [
    {
        username: "user1",
        email: "user1@example.com",
        password: "password1",
      },
      {
        username: "user2",
        email: "user2@example.com",
        password: "password2",
      }
];

const seedUsers = () => User.bulkCreate(userdata, {individualHooks: true});

module.exports = seedUsers;
