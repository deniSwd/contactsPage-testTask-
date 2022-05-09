import {useAppDispatch} from "../../store/hooks";
import React, {FC} from "react";
import {ErrorMessage, Field, Form, Formik, FormikErrors} from "formik";
import {addNewUserContact} from "./myContactsSlice";
import {ContactsType} from "../../MainTypes";


export type NewContactFormValues = {
  name: string
  telephone: string
  sameContact: string
}
type PropsType ={
  userId: string
  contacts: ContactsType
}

export const NewContactForm: FC<PropsType> = ({userId,contacts}) => {
  const dispatch = useAppDispatch()

  return (
    <div>
      <Formik
        initialValues={{name: '', telephone: ''}}
        validate={values => {
          const sameContact = contacts.find((c => c.name === values.name && c.telephone === values.telephone))
          const errors: FormikErrors<NewContactFormValues> = {}
          if (!values.name) {
            errors.name = 'Required'
          }
          if (!values.telephone) {
            errors.telephone = 'Required'
          }
          if (sameContact) {
            errors.sameContact = 'This contact already exists'
          }
          return errors;
        }}
        onSubmit={(values, {setSubmitting}) => {
          dispatch(addNewUserContact(userId,values))
          setSubmitting(false)
        }}
      >
        {({isSubmitting, errors}) => (
          <Form>
            <div>
              NAME: <Field type="name" name="name"/>
              <ErrorMessage name="name" component="div"/>
            </div>
            <div>
              TEL.: <Field type="telephone" name="telephone"/>
              <ErrorMessage name="telephone" component="div"/>
            </div>
            <ErrorMessage name="sameContact" component="div"/>
            <div>{(errors as FormikErrors<NewContactFormValues>).sameContact}</div>
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
