import { createSlice } from '@reduxjs/toolkit'
import anecdoteServices from '../services/anecdotes'

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)

const orderByVotes = (state) => (
  [].concat(state).sort((a, b) => a.votes < b.votes ? 1 : -1)
)

const anecdoteSlice = createSlice(
  {
    name: 'anecdotes',
    initialState: [],
    reducers: {
      // createAnecdote (state, action) {
      //   // return orderByVotes(state.concat(asObject(action.payload)))
      //   orderByVotes(state.push(action.payload))
      // },
      updateOneAnecdote (state, action) {
        return orderByVotes(
          state.map(anecdote => anecdote.id !== action.payload.id ? anecdote : action.payload)
        )
      },
      appendAnecdote (state, action) {
        orderByVotes(state.push(action.payload))
      },
      setAnecdotes (state, action) {
        return action.payload
      }
    }
  }
)

export const { updateOneAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteServices.getAll()
    const orderedAnecdotes = orderByVotes(anecdotes)
    dispatch(setAnecdotes(orderedAnecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteServices.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = anecdote => {
  return async dispatch => {
    const changedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    const updatedAnecdote = await anecdoteServices.update(anecdote.id, changedAnecdote)
    dispatch(updateOneAnecdote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer

// const anecdoteReducer = (state = initialState, action) => {
//   // console.log('state now: ', state)
//   // console.log('action', action)

//   switch (action.type) {
//     case 'NEW_ANECDOTE':
//       return orderByVotes(state.concat(action.data))
//     case 'VOTE_ANECDOTE': {
//       const anecdoteToChange = state.find(anecdote => anecdote.id === action.data)
//       const changedAnecdote = { ...anecdoteToChange, votes: anecdoteToChange.votes + 1 }
//       return orderByVotes(
//         state.map(anecdote => anecdote.id !== action.data ? anecdote : changedAnecdote)
//       )
//     }
//     default: return state
//   }
// }

// export const createAnecdote = (content) => {
//   return { type: 'NEW_ANECDOTE', data: asObject(content) }
// }

// export const voteAnecdote = (id) => ({ type: 'VOTE_ANECDOTE', data: id })

// export default anecdoteReducer
