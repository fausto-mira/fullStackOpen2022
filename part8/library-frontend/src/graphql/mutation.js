import { gql } from '@apollo/client'
import { BOOK_DETAILS } from './fragments'

export const CREATE_BOOK = gql`
    ${BOOK_DETAILS}
    mutation createBook($title: String!, $yearPublished: Int!, $author: String!, $genres: [String!]!){
        addBook(
            title: $title
            published: $yearPublished
            author: $author
            genres: $genres
        ) {
            ...BookDetails
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
