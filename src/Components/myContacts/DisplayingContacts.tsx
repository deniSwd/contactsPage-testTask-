import s from "./myContacts.module.scss";
import {GeneralForm} from "./GeneralForm";
import {ContactValuesField} from "./ContactValuesField";
import React, {FC, useState} from "react";
import {ContactsType, ContactType, UserType} from "../../MainTypes";

type DisplayingContactsPropsType = {
  displayingContacts: ContactsType
  user: UserType
}

export const DisplayingContacts: FC<DisplayingContactsPropsType> = ({displayingContacts, user}) => {

  const [editContact, setEditContact] = useState<ContactType | null>(null)
  const [editMode, setEditMode] = useState<boolean>(false)

  return (
    <div>
      {displayingContacts.map((contact, i: number) =>
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
  )
}