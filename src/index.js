const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { json } = require('body-parser');
const typeDefs = require('./graphql/schemas');
const resolvers = require('./graphql/resolvers');
require('dotenv').config();
const { sequelize } = require('./models');

const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        const token = req.headers.authorization || '';
        const user = getUser(token.replace('Bearer ', ''));
        return { user };
      },
});

async function startServer() {
    await server.start();
    app.use('/graphql', json(), expressMiddleware(server));

    app.listen(process.env.PORT, () => {
        console.log(`server launch on port ${process.env.PORT}`);
    });
}

startServer();
