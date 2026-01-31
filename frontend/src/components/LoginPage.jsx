import { useRef, useEffect } from "react"
import { useLocation, useNavigate, Link } from "react-router"
import { useDispatch } from "react-redux"
import { setCredentials } from "../slices/authSlice"

import { Form, FloatingLabel, Button } from "react-bootstrap"
import { useFormik } from "formik"
import axios from "axios"
import path from "../routes"

import AuthContainer from "./AuthContainer"
import Header from "./Header"

const LoginPage = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const location = useLocation()
	const ref = useRef()
	
	const CardFooter = () => (
		<div className="text-center p-3">
			<span>Нет аккаунта? </span>
			<Link to="/signup">Регистрация</Link>
		</div>
	)

	const formik = useFormik({
		initialValues: { username: "", password: "" },
		onSubmit: async (values) => {
			try {
				const response = await axios.post(path.login(), values)
				const { data } = response

				localStorage.setItem("authToken", JSON.stringify(data))
				dispatch(setCredentials(data))

				const redirectPage = location.state ? location.state.from : "/"
				navigate(redirectPage)
			}
			catch (e) {
				if (e.status === 401) {
					console.warn("Код ошибки 401. Неверные логин или пароль")
					formik.errors.submit = "Неверные имя пользователя или пароль"
				} else {
					console.error(`Неизвестная ошибка: ${e}`)
				}
			}
		}
	})

	useEffect(() => {
		if (ref.current) {
			ref.current.focus()
		}
	}, [])

	const { values, errors, touched, handleChange, handleSubmit } = formik

	return (
		<div className="d-flex flex-column h-100">
			<Header />
			<AuthContainer footer={<CardFooter />}>
				<div className="d-flex justify-content-around align-items-center p-4">
					<img
						src="./src/assets/avatar-login.jpg"
						className="rounded-circle"
						alt="Авторизация"
					/>
					<div className="w-50">
						<h1 className="text-center mb-3">Войти</h1>
						<Form noValidate onSubmit={handleSubmit}>

							<FloatingLabel controlId="username" label="Имя пользователя" className="mb-3">
								<Form.Control
									type="text"
									name="username"
									placeholder="username"
									value={values.username}
									onChange={handleChange}
                  isInvalid={errors.submit && touched.username && touched.password}
									ref={ref}
								>
								</Form.Control>
							</FloatingLabel>

							<FloatingLabel controlId="password" label="Пароль" className="mb-3">
								<Form.Control
									type="password"
									name="password"
									placeholder="password"
									value={values.password}
									onChange={handleChange}
                  isInvalid={errors.submit && touched.username && touched.password}
									className="mb-3"
								>
								</Form.Control>
								<Form.Control.Feedback type="invalid" tooltip>{errors.submit}</Form.Control.Feedback>
							</FloatingLabel>

							<Button	type="submit"	variant="outline-primary w-100 mb-3">
								Войти
							</Button>

						</Form>
					</div>
				</div>
			</AuthContainer>
		</div>
	)
}

export default LoginPage
