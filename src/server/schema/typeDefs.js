const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Tweet {
    id: ID!
    text: String!
    createdAt: String!
    author: User!
    promoted: Boolean
  }

  type User {
    id: ID!
    username: String!
    displayName: String!
    bio: String
    tweets: [Tweet]
    location: Location
  }

  enum Location {
    EU
    US
    ASIA
  }

  # Queries
  type Query {
    tweets: [Tweet!]!
    tweetsByUser(id: ID!): [Tweet!]!
    tweet(id: ID!): Tweet
    users: [User!]!
    user(id: ID!): User
    login(username: String!): User
  }

  # Inputs
  # Can have a default value with = after
  input CreateUserInput {
    username: String!
    displayName: String!
    location: Location = US
    bio: String = ""
  }

  # Mutations
  type Mutation {
    createTweet(text: String!, authorId: ID!): Tweet!
    createUser(input: CreateUserInput!): User!
  }
`;

module.exports = { typeDefs };
