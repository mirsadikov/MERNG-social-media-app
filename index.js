const { ApolloServer } = require('apollo-server')
const gql = require('graphql-tag')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

dotenv.config()

const typeDefs = gql`
    type Query {
        sayHi: String!
    }
`

const resolvers = {
    Query: {
        sayHi: () => 'Hello World',
    },
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

connectDB()

server.listen({ port: 5000 }).then((res) => {
    console.log(`Server running at ${res.url}`)
})
