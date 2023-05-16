import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const filterSlice = createSlice(
  {
    name: 'filter',
    initialState,
    reducers: {
      changeFilter (state, action) {
        return action.payload.toLowerCase()
      }
    }
  }
)

export const { changeFilter } = filterSlice.actions
export default filterSlice.reducer

// const filterReducer = (state = '', action) => {
//   switch (action.type) {
//     case 'FILTER_SET':
//       return action.filter.toLowerCase()
//     case 'FILTER_CLEAR':
//       return ''
//     default: return state
//   }
// }

// export const changeFilter = (filter) => {
//   return { type: 'FILTER_SET', filter }
// }

// export const clearFilter = () => {
//   return { type: 'FILTER_CLEAR' }
// }

// export default filterReducer
