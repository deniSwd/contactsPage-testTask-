import React, {FC} from 'react';
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {selectInputError, setCurrentUser} from '../myContacts/myContactsSlice';
import {ErrorMessage, Field, Form, Formik, FormikErrors} from 'formik';
import {Button, Input} from "antd";
import s from './authorization.module.scss'

export type FormValues = {
  email: string
  password: string
}

export const Authorization: FC = () => {
  /* const count = useAppSelector(selectCount);
const [incrementAmount, setIncrementAmount] = useState('2');*/
  const dispatch = useAppDispatch()
  const inputError = useAppSelector(selectInputError)

  return (
    <div>
      <Formik
        initialValues={{email: '', password: ''}}
        validate={values => {
          const errors: FormikErrors<FormValues> = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          if (!values.password) {
            errors.password = 'Required'
          }
          return errors;
        }}
        onSubmit={(values, {setSubmitting}) => {
          dispatch(setCurrentUser(values))
          setSubmitting(false);
        }}
      >
        {({isSubmitting, submitForm, errors}) => (
          <Form className={s.mainForm}>
            <div className={s.field}>
              <div className={s.fieldName}>
                EMAIL:
              </div>
              <Field type="email"
                     name="email">
                {({field}) =>
                <Input {...field}
                       className={s.inputField}
                       status={errors.email ? 'error' : ''}/>}
              </Field>
              <ErrorMessage name="email" component="div" className={s.errorMessage}/>
            </div>
            <div className={s.field}>
              <div className={s.fieldName}>
                PASSWORD:
              </div>
              <Field type="password"
                     name="password">
                {({field}) =>
                  <Input.Password {...field}
                                  className={s.inputField}
                                  status={errors.password ? 'error' : ''}/>}
              </Field>
              <ErrorMessage name="password" component="div" className={s.errorMessage}/>
              {inputError && <div className={s.incorrectValuesMessage}>Incorrect login or password</div>}
            </div>
            <div className={s.button}>
              <Button type="primary" disabled={isSubmitting} onClick={submitForm}>
                Submit
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}