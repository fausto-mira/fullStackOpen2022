import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    set (state, action) {
      return action.payload
    },
    reset (state, action) {
      return null
    }
  }
})

export const { set, reset } = userSlice.actions

export const setUser = (user) => {
  return dispatch => {
    dispatch(set(user))
  }
}

export const resetUser = () => {
  return dispatch => {
    dispatch(reset())
  }
}

export default userSlice.reducer
