import React, {FC} from 'react';
import {useAppDispatch} from "../../store/hooks";
import {getUsers, setUserAuthorization} from '../myContacts/myContactsSlice';

export const Authorization: FC = () => {
  /* const count = useAppSelector(selectCount);
const [incrementAmount, setIncrementAmount] = useState('2');*/
  const dispatch = useAppDispatch();
  const doubleFun = () => {
    dispatch(getUsers())
    dispatch(setUserAuthorization())
  }
  return (
    <div>
      <div>Login</div>
      <div>Password</div>
      <button onClick={() => doubleFun()}>login</button>
    </div>
  );
}