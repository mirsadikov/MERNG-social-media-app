const { ApolloServer, PubSub } = require('apollo-server')
const dotenv = require('dotenv')

const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')
const connectDB = require('./config/db')

dotenv.config()

const pubsub = new PubSub()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
})

connectDB()

server.listen({ port: 5000 }).then((res) => {
  console.log(`Server running at ${res.url}`)
})
