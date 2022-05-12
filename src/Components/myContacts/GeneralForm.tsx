import {ContactsType} from "../../MainTypes";
import React, {FC} from "react";
import {useAppDispatch} from "../../store/hooks";
import {ErrorMessage, Field, Form, Formik, FormikErrors} from "formik";
import {addNewUserContact, editUserContact, setAddContactForm} from "./myContactsSlice";
import e from './editGeneralForm.module.scss'
import a from '.././authorization/authorization.module.scss'
import {CloseOutlined} from "@ant-design/icons";
import {Button, Input} from "antd";

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
  const style = addNewContact ? a : e
  return (
    <div>
      <Formik
        initialValues={{name: name, telephone: telephone}}
        validate={values => {
          const sameContact = contacts?.find((c => c.name === values.name && c.telephone === values.telephone))
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
        {({isSubmitting, errors, touched, submitForm}) => (
          <Form className={style.generalForm}>
            {addNewContact &&
            <div className={style.closeAddFormButton}>
                <Button type='ghost' shape='circle' icon={<CloseOutlined/>} size='small'
                        onClick={() => dispatch(setAddContactForm(false))}/>
            </div>}
            <div className={style.field}>
              {addNewContact &&
              <div className={style.fieldName}>
                  NAME:
              </div>}
              <Field type="name" name="name">
                {({field}) =>
                  <Input {...field}
                         className={style.inputField}
                         status={errors.name && touched.name ? 'error' : ''}/>}
              </Field>
              <ErrorMessage name="name" component="div" className={style.errorMessage}/>
            </div>
            <div className={style.field}>
              {addNewContact &&
              <div className={style.fieldName}>
                  TEL.:
              </div>}
              <Field type="telephone" name="telephone">
                {({field}) =>
                  <Input {...field}
                         className={style.inputField}
                         status={errors.telephone && touched.telephone ? 'error' : ''}/>}
              </Field>
              <ErrorMessage name="telephone" component="div" className={style.errorMessage}/>
              <div className={style.incorrectValuesMessage}>
                {(errors as FormikErrors<GeneralFormValues>).sameContact}
              </div>
            </div>
            <div>
              <div className={style.button}>
                <Button type='primary' disabled={isSubmitting} onClick={submitForm}>
                  {buttonName}
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}