import React, {FC, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {selectAddContactForm, selectUser, setAddContactForm, userLogout} from "../../store/slices/myContactsSlice";
import {ContactType} from "../../MainTypes";
import s from './myContacts.module.scss'
import {GeneralForm} from "./GeneralForm";
import {PlusOutlined} from "@ant-design/icons";
import {Button} from "antd";
import {ContactValuesField} from "./ContactValuesField";

export const MyContacts: FC = () => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editContact, setEditContact] = useState<ContactType | null>(null);
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  const contactForm = useAppSelector(selectAddContactForm)

  return (
    <div className={s.contactPage}>
      {contactForm && <div className={s.background}/>}
      {user != null &&
      <div>
          <div className={s.header}>
              <h2>Current user - {user.name}</h2>
            {contactForm ?
              <div className={s.addForm}>
                <GeneralForm user={user}
                             addNewContact={true}
                             name={''}
                             telephone={''}/></div> :
              <div className={s.addButton}>
                <div className={s.buttonName}>Add contact</div>
                <Button type='primary'
                        shape='circle'
                        icon={<PlusOutlined/>}
                        size='large'
                        onClick={() => dispatch(setAddContactForm(true))}/>
              </div>
            }
          </div>
          <div className={s.contactHeader}>
              <div className={s.name}>NAME</div>
              <div className={s.tel}>TELEPHONE</div>
          </div>
          <div> {user.contacts.map((contact, i: number) =>
            <div key={i} className={s.contacts}>
              {
                editMode &&
                editContact &&
                editContact.id === contact.id ?
                  <GeneralForm user={user}
                               name={contact.name}
                               telephone={contact.telephone}
                               setEditMode={setEditMode}
                               editContact={editContact}/> :
                  <ContactValuesField contact={contact}
                                      userId={user.id}
                                      setEditMode={setEditMode}
                                      setEditContact={setEditContact}/>
              }
            </div>
          )}
          </div>
      </div>
      }
      <div className={s.logoutButton}>
        <Button type='primary'
                size='large'
                onClick={() => dispatch(userLogout())}>
          Logout
        </Button>
      </div>
    </div>
  )
}
