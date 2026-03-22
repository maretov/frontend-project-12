import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

const AuthFooter = (props) => {
  const { page, link } = props

  const { t } = useTranslation()

  return (
    <div className="text-center p-3">
      <span>{t(`${page}.footer.question`)}</span>
      <Link to={link}>{t(`${page}.footer.link`)}</Link>
    </div>
  )
}

export default AuthFooter
