import { gql } from '@apollo/client'

export const BOOK_DETAILS = gql`
    fragment BookDetails on Book {
        title
        published
        author {
            name
        }
        id
        genres
    }
`

export const AUTHOR_DETAILS = gql`
    fragment AuthorDetails on Author {
        name
        born
        id
        bookCount
    }
`
