import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  messages: {},
}

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessages: (state, action) => {
      const { payload } = action
      state.messages = payload
    },
    addMessage: (state, action) => {
      const { payload } = action
      state.messages[payload.id] = payload
    },
    removeMessages: (state, action) => {
      const { payload } = action
      payload.forEach((id) => delete state.messages[id])
    },
  },
})

export const { addMessages, addMessage, removeMessages } = messagesSlice.actions
export default messagesSlice.reducer
