import { Modal, Button } from "react-bootstrap"
import { useTranslation } from "react-i18next"

const ModalRemove = (props) => {
  const { onHide, action } = props

  const { t } = useTranslation()

  const onRemove = () => {
    action()
    onHide()
  }
  
  return (
    <Modal show={true} centered>
      <Modal.Header closeButton onClick={onHide}>
        <Modal.Title>{t("modals.header.remove")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t("modals.body")}</p>
        <div className="d-flex justify-content-end">
          <Button type="button" variant="secondary" className="me-2" onClick={onHide}>{t("modals.buttons.cancel")}</Button>
          <Button type="button" variant="danger" onClick={onRemove}>{t("modals.buttons.remove")}</Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default ModalRemove
