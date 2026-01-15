import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: '', type: '' },
  reducers: {
    addNotification(state, action) {
      return { message: action.payload.message, type: action.payload.type }
    },
    clearNotification() {
      return ''
    },
  },
})

const { addNotification, clearNotification } = notificationSlice.actions

export const setNotification = (message, type, seconds) => {
  return async (dispatch) => {
    dispatch(addNotification({ message, type }))
    setTimeout(() => {
      dispatch(clearNotification())
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer
