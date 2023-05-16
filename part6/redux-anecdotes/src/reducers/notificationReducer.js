import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    set (state, action) {
      console.log(action.payload)
      return action.payload
    },
    reset (state, action) {
      return ''
    }
  }
})

export const { set, reset } = notificationSlice.actions

export const setNotification = (notification, time) => {
  return dispatch => {
    dispatch(set(notification))
    setTimeout(() => {
      dispatch(reset())
    }, time * 1000)
  }
}

export default notificationSlice.reducer
