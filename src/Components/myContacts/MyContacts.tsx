import React, {FC, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {deleteUserContact, selectAddContactForm, selectUser, setAddContactForm, userLogout} from "./myContactsSlice";
import {ContactType} from "../../MainTypes";
import s from './myContacts.module.scss'
import {GeneralForm} from "./GeneralForm";
import {CloseOutlined, EditOutlined, PlusOutlined} from "@ant-design/icons";
import {Button} from "antd";

export const MyContacts: FC = () => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editContact, setEditContact] = useState<ContactType | null>(null);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser)
  const contactForm = useAppSelector(selectAddContactForm)

  const editModeButton = (editContact) => {
    setEditContact(editContact)
    setEditMode(true)
  }

  return (
    <div className={s.contactPage}>
      {contactForm && <div className={s.background}/>}
      {user != null &&
      <div>
          <div className={s.header}>
              <h2>Current user - {user.name}</h2>
            {contactForm ? <div className={s.addForm}><GeneralForm userId={user.id}
                                                                   contacts={user.contacts}
                                                                   addNewContact={true}
                                                                   name={''}
                                                                   telephone={''}/></div> :
              <div className={s.addButton}>
                <div className={s.buttonName}>Add contact</div>
                <Button type='primary' shape='circle' icon={<PlusOutlined/>} size='large'
                        onClick={() => dispatch(setAddContactForm(true))}/>
              </div>
            }
          </div>
          <div className={s.contactHeader} >
              <div className={s.name}>NAME</div>
              <div className={s.tel}>TELEPHONE</div>
          </div>
          <div> {user.contacts.map((contact, i: number) =>
            <div key={i} className={s.contacts}>
              {editMode && editContact?.name === contact.name
              && editContact.telephone === contact.telephone ?
                <GeneralForm userId={user.id}
                             contacts={user.contacts}
                             name={contact.name}
                             telephone={contact.telephone}
                             setEditMode={setEditMode}
                             editContact={true}/> :
                <div className={s.contactValues}>
                  <div className={s.contact}>
                    <div className={s.contactName}>{contact.name}</div>
                    <div className={s.contactTel}> {contact.telephone}</div>
                  </div>
                  <div className={s.buttons}>
                    <Button size='large' icon={<EditOutlined />} type='ghost'
                            onClick={() => editModeButton(contact)} />
                    <Button size='large' icon={<CloseOutlined />} type='ghost'
                            onClick={() => dispatch(deleteUserContact(user.id, contact))} />
                  </div>
                </div>
              }
            </div>
          )}
          </div>
      </div>
      }
      <div className={s.logoutButton}>
        <Button type='primary' size='large'
                onClick={() => dispatch(userLogout())}>Logout</Button>
      </div>
    </div>
  )
}
