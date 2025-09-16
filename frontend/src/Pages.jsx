import { Formik, Form, Field } from 'formik'

const MainPage = () => (
	<div>
		MainPage
	</div>
)

const LoginPage = () => (
	<Formik>
		<Form class='col-2 mx-auto mt-5'>
			<div className='form-group mb-3'>
				<label htmlFor='login' className='form-label'>Login</label>
				<Field type='text' name='login' className='form-control' />
			</div>
			<div className='form-group mb-3'>
				<label htmlFor='password' className='form-label'>Password</label>
				<Field type='password' name='password' className='form-control' />
			</div>
			<button type='submit' className='btn btn-primary' >Submit</button>
		</Form>
	</Formik>
)

const ErrorPage = () => (
	<h1>
		Такой страницы не существует
	</h1>
)

export {
	MainPage,
	LoginPage,
	ErrorPage,
}