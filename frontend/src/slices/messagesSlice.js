import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  messages: {}
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
    editMessage: (state, action) => {

    },
    removeMessage: (state, action) => {

    }
  }
})

export const { addMessages, addMessage, editMessage, removeMessage } = messagesSlice.actions
export default messagesSlice.reducer
