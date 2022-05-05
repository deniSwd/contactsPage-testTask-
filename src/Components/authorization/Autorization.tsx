import React, {FC} from 'react';
import {useAppDispatch} from "../../store/hooks";
import { setUserAuthorization } from '../myContacts/myContactsSlice';

export const Authorization: FC = () => {
  /* const count = useAppSelector(selectCount);
const [incrementAmount, setIncrementAmount] = useState('2');*/
  const dispatch = useAppDispatch();
  return (
    <div>
      <div>Login</div>
      <div>Password</div>
      <button onClick={()=> dispatch(setUserAuthorization())}>login</button>
    </div>
  );
}