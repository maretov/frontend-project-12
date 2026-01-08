import { Formik } from "formik"
import { useEffect, useRef } from "react"
import { Modal, Form, Button } from "react-bootstrap"
import * as yup from "yup"

export const ChannelAdd = (props) => {
  const { onHide, onChannelAdd, channelsNames } = props

  const inputRef = useRef()

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <Modal show={true} centered>
      <Modal.Header closeButton onClick={onHide}>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <Formik
          initialValues={{ newChannel: ""}}
          onSubmit={async (values) => {
            onChannelAdd(values.newChannel)
            onHide()
          }}
          validationSchema={
            yup.object().shape({
              newChannel: yup
                .string()
                .required("Обязательное поле")
                .min(3, "От 3 до 20 символов")
                .max(20, "От 3 до 20 символов")
                .notOneOf(channelsNames, "Должно быть уникальным")
            })
          }
        >
          {({ handleSubmit, handleChange, values, touched, errors }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label htmlFor="newChannel" className="visually-hidden">Имя канала</Form.Label>
                
                <Form.Control
                  value={values.newChannel}
                  onChange={handleChange}
                  id="newChannel"
                  name="newChannel"
                  type="text"
                  className="mb-2"
                  isValid={!errors.newChannel && touched.newChannel}
                  isInvalid={errors.newChannel && touched.newChannel}
                  ref={inputRef}
                >
                </Form.Control>
                
                <Form.Control.Feedback type="invalid">{errors.newChannel}</Form.Control.Feedback>
                
                <div className="d-flex justify-content-end">
                  <Button type="button" variant="secondary" className="me-2" onClick={onHide}>Отменить</Button>
                  <Button type="submit">Отправить</Button>
                </div>
                
              </Form.Group>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  )
}
