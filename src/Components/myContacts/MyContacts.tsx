import React, {FC} from 'react';
import {useAppSelector} from "../../store/hooks";
import {selectUsers} from "./myContactsSlice";

export const MyContacts: FC = () => {
  /* const count = useAppSelector(selectCount);
   const dispatch = useAppDispatch();
   const [incrementAmount, setIncrementAmount] = useState('2');*/
  const users = useAppSelector(selectUsers)
  return (
    <div>
      <div>
        ALL USERS
      </div>
      <div>
        {users != null && users.map((user) =>
          <div>
            <div> {user.name} </div>
            <div> {user.contacts.map((contact)=>
              <div>
                <div>{contact.name}</div>
                <div>{contact.telephone}</div>
              </div>
              )}</div>
          </div>
        )}
      </div>
    </div>
  );
}
