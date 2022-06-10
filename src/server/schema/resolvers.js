const { tweet } = require('../daos/tweet');
const { user } = require('../daos/user');
const { session } = require('../daos/session');

const resolvers = {
  Query: {
    // Tweet
    tweets: () => tweet.getTweets(),
    tweetsByUser: (parent, { id }) => tweet.getTweetsByUser(id),
    tweet: (parent, { id }) => tweet.getTweet(id),

    // User
    users: () => user.getUsers(),
    user: (parent, { id }) => user.getUser(id),

    // Session
    login: (parent, { username }) => session.login(username),
  },

  Mutation: {
    createTweet: (parent, { text, authorId }) => tweet.addTweet(text, authorId),
    createUser: (parent, { input }) =>
      user.createUser(
        input.username,
        input.displayName,
        input.location,
        input.bio
      ),
  },
};

module.exports = { resolvers };
