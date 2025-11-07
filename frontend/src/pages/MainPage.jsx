import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router"
import { useDispatch } from 'react-redux'
import { setCredentials } from "../slices/authSlice"

const MainPage = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const dispatch = useDispatch()
	
	useEffect(() => {
		const authToken = localStorage.getItem('authToken')
		if (authToken) {
			const data = JSON.parse(authToken)
			dispatch(setCredentials(data))
		}
		else {
			const currentLocation = `${location.pathname}`
			navigate('/login', {
				state: { from: currentLocation }
			})
		}
	})

	return <h1>Главная страница</h1>
}

export default MainPage
