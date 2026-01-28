import { Routes, Route } from "react-router"
import { MainPage, LoginPage, ErrorPage } from "./components/Pages"

const App = () => {
	return (
		<Routes>
			<Route path="*" element={<ErrorPage />} />
			<Route path="/" element={<MainPage />} />
			<Route path="/login" element={<LoginPage />} />
		</Routes>
	)
}

export default App
