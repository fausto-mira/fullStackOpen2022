import { gql } from '@apollo/client'
import { BOOK_DETAILS } from './fragments'

export const BOOK_ADDED = gql`
    ${BOOK_DETAILS}
    subscription{
        addedBook{
            ...BookDetails
        }
    }
`
