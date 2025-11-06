import { useEffect } from "react"
import { useNavigate } from "react-router"
import { useDispatch } from 'react-redux'
import { setCredentials } from "../slices/authSlice"

const MainPage = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	
	useEffect(() => {
		const authToken = localStorage.getItem('authToken')
		if (authToken) {
			const data = JSON.parse(authToken)
			dispatch(setCredentials(data))
		}
		else {
			navigate('/login')
		}
	})

	return <h1>Главная страница</h1>
}

export default MainPage
