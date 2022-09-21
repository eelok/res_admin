const { createServer } = require('@graphql-yoga/node');
const { v4: uuidv4 } = require('uuid');
const constants = require('./constants');

const {User} = require('../models');
const typeDefs = `
    type Query {
        greeting(name: String): String!
        user: User!
    }

    type Mutation {
        createUser(firstName: String!, lastName: String!, email: String!): UserMutationSersponse!
    }

    type User {
        id: ID!
        firstName: String!
        lastName: String!
        email: String!
    }

    type UserMutationSersponse {
        code: String!
        sucess: Boolean!
        message: String
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
        }
    },
    Mutation: {
        async createUser(parent, args, ctx, info){
            const {firstName, lastName, email} = args;
            const id = uuidv4();
            console.log(id);
            try{
                const foundUser = await User.findOne({
                    where: {email}
                });
                if(!foundUser){
                    const newUser = await User.create({id: id, firstName: firstName, lastName: lastName, email});
                    return {
                        code: constants.STATUS_CODE_201,
                        sucess: true,
                        message: 'User with ${id} was created',
                    };
                } 
                return {
                        code: constants.STATUS_CODE_400,
                        sucess: false,
                        message: 'User with ${id} is already exists',
                }
                
            } catch(err){
                console.log(err);
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
