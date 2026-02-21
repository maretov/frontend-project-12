import Header from "./Header"
import { Link } from "react-router"
import { useTranslation } from "react-i18next"

const ErrorPage = () => {
	const { t } = useTranslation()

	return (
		<div className="d-flex flex-column h-100">
			<Header />
			<div className="text-center">
				<img
					src="./src/assets/avatar-error.svg"
					alt="Страница не найдена"
					className="img-fluid h-25"
				/>
				<h1 className="h4 text-muted">{t("errorPage.header")}</h1>
				<p>
					{t("errorPage.action")}
					<Link to="/">{t("errorPage.link")}</Link>
				</p>
			</div>
		</div>
	)
}

export default ErrorPage
