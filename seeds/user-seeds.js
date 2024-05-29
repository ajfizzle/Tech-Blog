const { User } = require('../models');

const userdata = [
  {
    id: 3,
    username: 'User3',
    email: 'user3@example.com',
    password: 'password3'
  },
  {
    id: 5,
    username: 'User5',
    email: 'user5@example.com',
    password: 'password5'
  },
  {
    id: 8,
    username: 'User8',
    email: 'user8@example.com',
    password: 'password8'
  }
];

const seedUsers = () => User.bulkCreate(userdata, { individualHooks: true });

module.exports = seedUsers;
