import {ContactType, UserType} from "../../MainTypes";
import React, {FC} from "react";
import {useAppDispatch} from "../../store/hooks";
import {ErrorMessage, Field, Form, Formik, FormikErrors} from "formik";
import {addNewUserContact, editUserContact, setAddContactForm} from "../../store/slices/myContactsSlice";
import e from './editGeneralForm.module.scss'
import a from '.././authorization/authorization.module.scss'
import {CheckOutlined, CloseOutlined} from "@ant-design/icons";
import {Button, Input} from "antd";

export type GeneralFormValues = {
  name: string
  telephone: string
  sameContact: string
}

type PropsType = {
  user: UserType
  name: string
  telephone: string
  setEditMode?: (boolean) => void
  addNewContact?: boolean
  editContact?: ContactType
}

export const GeneralForm: FC<PropsType> = ({user, name, telephone, setEditMode, addNewContact, editContact}) => {
  const dispatch = useAppDispatch()
  const style = addNewContact ? a : e
  const closeEditMode = () => {
    setEditMode?.(false)
  }
  return (
    <div>
      <Formik
        initialValues={{name: name, telephone: telephone}}
        validate={values => {
          const sameContact =
            user.contacts.find((c =>
                c.name === values.name
                && c.telephone === values.telephone
                && c.id !== editContact?.id
            ))
          const errors: FormikErrors<GeneralFormValues> = {}
          if (!values.name) {
            errors.name = 'Required'
          } else if (values.name.length > 15) {
            errors.name = 'Max length - 15'
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
          addNewContact && dispatch(addNewUserContact(user.id, values))
          editContact && dispatch(editUserContact(user.id, values, name, telephone))
          setSubmitting(false)
          closeEditMode()
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
                         className={style.inputFieldName}
                         status={errors.name && touched.name ? 'error' : ''}/>}
              </Field>
              <ErrorMessage name="name" component="div" className={style.errorMessageNameField}/>
            </div>
            <div className={style.field}>
              {addNewContact &&
              <div className={style.fieldName}>
                  TEL.:
              </div>}
              <Field type="telephone" name="telephone">
                {({field}) =>
                  <Input {...field}
                         className={style.inputFieldTel}
                         status={errors.telephone && touched.telephone ? 'error' : ''}/>}
              </Field>
              <ErrorMessage name="telephone" component="div" className={style.errorMessageTelField}/>
              <div className={style.incorrectValuesMessage}>
                {(errors as FormikErrors<GeneralFormValues>).sameContact}
              </div>
            </div>
            <div>
              {addNewContact &&
              <div className={style.button}>
                  <Button type='primary' disabled={isSubmitting} onClick={submitForm}>Add contact</Button>
              </div>
              }
              {editContact &&
              <div className={style.button}>
                  <Button size='large' icon={<CheckOutlined/>} type='ghost' disabled={isSubmitting}
                          onClick={submitForm}/>
                  <Button size='large' icon={<CloseOutlined/>} type='ghost' onClick={closeEditMode}/>
              </div>
              }
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}