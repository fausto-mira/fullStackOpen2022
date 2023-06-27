import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { v1 as uuid } from 'uuid'

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

const typeDefs = `
  type Book {
    title: String!
    published: Int!
    author: String!
    id: ID!
    genres: [String!]!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Query {
    allAuthors: [Author!]!
    allBooks(author: String, genre: String): [Book!]!
    bookCount: Int!
    authorCount: Int!
  }

  type Mutation {
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author

    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
  }
`

const resolvers = {
  Query: {
    allAuthors: () => authors,
    allBooks: (root, args) => {
      let filteredBooks = books
      if(args.author) filteredBooks = books.filter(book => book.author === args.author)
      if(args.genre) filteredBooks = filteredBooks.filter(
        book => book.genres.find(genre => genre === args.genre)
      )
      return filteredBooks
      
    },
    authorCount: () => authors.length,
    bookCount: (root, args) => books.length
  },

  Mutation: {
    editAuthor: (root, args) => {
      let authorToModify = authors.find(author => author.name === args.name)
      if(authorToModify){
        authorToModify = {...authorToModify, born: args.setBornTo}
        authors = authors.map(author => author.name !== authorToModify.name ? author : authorToModify)
        return authorToModify
      }
      return null
    },
    addBook: (root, args) => {
      const book = {...args, id: uuid()}
      books = books.concat(book)
      if(!authors.find(author => author.name === args.author)){
        const author = {name: args.author, id: uuid()}
        authors = authors.concat(author)
      }
      return book
    }
  },

  Author: {
    name: (root) => root.name,
    id: (root) => root.id,
    born: (root) => root.born,
    bookCount: (root) => books.filter(book => book.author === root.name).length
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})