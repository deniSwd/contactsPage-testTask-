import React, {FC} from 'react';
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {selectUser, userExit} from "./myContactsSlice";

export const MyContacts: FC = () => {
  /* const [incrementAmount, setIncrementAmount] = useState('2');*/
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser)
  return (
    <div>
      <div>
        CURRENT USER
      </div>
      <div>
        {user != null &&
          <div>
            <div>{user.name}</div>
            <div> {user.contacts.map((contact)=>
              <div>
                <div>{contact.name}</div>
                <div>{contact.telephone}</div>
              </div>
              )}
            </div>
          </div>
        }
      </div>
      <button onClick={()=>dispatch(userExit())}>Exit</button>
    </div>
  );
}
