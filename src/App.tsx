import React, {FC, useEffect} from "react";
import {MyContacts} from "./Components/myContacts/MyContacts";
import {Authorization} from "./Components/authorization/Autorization";
import {useAppDispatch, useAppSelector} from "./store/hooks";
import {getUsers, selectAuthorization} from "./Components/myContacts/myContactsSlice";


export const App: FC = () => {

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getUsers())
  },[])

  const userStatus = useAppSelector(selectAuthorization)
  return (
    <div>
      { userStatus ? <MyContacts/> : <Authorization/>}
    </div>
  )
}
/*  const a = useAppSelector(selectCount)
  const dispatch = useAppDispatch()
    <div onClick={()=>{
    dispatch(incrementByAmount(3))
  }}>
  My contacts
  </div>*/