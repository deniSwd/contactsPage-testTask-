import React, {FC, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {deleteUserContact, selectAddContactForm, selectUser, setAddContactForm, userLogout} from "./myContactsSlice";
import {ContactType} from "../../MainTypes";
import s from './myContacts.module.scss'
import {GeneralForm} from "./GeneralForm";

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
      {user != null &&
      <div>
          <div className={s.title}>
              <h1>Current user - {user.name}</h1>
          </div>
        {contactForm ? <GeneralForm userId={user.id}
                       contacts={user.contacts}
                       addNewContact={true}
                       buttonName={'Add contact'}
                       name={''}
                       telephone={''}/> :
          <button onClick={() => dispatch(setAddContactForm(true))}>Add contact</button>}
          <div> {user.contacts.map((contact, i: number) =>
            <div key={i}>
              {editMode && editContact?.name === contact.name
              && editContact.telephone === contact.telephone ?
                <GeneralForm userId={user.id}
                             name={contact.name}
                             telephone={contact.telephone}
                             setEditMode={setEditMode}
                             buttonName={'Accept changes'}
                             editContact={true}/> :
                <div>
                  <div>NAME: {contact.name}</div>
                  <div>TEL.: {contact.telephone}</div>
                </div>}
              <span>
                  <button onClick={() => editModeButton(contact)}>Edit contact</button>
                 <button onClick={() => dispatch(deleteUserContact(user.id, contact))}>Delete</button>
                </span>
            </div>
          )}
          </div>
      </div>
      }
      <button onClick={() => dispatch(userLogout())}>Logout</button>
    </div>
  )
}
