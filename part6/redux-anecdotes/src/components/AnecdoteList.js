import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
// import { filterAnecdotes } from '../reducers/filterReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const filteredAnecdotes = () => {
    return anecdotes.filter(anecdote =>
      anecdote.content.toLowerCase().includes(filter)
    )
  }

  const showedContent = () => {
    if (filter.length !== 0) {
      const result = filteredAnecdotes()

      if (result.length === 0) {
        return <div><strong>NO MATCHING ANECDOTE</strong></div>
      } else {
        return result.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )
      }
    } else {
      return anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>)
    }
  }

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    const votedAnecdote = anecdotes.find(a => a.id === anecdote.id)
    const content = `you voted ${votedAnecdote.content}`
    dispatch(setNotification(content, 5))
  }
  return (
    <div>
      {showedContent()}
    </div>
  )
}

export default AnecdoteList
