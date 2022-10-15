const { createServer } = require('@graphql-yoga/node');
const fs = require('fs');
const db = require('../models');

const { Query, Mutation, User } = require('./resolvers/resolver');



const server =
    createServer({
        schema: {
            typeDefs: fs.readFileSync('./src/schema.graphql', { encoding: "utf8" }),
            resolvers: {
                Query,
                Mutation,
                User
            }
        },
        context(request) {
            return {
                db,
                request
            }
        }
    })

server.start(() => {
    console.log("the server is up")
});
