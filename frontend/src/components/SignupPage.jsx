import { useRef, useEffect, useState } from "react"
import { useLocation, useNavigate, Link } from "react-router"
import { useDispatch } from "react-redux"
import { useFormik } from "formik"
import * as yup from "yup"

import { setCredentials } from "../slices/authSlice"
import { Button, Form, FloatingLabel } from "react-bootstrap"

import Header from "./Header"
import AuthContainer from "./AuthContainer"
import axios from "axios"
import path from "../routes"

const SignUp = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const ref = useRef()

  useEffect(() => {
    if (ref.current) {
      ref.current.focus()
    }
  }, [])

  const CardFooter = () => (
    <div className="text-center p-3">
      <span className="mr-1">Есть аккаунт? </span>
      <Link to="/login">Войти</Link>
    </div>
  )

  const [userExists, setUserExist] = useState(false)

  const formik = useFormik({
    initialValues: { username: "", password: "", confirmPassword: "" },
    onSubmit: async (values) => {
      setUserExist(false)
      const { username, password } = values
      try {
        const response = await axios.post(path.signup(), { username, password })
        const { data } = response

        localStorage.setItem("authToken", JSON.stringify(data))
        dispatch(setCredentials(data))

        const redirectPage = location.state ? location.state.from : "/"
        navigate(redirectPage)
      }
      catch (e) {
        if (e.status === 409) {
          setUserExist(true)
        } else {
          console.log(`Unknown error! Error: ${e}`)
        }
      }
    },
    validationSchema: yup.object({
      username: yup
        .string()
        .required("Обязательное поле")
        .min(3, "От 3 до 20 символов")
        .max(20, "От 3 до 20 символов"),
      password: yup
        .string()
        .required("Обязательное поле")
        .min(6, "Не менее 6 символов"),
      confirmPassword: yup
        .string()
        .required("Обязательное поле")
        .oneOf([yup.ref("password")], "Пароли должны совпадать"),
    })
  })

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = formik

  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <AuthContainer footer={<CardFooter />}>
      <div className="d-flex justify-content-around align-items-center p-4">
        <img
          src="./src/assets/avatar-registration.jpg"
          className="rounded-circle"
          alt="Регистрация"
        />
        <div className="w-50">
          <h1 className="text-center mb-3">Регистрация</h1>
          <Form noValidate onSubmit={handleSubmit}>

            <FloatingLabel controlId="username" label="Имя пользователя" className="mb-3">
              <Form.Control
                placeholder="Имя пользователя"
                type="text"
                name="username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={errors.username && touched.username}
                ref={ref}
              ></Form.Control>
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.username ? errors.username : null}
              </Form.Control.Feedback>
            </FloatingLabel>
            
            <FloatingLabel controlId="password" label="Пароль" className="mb-3">
              <Form.Control
                placeholder="Пароль"
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={errors.password && touched.password}
              ></Form.Control>
              <Form.Control.Feedback type="invalid" tooltip>{errors.password}</Form.Control.Feedback>
            </FloatingLabel>
            
            <FloatingLabel controlId="confirmPassword" label="Подтвердите пароль" className="mb-3">
              <Form.Control
                placeholder="Подтвердите пароль"
                type="password"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={(errors.confirmPassword || userExists) && touched.confirmPassword}
              ></Form.Control>
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.confirmPassword}
                {userExists ? " Такой пользователь уже существует" : null}
              </Form.Control.Feedback>
            </FloatingLabel>

            <Button type="submit" variant="outline-primary" className="w-100 mb-3">Зарегистрироваться</Button>

          </Form>
        </div>
      </div>
      </AuthContainer>
    </div>
  )
}

export default SignUp
