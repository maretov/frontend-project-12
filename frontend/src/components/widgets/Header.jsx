import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { removeCredentials } from '../../slices/authSlice'
import { Navbar, Container, Button } from 'react-bootstrap'

const Header = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { token } = useSelector(state => state.auth)

  const logout = () => {
    localStorage.removeItem('authToken')
    dispatch(removeCredentials())
  }

  return (
    <Navbar>
      <Container>
        <Navbar.Brand href="/">{t('header.logo')}</Navbar.Brand>
        {token && <Button onClick={logout}>{t('header.button')}</Button>}
      </Container>
    </Navbar>
  )
}

export default Header
