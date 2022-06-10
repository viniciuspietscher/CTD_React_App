const { ApolloServer } = require('apollo-server-express');
const { typeDefs } = require('./schema/typeDefs');
const { resolvers } = require('./schema/resolvers');
const express = require('express');

async function startApolloServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  const app = express();
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  app.listen({ port: 3000 }, () => {
    console.log(`Server is listening on port:3000${server.graphqlPath}`);
  });
}
startApolloServer();
