import React, {FC, useEffect} from "react";
import 'antd/dist/antd.css';
import s from './app.module.scss'
import {MyContacts} from "./Components/myContacts/MyContacts";
import {Authorization} from "./Components/authorization/Authorization";
import {useAppDispatch, useAppSelector} from "./store/hooks";
import {getUsers, selectAuthorization} from "./Components/myContacts/myContactsSlice";


export const App: FC = () => {

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getUsers())
  },[])

  const userStatus = useAppSelector(selectAuthorization)
  return (
    <div className={s.content}>
      { userStatus ? <MyContacts/> : <Authorization/>}
    </div>
  )
}
