import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  username: null,
  token: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { username, token } = action.payload
      state.username = username
      state.token = token
    },
    removeCredentials: (state) => {
      state.username = null
      state.token = null
    }
  }
})

export const { setCredentials, removeCredentials } = authSlice.actions
export default authSlice.reducer
