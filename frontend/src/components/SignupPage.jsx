import { Link } from "react-router"
import { Button, Form, FloatingLabel } from "react-bootstrap"
import Header from "./Header"
import AuthContainer from "./AuthContainer"

const SignUp = () => {
  const CardFooter = () => (
    <div className="text-center p-3">
      <span className="mr-1">Есть аккаунт? </span>
      <Link to="/login">Войти</Link>
    </div>
  )

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
          <Form>

            <FloatingLabel controlId="username" label="Имя пользователя" className="mb-3">
              <Form.Control placeholder="Имя пользователя"></Form.Control>
            </FloatingLabel>
            
            <FloatingLabel controlId="username" label="Пароль" className="mb-3">
              <Form.Control placeholder="Пароль" className="mb-3"></Form.Control>
            </FloatingLabel>
            
            <FloatingLabel controlId="username" label="Подтвердите пароль" className="mb-3">
              <Form.Control placeholder="Подтвердите пароль" className="mb-3"></Form.Control>
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
