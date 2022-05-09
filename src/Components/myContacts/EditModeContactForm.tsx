import {useAppDispatch} from "../../store/hooks";
import React, {FC} from "react";
import {ErrorMessage, Field, Form, Formik, FormikErrors} from "formik";
import {addNewUserContact, editUserContact} from "./myContactsSlice";


export type NewContactFormValues = {
  name: string
  telephone: string
}
type PropsType ={
  userId: string
  name: string
  telephone: string
  setEditMode: (boolean) => void
}

export const EditModeContactForm: FC<PropsType> = ({userId,name,telephone,setEditMode}) => {
  const dispatch = useAppDispatch()

  return (
    <div>
      <Formik
        initialValues={{name: name, telephone: telephone}}
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
          dispatch(editUserContact(userId,values,name,telephone))
          setSubmitting(false)
          setEditMode(false);
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
                Accept changes
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
