import { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Modal, Form, Button } from 'react-bootstrap'

const ModalAdd = (props) => {
  const { onHide, action, channelsNames } = props

  const { t } = useTranslation()

  const inputRef = useRef()

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const validationSchema = yup.object().shape({
    channelName: yup
      .string()
      .required('Обязательное поле')
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .notOneOf(channelsNames, 'Должно быть уникальным'),
  })

  const formik = useFormik({
    initialValues: { channelsName: '' },
    onSubmit: async (values) => {
      action(values.channelName)
      onHide()
    },
    validationSchema,
  })

  const { values, errors, touched, handleChange, handleSubmit } = formik

  return (
    <Modal show={true} centered>
      <Modal.Header closeButton onClick={onHide}>
        <Modal.Title>{t('modals.header.add')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor="channelName" className="visually-hidden">{t('modals.label')}</Form.Label>

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
              <Button type="button" variant="secondary" className="me-2" onClick={onHide}>{t('modals.buttons.cancel')}</Button>
              <Button type="submit">{t('modals.buttons.send')}</Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default ModalAdd
