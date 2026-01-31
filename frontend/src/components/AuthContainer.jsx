import { Card } from "react-bootstrap"

const AuthContainer = (props) => {
  const { footer, children } = props

  return (
    <div className="row justify-content-center align-content-center h-100">
      <div className="col-12 col-md-8 col-xxl-6">
        <Card>
          <Card.Body>
            {children}
          </Card.Body>
          <Card.Footer>
            {footer}
          </Card.Footer>
        </Card>
      </div>
    </div>
  )
}

export default AuthContainer
