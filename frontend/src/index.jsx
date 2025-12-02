import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App.jsx'
import store from './slices/index.js'
import { Provider } from 'react-redux'

const chat = document.getElementById('chat')

ReactDOM.createRoot(chat).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
)
