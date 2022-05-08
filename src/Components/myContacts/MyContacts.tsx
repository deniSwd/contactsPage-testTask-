import React, {FC, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {deleteUserContact, selectAddContactForm, selectUser, setAddContactForm, userLogout} from "./myContactsSlice";
import {NewContactForm} from './NewContactForm';
import {ContactType} from "../../MainTypes";
import {EditModeContactForm} from "./EditModeContactForm";

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
    <div>
      <div>
        CURRENT USER
      </div>
      <div>
        {user != null &&
        <div>
            <div>{user.name}</div>
          {contactForm ?
            <NewContactForm userId={user.id}/> :
            <button onClick={() => dispatch(setAddContactForm(true))}>Add contact</button>}
            <div> {user.contacts.map((contact, i: number) =>
              <div key={i}>
                {editMode && editContact && editContact.name === contact.name
                && editContact.telephone === contact.telephone ?
                  <EditModeContactForm userId={user.id}
                                       name={contact.name}
                                       telephone={contact.telephone}
                                       setEditMode={setEditMode}/> :
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
      </div>
      <button onClick={() => dispatch(userLogout())}>Logout</button>
    </div>
  )
}
