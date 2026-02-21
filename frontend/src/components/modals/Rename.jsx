import { useEffect, useRef } from "react"
import { Formik } from "formik"
import { Modal, Form, Button } from "react-bootstrap"
import * as yup from "yup"
import { useTranslation } from "react-i18next"

const ModalEdit = (props) => {
  const { onHide, action, channelsNames, channel } = props

  const { t } = useTranslation()

  const inputRef = useRef()

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.select()
    }
  }, [])

  const schema = yup.object().shape({
    channelName: yup
      .string()
      .required("Обязательное поле")
      .min(3, "От 3 до 20 символов")
      .max(20, "От 3 до 20 символов")
      .notOneOf(channelsNames, "Должно быть уникальным")
  })

  return (
    <Modal show={true} centered>
      <Modal.Header closeButton onClick={onHide}>
        <Modal.Title>{t("modals.header.rename")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ channelName: channel.name }}
          onSubmit={async (values) => {
            action(values.channelName)
            onHide()
          }}
          validationSchema={schema}
        >
          {({ handleSubmit, handleChange, values, touched, errors }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label htmlFor="channelName" className="visually-hidden">{t("modals.label")}</Form.Label>
                
                <Form.Control
                  value={values.channelName}
                  onChange={handleChange}
                  id="channelName"
                  name="channelName"
                  type="text"
                  className="mb-2"
                  isValid={!errors.channelName && touched.channelName}
                  isInvalid={errors.channelName && touched.channelName}
                  ref={inputRef}
                > 
                </Form.Control>
                
                <Form.Control.Feedback type="invalid">{errors.channelName}</Form.Control.Feedback>
                
                <div className="d-flex justify-content-end">
                  <Button type="button" variant="secondary" className="me-2" onClick={onHide}>{t("modals.buttons.cancel")}</Button>
                  <Button type="submit">{t("modals.buttons.send")}</Button>
                </div>
              </Form.Group>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  )
}

export default ModalEdit
