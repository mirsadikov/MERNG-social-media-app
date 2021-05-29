const { ApolloServer } = require('apollo-server')
const dotenv = require('dotenv')

const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')
const connectDB = require('./config/db')

// const post = Post.create({
//     body: 'Sample Post',
//     username: 'mirsadikov',
//     createdAt: 'May 5',
//     comments: [],
//     likes: [
//         {
//             username: 'zeyds',
//             createdAt: 'May 6',
//         },
//     ],
// })

dotenv.config()

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

connectDB()

server.listen({ port: 5000 }).then((res) => {
    console.log(`Server running at ${res.url}`)
})
