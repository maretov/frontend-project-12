import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router"
import App from "./App"
import store from "./slices/index"
import { Provider } from "react-redux"
import "./locales/i18next"
import "./index.scss"

const chat = document.getElementById("chat")

ReactDOM.createRoot(chat).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
)
