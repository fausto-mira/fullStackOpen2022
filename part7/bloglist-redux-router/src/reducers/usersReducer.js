import { createSlice } from '@reduxjs/toolkit'
import usersServices from '../services/users'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    set (state, action) {
      return action.payload
    },
    reset (state, action) {
      return []
    }
  }
})

export const { set, reset } = usersSlice.actions

export const setUsers = () => {
  return async dispatch => {
    const users = await usersServices.getUsers()
    dispatch(set(users))
  }
}

export const resetUsers = () => {
  return dispatch => {
    dispatch(reset())
  }
}

export default usersSlice.reducer
