const { db } = require('../db');

// TODO use lodash
const session = {
  login(username) {
    const user = db
      .getData('/users')
      .find((user) => user.username === `@${username}`);
    if (user) return user;
    throw new Error('User not found');
  },
};

module.exports = { session };
