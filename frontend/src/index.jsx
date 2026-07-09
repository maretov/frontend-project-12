import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App'
import store from './slices/index'
import { Provider as StoreProvider } from 'react-redux'
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react'
import './locales/index'
import './index.scss'
import './services/initSocket'
import SocketProvider from './services/useSocket'


const rollbarConfig = {
  accessToken: '7c9bbdc065a749268589a6907241ee0b',
  environment: 'production',
  captureUncaught: true,
}

const chat = document.getElementById('chat')

ReactDOM.createRoot(chat).render(
  <RollbarProvider config={rollbarConfig}>
    <ErrorBoundary>
      <StoreProvider store={store}>
        <BrowserRouter>
          <SocketProvider>
            <App />
          </SocketProvider>
        </BrowserRouter>
      </StoreProvider>
    </ErrorBoundary>
  </RollbarProvider>,
)
