import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  messages: {}
}

const messagesSlice = createSlice({
  name: "messages",
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
    editMessage: (state, action) => { // eslint-disable-line no-unused-vars

    },
    removeMessage: (state, action) => { // eslint-disable-line no-unused-vars

    }
  }
})

export const { addMessages, addMessage, editMessage, removeMessage } = messagesSlice.actions
export default messagesSlice.reducer
