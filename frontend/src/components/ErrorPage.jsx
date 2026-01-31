import Header from "./Header"
import { Link } from "react-router"

const ErrorPage = () => (
	<div className="d-flex flex-column h-100">
		<Header />
		<div className="text-center">
			<img
				src="./src/assets/avatar-error.svg"
				alt="Страница не найдена"
				className="img-fluid h-25"
			/>
			<h1 className="h4 text-muted">Страница не найдена</h1>
			<p>Но вы можете перейти
			<Link to="/"> на главную страницу</Link>
			</p>
		</div>
	</div>
)

export default ErrorPage
