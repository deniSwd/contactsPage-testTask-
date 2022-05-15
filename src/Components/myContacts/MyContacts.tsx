import React, {FC, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {selectAddContactForm, selectUser, setAddContactForm, userLogout} from "../../store/slices/myContactsSlice";
import s from './myContacts.module.scss'
import {GeneralForm} from "./GeneralForm";
import {PlusOutlined} from "@ant-design/icons";
import {Button} from "antd";
import Search from "antd/lib/input/Search";
import {DisplayingContacts} from "./DisplayingContacts";

export const MyContacts: FC = () => {

  const [value, setSearchValue] = useState<string>('')
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  const contactForm = useAppSelector(selectAddContactForm)
  const onSearch = (value: string) => {
    setSearchValue(value)
  }
  const displayingContacts = user?.contacts.filter(v =>
    value.length > 0 ?
      v.name.toLowerCase().startsWith(value.toLowerCase()) ||
      v.telephone.toLowerCase().startsWith(value.toLowerCase()) : true)

  return (
    <div className={s.contactPage}>
      {contactForm && <div className={s.background}/>}
      {user != null &&
      <div>
          <div className={s.header}>
              <div className={s.userName}>
                  Current user - {user.name}
              </div>
              <div className={s.searchField}>
                  <Search placeholder="input search text" allowClear onSearch={onSearch}/>
              </div>
            {contactForm ?
              <div className={s.addForm}>
                <GeneralForm user={user}
                             addNewContact={true}
                             name={''}
                             telephone={''}/></div> :
              <div className={s.addButton}>
                <div className={s.buttonName}>Add contact</div>
                <Button type='primary'
                        shape='circle'
                        icon={<PlusOutlined/>}
                        size='large'
                        onClick={() => dispatch(setAddContactForm(true))}/>
              </div>
            }
          </div>
          <div className={s.contactHeader}>
              <div className={s.name}>NAME</div>
              <div className={s.tel}>TELEPHONE</div>
          </div>
          <div> {displayingContacts && displayingContacts.length > 0
            ? <DisplayingContacts displayingContacts={displayingContacts} user={user}/>
            : <div className={s.notFound}> NOT FOUND </div>
          }
          </div>
      </div>
      }
      <div className={s.logoutButton}>
        <Button type='primary'
                size='large'
                onClick={() => dispatch(userLogout())}>
          Logout
        </Button>
      </div>
    </div>
  )
}
