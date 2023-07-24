import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { WebSocketServer } from 'ws'
import { useServer } from 'graphql-ws/lib/use/ws'
import { makeExecutableSchema } from '@graphql-tools/schema'
import express from 'express'
import http from 'http'
import cors from 'cors'
import bodyParser from 'body-parser'
import { PubSub } from 'graphql-subscriptions'
import { GraphQLError } from 'graphql'
import Author from './models/author.js'
import Book from './models/book.js'
import User from './models/user.js'
import jwt from 'jsonwebtoken'
import './db.js'

const pubsub = new PubSub()

const typeDefs = `
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }

  type Query {
    allAuthors: [Author!]!
    allBooks(author: String, genre: String): [Book!]!
    booksByGenre(genre: String): [Book!]!
    bookCount: Int!
    authorCount: Int!
    me: User
  }

  type Mutation {
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author

    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    addedBook: Book!
  }
`

const resolvers = {
  Query: {
    allAuthors: async () => await Author.find({}),
    allBooks: async (root, args) => await Book.find({}).populate('author'),
    booksByGenre: async (root, args) => {
      const { genre } = args
      if (genre) {
        return await Book.find({ genres: { $in: [genre] } }).populate('author')
      }
      return Book.find({}).populate('author')
    },
    authorCount: async () => await Author.collection.countDocuments(),
    bookCount: async (root, args) => await Book.collection.countDocuments(),
    me: (root, args, { currentUser }) => currentUser
  },

  Mutation: {
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      try {
        return Author.findOneAndUpdate(
          { name: args.name }, { born: args.setBornTo }, { new: true }
        )
      } catch (error) {
        throw new GraphQLError('Editing user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }
    },

    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      let author = await Author.findOne({ name: args.author })
      if (!author) author = new Author({ name: args.author })

      const book = new Book({ ...args, author: author._id })

      author.books = author.books.concat(book._id)
      await author.save()

      try {
        await book.save()
        pubsub.publish('BOOK_ADDED', { addedBook: book.populate('author') })
        return book.populate('author')
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }
    },

    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        })
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    }
  },

  Subscription: {
    addedBook: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  },

  Author: {
    name: (root) => root.name,
    id: (root) => root.id,
    born: (root) => root.born,
    bookCount: async (root) => root.books.length
  }
}

const schema = makeExecutableSchema({ typeDefs, resolvers })

const app = express()
const httpServer = http.createServer(app)

const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql'
})

const serverCleanup = useServer({ schema }, wsServer)

const server = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart () {
        return {
          async drainServer () {
            await serverCleanup.dispose()
          }
        }
      }
    }
  ]
})

await server.start()

app.use(
  '/graphql',
  cors(),
  bodyParser.json(),
  expressMiddleware(server, {
    context: async ({ req, res }) => {
      const auth = req ? req.headers.authorization : null
      if (auth && auth.toLowerCase().startsWith('bearer ')) {
        let decodedToken
        try {
          decodedToken = jwt.verify(
            auth.substring(7), process.env.JWT_SECRET
          )
        } catch (error) {
          throw new GraphQLError('wrong credentials', {
            extensions: {
              code: 'BAD_USER_AUTH'
            }
          })
        }
        const currentUser = await User.findById(decodedToken.id)
        return { currentUser }
      }
      return null
    }
  })
)

// app.use('/graphql', cors(), bodyParser.json(), expressMiddleware(server))

httpServer.listen({ port: 4000 }, () => {
  console.log('🚀 Server ready at http://localhost:4000/graphql')
  console.log('🚀 Subscriptions ready at ws://localhost:4000/graphql')
})

// startStandaloneServer(server, {
//   listen: { port: 4000 },
//   context: async ({ req, res }) => {
//     const auth = req ? req.headers.authorization : null
//     if (auth && auth.toLowerCase().startsWith('bearer ')) {
//       let decodedToken
//       try {
//         decodedToken = jwt.verify(
//           auth.substring(7), process.env.JWT_SECRET
//         )
//       } catch (error) {
//         throw new GraphQLError('wrong credentials', {
//           extensions: {
//             code: 'BAD_USER_AUTH'
//           }
//         })
//       }
//       const currentUser = await User.findById(decodedToken.id)
//       return { currentUser }
//     }
//     return null
//   }
// }).then((args) => {
//   console.log(`Server ready at ${url}`)
//   console.log(`Subscriptions ready at ${subscriptionsUrl}`)
// })
