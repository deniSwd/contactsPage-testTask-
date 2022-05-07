import React, {FC} from 'react';
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {selectInputError, selectUser, setCurrentUser} from '../myContacts/myContactsSlice';
import {ErrorMessage, Field, Form, Formik, FormikErrors} from 'formik';

export type FormValues = {
  email: string
  password: string
}

export const Authorization: FC = () => {
  /* const count = useAppSelector(selectCount);
const [incrementAmount, setIncrementAmount] = useState('2');*/
  const dispatch = useAppDispatch();
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
        {({isSubmitting}) => (
          <Form>
            <div>
              <Field type="email" name="email"/>
              <ErrorMessage name="email" component="div"/>
            </div>
            <div>
              <Field type="password" name="password"/>
              <ErrorMessage name="password" component="div"/>
            </div>
            <div>
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </div>
            <div>
              {inputError && <div>Incorrect login or password</div>}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}