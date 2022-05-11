import {ContactsType} from "../../MainTypes";
import React, {FC} from "react";
import {useAppDispatch} from "../../store/hooks";
import {ErrorMessage, Field, Form, Formik, FormikErrors} from "formik";
import {addNewUserContact, editUserContact, setAddContactForm} from "./myContactsSlice";
import {CloseCircleOutlined, CloseOutlined, PlusOutlined} from "@ant-design/icons";
import {Button} from "antd";

export type GeneralFormValues = {
  name: string
  telephone: string
  sameContact: string
}

type PropsType = {
  userId: string
  contacts?: ContactsType
  name: string
  telephone: string
  setEditMode?: (boolean) => void
  addNewContact?: boolean
  editContact?: boolean
  buttonName: string
}

export const GeneralForm: FC<PropsType> = ({userId, contacts, name, telephone, setEditMode, addNewContact, editContact, buttonName}) => {
  const dispatch = useAppDispatch()
  return (
    <div>
      <Formik
        initialValues={{name: name, telephone: telephone}}
        validate={values => {
          const sameContact =  contacts?.find((c => c.name === values.name && c.telephone === values.telephone))
          const errors: FormikErrors<GeneralFormValues> = {}
          if (!values.name) {
            errors.name = 'Required'
          }
          if (!values.telephone) {
            errors.telephone = 'Required'
          } else if (
            !/^8\([0-9]{3}\)[0-9]{3}-[0-9]{2}-[0-9]{2}$/.test(values.telephone)
          ) {
            errors.telephone = 'Input telephone in format 8(xxx)xxx-xx-xx';
          }
          if (sameContact) {
            errors.sameContact = 'This contact already exists'
          }
          return errors;
        }}
        onSubmit={(values, {setSubmitting}) => {
          addNewContact && dispatch(addNewUserContact(userId, values))
          editContact && dispatch(editUserContact(userId, values, name, telephone))
          setSubmitting(false)
          setEditMode && setEditMode(false)
        }}
      >
        {({isSubmitting, errors}) => (
          <Form>
            {addNewContact &&
            <Button type='ghost' shape='circle' icon={<CloseOutlined />} size='small'
                                      onClick={() => dispatch(setAddContactForm(false))}/>}
            <div>
              NAME: <Field type="name" name="name"/>
              <ErrorMessage name="name" component="div"/>
            </div>
            <div>
              TEL.: <Field type="telephone" name="telephone"/>
              <ErrorMessage name="telephone" component="div"/>
            </div>
            <div>{(errors as FormikErrors<GeneralFormValues>).sameContact}</div>
            <div>
              <button type="submit" disabled={isSubmitting}>
                {buttonName}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}