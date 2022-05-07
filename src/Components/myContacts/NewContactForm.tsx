import {useAppDispatch} from "../../store/hooks";
import React, {FC} from "react";
import {ErrorMessage, Field, Form, Formik, FormikErrors} from "formik";
import {addNewUserContact} from "./myContactsSlice";


export type NewContactFormValues = {
  name: string
  telephone: string
}
type PropsType ={
  userId: string
}

export const NewContactForm: FC<PropsType> = ({userId}) => {
  const dispatch = useAppDispatch()

  return (
    <div>
      <Formik
        initialValues={{name: '', telephone: ''}}
        validate={values => {
          const errors: FormikErrors<NewContactFormValues> = {};
          if (!values.name) {
            errors.name = 'Required';
          }
          if (!values.telephone) {
            errors.telephone = 'Required'
          }
          return errors;
        }}
        onSubmit={(values, {setSubmitting}) => {
          dispatch(addNewUserContact(userId,values))
          setSubmitting(false);
        }}
      >
        {({isSubmitting}) => (
          <Form>
            <div>
              <Field type="name" name="name"/>
              <ErrorMessage name="name" component="div"/>
            </div>
            <div>
              <Field type="telephone" name="telephone"/>
              <ErrorMessage name="telephone" component="div"/>
            </div>
            <div>
              <button type="submit" disabled={isSubmitting} >
                Add contact
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
