import React, {FC} from "react";
import s from "./myContacts.module.scss";
import {Button} from "antd";
import {CloseOutlined, EditOutlined} from "@ant-design/icons";
import {deleteUserContact} from "../../store/slices/myContactsSlice";
import {ContactType} from "../../MainTypes";
import {useAppDispatch} from "../../store/hooks";

type PropsType = {
  contact: ContactType
  userId: string
  setEditMode: (value: boolean) => void
  setEditContact: (value: ContactType) => void
}

export const ContactValuesField: FC<PropsType> = ({contact, userId, setEditMode, setEditContact}) => {

  const dispatch = useAppDispatch()
  const editModeButton = (editContact: ContactType) => {
    setEditContact(editContact)
    setEditMode(true)
  }

  return (
    <div className={s.contactValues}>
      <div className={s.contact}>
        <div className={s.contactName}>{contact.name}</div>
        <div className={s.contactTel}> {contact.telephone}</div>
      </div>
      <div className={s.buttons}>
        <Button size='large' icon={<EditOutlined/>} type='ghost'
                onClick={() => editModeButton(contact)}/>
        <Button size='large' icon={<CloseOutlined/>} type='ghost'
                onClick={() => dispatch(deleteUserContact(userId, contact))}/>
      </div>
    </div>
  )
}