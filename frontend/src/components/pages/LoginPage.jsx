import { useRef, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'

import { Form, FloatingLabel, Button, Image, Container, Row, Col } from 'react-bootstrap'
import { setCredentials } from '../../slices/authSlice'

import axios from 'axios'
import path from '../../routes'

import Header from '../widgets/Header'
import AuthContainer from '../widgets/AuthContainer'
import AuthFooter from '../widgets/AuthFooter'

const LoginPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const ref = useRef()

  useEffect(() => {
    if (ref.current) {
      ref.current.focus()
    }
  }, [])

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    onSubmit: async (values) => {
      const { username, password } = values
      try {
        const response = await axios.post(path.login(), { username, password })
        const { data } = response

        localStorage.setItem('authToken', JSON.stringify(data))
        dispatch(setCredentials(data))

        const redirectPage = location.state ? location.state.from : '/'
        navigate(redirectPage)
      }
      catch (e) {
        if (e.status === 401) {
          console.warn('Код ошибки 401. Неверные логин или пароль')
          formik.errors.submit = t('login.error')
        }
        else {
          console.error(`Неизвестная ошибка: ${e}`)
        }
      }
    },
  })

  const { values, errors, touched, handleChange, handleSubmit } = formik

  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <AuthContainer footer={<AuthFooter page="login" link="/signup" />}>
        <Container>
          <Row>
            <Col xs={5} className="d-flex justify-content-center align-content-center p-5">
              <Image src="./src/assets/avatar-login.jpg" roundedCircle />
            </Col>
            <Col className="p-4">
              <h1 className="text-center mb-3">{t('login.header')}</h1>
              <Form noValidate onSubmit={handleSubmit}>

                <FloatingLabel controlId="username" label={t('login.form.username')} className="mb-3">
                  <Form.Control
                    type="text"
                    name="username"
                    placeholder={t('login.form.username')}
                    value={values.username}
                    onChange={handleChange}
                    isInvalid={errors.submit && touched.username && touched.password}
                    ref={ref}
                  >
                  </Form.Control>
                </FloatingLabel>

                <FloatingLabel controlId="password" label={t('login.form.password')} className="mb-3">
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder={t('login.form.password')}
                    value={values.password}
                    onChange={handleChange}
                    isInvalid={errors.submit && touched.username && touched.password}
                    className="mb-3"
                  >
                  </Form.Control>
                  <Form.Control.Feedback type="invalid" tooltip>{errors.submit}</Form.Control.Feedback>
                </FloatingLabel>

                <Button type="submit" variant="outline-primary w-100 mb-3">
                  {t('login.form.button')}
                </Button>

              </Form>
            </Col>
          </Row>
        </Container>
      </AuthContainer>
    </div>
  )
}

export default LoginPage
