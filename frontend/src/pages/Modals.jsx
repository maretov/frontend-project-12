import { Formik, Form, Field } from "formik"
import { useEffect, useRef } from "react"
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
      {({ errors, touched }) => {
        const inputClasses = errors.newChannel && touched.newChannel ? "form-control is-invalid" : "form-control"

        return (
          <>
            <div className="fade modal-backdrop show"></div>
            <div aria-modal="true" className="fade modal show" tabIndex="-1" style={{ display: "block" }}>
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <div className="modal-title h4">Добавить канал</div>
                    <button
                      onClick={onHide}
                      type="button"
                      aria-label="Close"
                      data-bs-dismiss="modal"
                      className="btn btn-close"
                    >
                    </button>
                  </div>
                  <div className="modal-body">
                    <Form>
                      <div className="form-group mb-2">
                        <label htmlFor="newChannel" className="visually-hidden"></label>
                        <Field ref={inputRef} type="text" name="newChannel" id="newChannel" className={inputClasses}></Field>
                        {errors.newChannel && touched.newChannel ? <div className="invalid-feedback">{errors.newChannel}</div> : null}
                      </div>
                      <div className="d-flex justify-content-end">
                        <button onClick={onHide} type="button" className="me-2 btn btn-secondary">Отменить</button>
                        <button type="submit" className="btn btn-primary">Отправить</button>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      }}
      
    </Formik>
  )
}
