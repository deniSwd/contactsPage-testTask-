import React, {FC} from 'react';
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {deleteUserContact, selectAddContactForm, selectUser, setAddContactForm, userLogout} from "./myContactsSlice";
import {NewContactForm} from './NewContactForm';

export const MyContacts: FC = () => {
  /* const [incrementAmount, setIncrementAmount] = useState('2');*/
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser)
  const contactForm = useAppSelector(selectAddContactForm)

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
                <div>NAME: {contact.name}</div>
                <div>TEL.: {contact.telephone}</div>
                <button onClick={() => dispatch(deleteUserContact(user.id, contact))}>Delete</button>
              </div>
            )}
            </div>
        </div>
        }
      </div>
      <button onClick={() => dispatch(userLogout())}>Logout</button>
    </div>
  );
}
