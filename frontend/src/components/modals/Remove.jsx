import { Modal, Button } from "react-bootstrap"

const ModalRemove = (props) => {
  const { onHide, action } = props

  const onRemove = () => {
    action()
    onHide()
  }
  
  return (
    <Modal show={true} centered>
      <Modal.Header closeButton onClick={onHide}>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Уверены?</p>
        <div className="d-flex justify-content-end">
          <Button type="button" variant="secondary" className="me-2" onClick={onHide}>Отменить</Button>
          <Button type="button" variant="danger" onClick={onRemove}>Удалить</Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default ModalRemove
