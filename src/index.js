const { createServer } = require('@graphql-yoga/node')

const typeDefs = `
    type Query {
        greeting(name: String): String!
        user: User!
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
