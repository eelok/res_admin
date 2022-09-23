const { createServer } = require('@graphql-yoga/node');
const { v4: uuidv4 } = require('uuid');
const constants = require('./constants');
const {User, Education} = require('../models');
const fs = require('fs');

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
                throw err;
            }
        },
        async createEducation(parent, args, ctx, info){
            const {start, end, shortName, longName, division, description} = args;
            const id = uuidv4();
            try {
                const newEducaton = await Education.create({id, start, end, shortName, longName, division, description});
                return newEducaton;
            } catch(err){
                console.log(err);
                throw err;
            }

        }
    }
}


const server = createServer({
    schema: {
      typeDefs: fs.readFileSync('./src/schema.graphql', { encoding: "utf8" }),
      resolvers
    },
  })
  
server.start(() => {
    console.log("the server is up")
});
