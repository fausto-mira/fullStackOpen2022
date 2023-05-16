import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () =>
  axios.get(baseUrl).then(res => res.data)

export const createAnecdote = newAnecdote => {
  if (newAnecdote.content.length < 5) { throw new Error('Anecdote must have length 5 or more') }
  return axios.post(baseUrl, newAnecdote).then(res => res.data)
}

export const updateAnecdotes = updatedAnecdotes =>
  axios.put(`${baseUrl}/${updatedAnecdotes.id}`, updatedAnecdotes).then(res => res.data)
