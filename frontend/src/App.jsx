import { Routes, Route } from 'react-router'
import MainPage from './components/pages/MainPage'
import LoginPage from './components/pages/LoginPage'
import ErrorPage from './components/pages/ErrorPage'
import SignupPage from './components/pages/SignupPage'

const App = () => {
  return (
    <Routes>
      <Route path="*" element={<ErrorPage />} />
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  )
}

export default App
