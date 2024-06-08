

const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { json } = require('body-parser');
const typeDefs = require('./graphql/schemas');
const resolvers = require('./graphql/resolvers');
require('dotenv').config();
const { sequelize } = require('./models');
// const getUser = require('./utils/getUser');
const cors = require('cors');
const path = require('path');

const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        const token = req.headers.authorization || '';
        console.log('Authorization Header:', token);
        const user = getUser(token.replace('Bearer ', ''));
        console.log('Decoded User:', user);
        return { user };
    },
});

async function startServer() {
    await server.start();

    // Configuration CORS
    const corsOptions = {
        origin: process.env.FRONTEND_URL, 
        credentials: true, 
    };
     app.use('/images', express.static(path.join(__dirname, 'images')));
    // app.use(express.static(`${__dirname}/images`));
    app.use(cors(corsOptions)); 
    app.use('/graphql', json(), expressMiddleware(server));
    
    app.listen(process.env.PORT, () => {
        console.log(`Server launched on port ${process.env.PORT}`);
    });
}

startServer();
