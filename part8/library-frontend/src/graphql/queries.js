import { gql } from '@apollo/client'
import { BOOK_DETAILS, AUTHOR_DETAILS } from './fragments'

export const ALL_BOOKS = gql`
    ${BOOK_DETAILS}
    query {
        allBooks {
            ...BookDetails
        }
    }
`

export const ALL_AUTHORS = gql`
    ${AUTHOR_DETAILS}
    query{
        allAuthors {
            ...AuthorDetails
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
    ${BOOK_DETAILS}
    query filteredBooks($genre: String){
        booksByGenre(genre: $genre) {
            ...BookDetails
        }
    }
`
