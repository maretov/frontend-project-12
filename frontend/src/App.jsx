import { Routes, Route } from "react-router"
import { MainPage, LoginPage, ErrorPage, SignUp } from "./components/Pages"

const App = () => {
	return (
		<Routes>
			<Route path="*" element={<ErrorPage />} />
			<Route path="/" element={<MainPage />} />
			<Route path="/login" element={<LoginPage />} />
			<Route path="/signup" element={<SignUp />} />
		</Routes>
	)
}

export default App
