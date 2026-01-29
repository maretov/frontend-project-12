import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  username: null,
  token: null,
  headers: {
    "Content-Type": "application/json",
    Authorization: null,
  },
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { username, token } = action.payload
      state.username = username
      state.token = token
      state.headers.Authorization = `Bearer ${token}`
    },
    removeCredentials: (state) => {
      state.username = null
      state.token = null
      state.headers.Authorization = null
    },
  },
})

export const { setCredentials, removeCredentials } = authSlice.actions
export default authSlice.reducer
