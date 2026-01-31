import { useDispatch, useSelector } from "react-redux"
import { removeCredentials } from "../slices/authSlice"

const Header = () => {
	const dispatch = useDispatch()
	const { token } = useSelector(state => state.auth)

	const logout = () => {
		localStorage.removeItem("authToken")
		dispatch(removeCredentials())
	}

	return (
		<nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
			<div className="container">
				<a className="navbar-brand" href="/">Hexlet Chat</a>
				{token && <button onClick={logout} type="button" className="btn btn-primary">Выйти</button>}
			</div>
		</nav>
	)
}

export default Header
