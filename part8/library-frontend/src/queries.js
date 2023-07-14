import { gql } from '@apollo/client'

export const ALL_BOOKS = gql`
    query {
        allBooks {
            title
            published
            author {
                name
            }
            id
            genres
        }
    }
`

export const ALL_AUTHORS = gql`
    query{
        allAuthors {
            name
            born
            id
            bookCount
        }
    }
`

export const CREATE_BOOK = gql`
    mutation createBook($title: String!, $yearPublished: Int!, $author: String!, $genres: [String!]!){
        addBook(
            title: $title
            published: $yearPublished
            author: $author
            genres: $genres
        ) {
            title
            published
            author{
                name
            }
            genres
            id
        }
    }
`

export const UPDATE_BIRTHYEAR = gql`
    mutation updateBirthyear($name: String!, $born: Int!){
        editAuthor(
            name: $name
            setBornTo: $born
        ){
            name
            born
            id
        }
    }
`

export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password)  {
            value
        }
    }   
`

export const USER_FAVORITE_GENRE = gql`
    query{
        me{
            favoriteGenre
        }
    }
`

export const BOOKS_BY_GENRE = gql`
    query filteredBooks($genre: String){
        booksByGenre(genre: $genre) {
            title
            published
            author{
                name
            }
            genres
            id
        }
    }
`
