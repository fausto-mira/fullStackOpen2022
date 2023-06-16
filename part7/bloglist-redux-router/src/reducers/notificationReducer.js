import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    set (state, action) {
      return {
        message: action.payload.message,
        type: action.payload.style
      }
    },
    reset (stae, action) {
      return initialState
    }
  }
})

export const { set, reset } = notificationSlice.actions

export const setNotification = ({ message, style, time }) => {
  return dispatch => {
    dispatch(set({ message, style }))
    setTimeout(() => {
      dispatch(reset())
    }, time * 1000)
  }
}

export default notificationSlice.reducer
