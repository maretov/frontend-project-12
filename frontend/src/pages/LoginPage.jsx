import { Formik, Form, Field } from 'formik'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../slices/authSlice'

const baseUrl = 'http://localhost:5002/api/v1'
const loginPagePath = '/login'
const mainPagePath = '/'

const LoginPage = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	return (
		<Formik
			initialValues={{ username: "", password: ""}}
			onSubmit={async (values, { setSubmitting, setErrors }) => {
				try {
					const response = await axios.post(`${baseUrl}${loginPagePath}`, values)
					const { data } = response
					localStorage.setItem('authToken', JSON.stringify(data))
					dispatch(setCredentials(data))
					navigate(mainPagePath)
				}
				catch(e) {
					switch (e.status) {
						case 401:
							console.log('Код ошибки 401. Неверные логин или пароль')
							setErrors({ submit: 'Неверные логин или пароль' })
							break
						case 404:
							console.log('Код ошибки 404. Страница не найдена')
							break
						default:
							console.log(`Неизвестная ошибка: ${e}`)
					}
				}
				setSubmitting(false)
			}}
		>
			{({ errors }) => (
				<Form className='col-3 mx-auto mt-5'>
					<div className='form-group mb-3'>
						<label htmlFor='username' className='form-label'>Username</label>
						<Field type='text' name='username' className='form-control' />
					</div>
					<div className='form-group mb-3'>
						<label htmlFor='password' className='form-label'>Password</label>
						<Field type='password' name='password' className='form-control' />
					</div>
					{errors.submit && (<div style={{ color: 'red' }}>{errors.submit}</div>)}
					<button type='submit' className='btn btn-primary mt-3' >Submit</button>
				</Form>
			)}
		</Formik>
	)
}

export default LoginPage
