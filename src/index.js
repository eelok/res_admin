const { createServer } = require('@graphql-yoga/node');
const { v4: uuidv4 } = require('uuid');

const {User} = require('../models');
const typeDefs = `
    type Query {
        greeting(name: String): String!
        user: User!
    }

    type Mutation {
        createUser(firstName: String!, lastName: String!): User!
    }

    type User {
        id: ID!
        firstName: String!
        lastName: String!
    }
`
const resolvers = {
    Query: {
        user() {
            return {
                id: "123",
                firstName: "Mariia",
                lastName: "Petretckaia"
            }
        },
        greeting(parent, args, ctx, info){
            console.log(args);
            return `Hello ${args.name}`;
        }
    },
    Mutation: {
        async createUser(parent, args, ctx, info){
            const {firstName, lastName} = args;
            const id = uuidv4();
            console.log(id);
            try{
                const newUser = await User.create({id: id, firstName: firstName, lastName: lastName})
                return;
            } catch(err){
                console.log(err)
            }
        }
    }
}

const server = createServer({
    schema: {
      typeDefs,
      resolvers
    },
  })
  
server.start(() => {
    console.log("the server is up")
});
