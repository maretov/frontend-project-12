import { useDispatch, useSelector } from "react-redux"
import { removeCredentials } from "../slices/authSlice"
import { useTranslation } from "react-i18next"

const Header = () => {
	const dispatch = useDispatch()
	const { t } = useTranslation()
	const { token } = useSelector(state => state.auth)

	const logout = () => {
		localStorage.removeItem("authToken")
		dispatch(removeCredentials())
	}

	return (
		<nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
			<div className="container">
				<a className="navbar-brand" href="/">{t("header.logo")}</a>
				{token && <button onClick={logout} type="button" className="btn btn-primary">{t("header.button")}</button>}
			</div>
		</nav>
	)
}

export default Header
